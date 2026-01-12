export type NotificationType =
  | "HUB_VERIFIED"
  | "ORDER_ACCEPTED"
  | "ORDER_REJECTED"
  | "ORDER_COMPLETED"
  | "PAYMENT_COMPLETED"
  | "HUB_DOCUMENT_REJECTED"
  | "PAYOUT_APPROVED"
  | "PAYOUT_INITIATED"
  | "PAYOUT_COMPLETED";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  payload?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationStreamEvent {
  success: boolean;
  data?: Notification;
}

export interface UseNotificationStreamOptions {
  enabled?: boolean;
  onNotification?: (notification: Notification) => void;
  onHistoricalNotifications?: (notifications: Notification[]) => void;
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
