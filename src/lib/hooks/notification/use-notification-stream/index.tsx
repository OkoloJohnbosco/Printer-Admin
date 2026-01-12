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

  const connect = useCallback(async () => {
    // Don't connect if already connected or connecting
    if (eventSourceRef.current || isConnectingRef.current) return;

    // Get auth token
    const token = await getCookie(PRINTA_APP_KEY.TOKEN);
    if (!token) {
      console.warn("No auth token available for notification stream");
      return;
    }

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);

    // Reset state for new connection
    receivedNotificationIdsRef.current.clear();
    historicalNotificationsRef.current = [];
    isReceivingHistoryRef.current = true;

    try {
      // Use EventSourcePolyfill to support Bearer token in headers
      const streamUrl = `${baseURL}${ENDPOINTS.GET_NOTIFICATIONS_STREAM}`;
      const eventSource = new EventSourcePolyfill(streamUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      eventSource.onopen = () => {
        isConnectingRef.current = false;
        hasConnectedRef.current = true;
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

        // Only treat as error if we never successfully connected
        // ERR_INCOMPLETE_CHUNKED_ENCODING after a successful connection is normal SSE behavior
        if (!hasConnectedRef.current) {
          setError(errorEvent as Event);
          onErrorRef.current?.(errorEvent as Event);
        }

        // Attempt to reconnect after 5 seconds (shorter if it was a normal disconnection)
        const reconnectDelay = hasConnectedRef.current ? 2000 : 5000;
        reconnectTimeoutRef.current = setTimeout(() => {
          if (enabled) {
            connect();
          }
        }, reconnectDelay);
      };

      eventSourceRef.current = eventSource;
    } catch (err) {
      isConnectingRef.current = false;
      setIsConnecting(false);
      console.error("Failed to create EventSource:", err);
    }
  }, [enabled, queryClient]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    hasConnectedRef.current = false;
    isReceivingHistoryRef.current = true;
    receivedNotificationIdsRef.current.clear();
    historicalNotificationsRef.current = [];
    setIsConnected(false);
    setIsConnecting(false);
  }, []);

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
