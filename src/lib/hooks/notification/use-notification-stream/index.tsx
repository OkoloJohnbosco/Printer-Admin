"use client";

import { baseURL, PRINTA_APP_KEY } from "@/lib/constants";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Notification,
  NotificationStreamEvent,
  UseNotificationStreamOptions,
  UseNotificationStreamReturn,
} from "./use-notification-stream.types";

// Delay before reconnecting after a previously-healthy stream drops.
const RECONNECT_DELAY = 2000;
// How often we check the auth cookie so we can react to token refresh/logout.
const TOKEN_POLL_INTERVAL = 10000;

const useNotificationStream = (
  options: UseNotificationStreamOptions = {},
): UseNotificationStreamReturn => {
  const {
    enabled = true,
    onNotification,
    onHistoricalNotifications,
    onError,
    onConnected,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);
  const hasConnectedRef = useRef(false);
  const receivedNotificationIdsRef = useRef<Set<string>>(new Set());
  const historicalNotificationsRef = useRef<Notification[]>([]);
  const isReceivingHistoryRef = useRef(true);
  // The token the current/last connection was opened with.
  const currentTokenRef = useRef<string | null>(null);
  // True when a connection failed before ever opening (likely invalid/expired
  // token). We stop retrying until a fresh token becomes available.
  const authFailedRef = useRef(false);
  const queryClient = useQueryClient();

  // Store callbacks in refs to prevent reconnections on parent re-renders
  const onNotificationRef = useRef(onNotification);
  const onHistoricalNotificationsRef = useRef(onHistoricalNotifications);
  const onErrorRef = useRef(onError);
  const onConnectedRef = useRef(onConnected);

  // Update refs when callbacks change (without triggering reconnect)
  useEffect(() => {
    onNotificationRef.current = onNotification;
    onHistoricalNotificationsRef.current = onHistoricalNotifications;
    onErrorRef.current = onError;
    onConnectedRef.current = onConnected;
  }, [onNotification, onHistoricalNotifications, onError, onConnected]);

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Tear down the active EventSource and reset per-connection state, without
  // clearing the "known token"/"auth failed" bookkeeping the poller relies on.
  const closeStream = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    isConnectingRef.current = false;
    hasConnectedRef.current = false;
    isReceivingHistoryRef.current = true;
    receivedNotificationIdsRef.current.clear();
    historicalNotificationsRef.current = [];
    setIsConnected(false);
    setIsConnecting(false);
  }, []);

  const connect = useCallback(async () => {
    if (!enabled) return;

    // Prevent React rerenders from opening multiple concurrent connections.
    if (eventSourceRef.current || isConnectingRef.current) return;

    // Only open the stream once a valid access token exists.
    const token = await getCookie(PRINTA_APP_KEY.TOKEN);
    if (!token) {
      // Auth state isn't ready yet; wait for a token instead of erroring.
      return;
    }

    const tokenStr = String(token);

    isConnectingRef.current = true;
    currentTokenRef.current = tokenStr;
    authFailedRef.current = false;
    setIsConnecting(true);
    setError(null);

    // Reset state for new connection
    receivedNotificationIdsRef.current.clear();
    historicalNotificationsRef.current = [];
    isReceivingHistoryRef.current = true;

    try {
      const streamUrl = `${baseURL}${ENDPOINTS.GET_NOTIFICATIONS_STREAM}`;
      const eventSource = new EventSourcePolyfill(streamUrl, {
        headers: {
          Authorization: `Bearer ${tokenStr}`,
        },
      });

      eventSource.onopen = () => {
        isConnectingRef.current = false;
        hasConnectedRef.current = true;
        authFailedRef.current = false;
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        onConnectedRef.current?.();
      };

      eventSource.onmessage = (event) => {
        try {
          const parsedData: NotificationStreamEvent = JSON.parse(event.data);

          if (parsedData.success && parsedData.data) {
            const notification = parsedData.data;

            // Deduplication: skip if we've already received this notification
            if (receivedNotificationIdsRef.current.has(notification.id)) {
              return;
            }
            receivedNotificationIdsRef.current.add(notification.id);

            // Check if this is historical or live notification
            // Historical notifications are sent in bulk at the start
            // We'll consider it "live" after a brief delay from connection
            if (isReceivingHistoryRef.current) {
              historicalNotificationsRef.current.push(notification);

              // Use a debounce to detect end of historical batch
              // After 100ms of no new messages, consider history complete
              setTimeout(() => {
                if (
                  isReceivingHistoryRef.current &&
                  historicalNotificationsRef.current.length > 0
                ) {
                  isReceivingHistoryRef.current = false;
                  onHistoricalNotificationsRef.current?.(
                    historicalNotificationsRef.current,
                  );

                  // Invalidate queries to refresh with historical data
                  queryClient.invalidateQueries({
                    queryKey: [QUERYKEYS.GET_NOTIFICATIONS],
                  });
                  queryClient.invalidateQueries({
                    queryKey: [QUERYKEYS.GET_UNREAD_NOTIFICATION_COUNT],
                  });
                }
              }, 100);
            } else {
              // Live notification - invalidate queries and notify
              queryClient.invalidateQueries({
                queryKey: [QUERYKEYS.GET_NOTIFICATIONS],
              });
              queryClient.invalidateQueries({
                queryKey: [QUERYKEYS.GET_UNREAD_NOTIFICATION_COUNT],
              });

              // Call the notification callback for live notifications
              onNotificationRef.current?.(notification);
            }
          }
        } catch (parseError) {
          console.error("Failed to parse SSE message:", parseError);
        }
      };

      eventSource.onerror = (errorEvent) => {
        isConnectingRef.current = false;
        setIsConnected(false);
        setIsConnecting(false);

        // Close the connection
        eventSource.close();
        eventSourceRef.current = null;

        // Never successfully connected: most likely an invalid/expired token.
        // Do NOT keep retrying with the same token every few seconds; surface
        // the error and wait for a fresh token (see the token poller below).
        if (!hasConnectedRef.current) {
          authFailedRef.current = true;
          setError(errorEvent as Event);
          onErrorRef.current?.(errorEvent as Event);
          return;
        }

        // Previously healthy stream dropped (e.g. ERR_INCOMPLETE_CHUNKED_ENCODING
        // is normal SSE behavior) - reconnect after a short delay.
        clearReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(() => {
          if (enabled) {
            connect();
          }
        }, RECONNECT_DELAY);
      };

      eventSourceRef.current = eventSource;
    } catch (err) {
      isConnectingRef.current = false;
      setIsConnecting(false);
      console.error("Failed to create EventSource:", err);
    }
  }, [enabled, queryClient, clearReconnectTimeout]);

  const disconnect = useCallback(() => {
    clearReconnectTimeout();
    closeStream();
    currentTokenRef.current = null;
    authFailedRef.current = false;
  }, [clearReconnectTimeout, closeStream]);

  const reconnect = useCallback(() => {
    disconnect();
    connect();
  }, [disconnect, connect]);

  // Connect on mount if enabled
  useEffect(() => {
    if (enabled) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  // React to auth-cookie changes: reconnect with a fresh token after refresh,
  // close on logout, and resume once a valid token is available again.
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(async () => {
      const token = await getCookie(PRINTA_APP_KEY.TOKEN);
      const tokenStr = token ? String(token) : null;

      // Logged out / token removed -> close the stream.
      if (!tokenStr) {
        if (eventSourceRef.current || isConnectingRef.current) {
          closeStream();
        }
        clearReconnectTimeout();
        currentTokenRef.current = null;
        authFailedRef.current = false;
        return;
      }

      // Access token changed (refresh) -> close and recreate with the new one.
      if (currentTokenRef.current && tokenStr !== currentTokenRef.current) {
        closeStream();
        clearReconnectTimeout();
        currentTokenRef.current = null;
        authFailedRef.current = false;
        connect();
        return;
      }

      // No active connection and none in progress.
      if (!eventSourceRef.current && !isConnectingRef.current) {
        // A prior attempt auth-failed with this exact token: keep waiting for a
        // fresh token instead of hammering the backend.
        if (authFailedRef.current && tokenStr === currentTokenRef.current) {
          return;
        }
        connect();
      }
    }, TOKEN_POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [enabled, connect, closeStream, clearReconnectTimeout]);

  // Refetch notifications on window focus
  useEffect(() => {
    if (!enabled) return;

    const handleFocus = () => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_UNREAD_NOTIFICATION_COUNT],
      });
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [enabled, queryClient]);

  return {
    isConnected,
    isConnecting,
    error,
    reconnect,
    disconnect,
  };
};

export default useNotificationStream;
