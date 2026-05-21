import {
  Notification,
  NotificationPayload,
} from "../use-get-notifications/use-get-notifications.types";

export type { Notification, NotificationPayload };
export { ENotificationType as NotificationType } from "../use-get-notifications/use-get-notifications.types";

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
