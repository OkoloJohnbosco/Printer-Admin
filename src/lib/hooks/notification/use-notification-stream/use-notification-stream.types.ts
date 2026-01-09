export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationStreamEvent {
  type: "notification" | "ping" | "connected";
  data?: Notification;
}

export interface UseNotificationStreamOptions {
  enabled?: boolean;
  onNotification?: (notification: Notification) => void;
  onError?: (error: Event) => void;
  onConnected?: () => void;
}

export interface UseNotificationStreamReturn {
  isConnected: boolean;
  isConnecting: boolean;
  error: Event | null;
  reconnect: () => void;
  disconnect: () => void;
}
