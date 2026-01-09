"use client";

import { baseURL, PRINTA_APP_KEY } from "@/lib/constants";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NotificationStreamEvent,
  UseNotificationStreamOptions,
  UseNotificationStreamReturn,
} from "./use-notification-stream.types";

const useNotificationStream = (
  options: UseNotificationStreamOptions = {},
): UseNotificationStreamReturn => {
  const { enabled = true, onNotification, onError, onConnected } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);
  const queryClient = useQueryClient();

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

    try {
      // Create EventSource URL with auth token as query param
      // (SSE doesn't support custom headers, so we pass token as query param)
      const streamUrl = `${baseURL}${ENDPOINTS.GET_NOTIFICATIONS_STREAM}?token=${token}`;
      const eventSource = new EventSource(streamUrl);

      eventSource.onopen = () => {
        isConnectingRef.current = false;
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        onConnected?.();
      };

      eventSource.onmessage = (event) => {
        try {
          const parsedData: NotificationStreamEvent = JSON.parse(event.data);

          if (parsedData.type === "notification" && parsedData.data) {
            // Invalidate queries to refresh notification data
            queryClient.invalidateQueries({
              queryKey: [QUERYKEYS.GET_NOTIFICATIONS],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERYKEYS.GET_UNREAD_NOTIFICATION_COUNT],
            });

            // Call the notification callback
            onNotification?.(parsedData.data);
          }
        } catch (parseError) {
          console.error("Failed to parse SSE message:", parseError);
        }
      };

      eventSource.onerror = (errorEvent) => {
        isConnectingRef.current = false;
        setIsConnected(false);
        setIsConnecting(false);
        setError(errorEvent);
        onError?.(errorEvent);

        // Close the connection
        eventSource.close();
        eventSourceRef.current = null;

        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          if (enabled) {
            connect();
          }
        }, 5000);
      };

      eventSourceRef.current = eventSource;
    } catch (err) {
      isConnectingRef.current = false;
      setIsConnecting(false);
      console.error("Failed to create EventSource:", err);
    }
  }, [enabled, onNotification, onError, onConnected, queryClient]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

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

  return {
    isConnected,
    isConnecting,
    error,
    reconnect,
    disconnect,
  };
};

export default useNotificationStream;
