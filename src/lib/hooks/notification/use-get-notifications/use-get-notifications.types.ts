export enum ENotificationType {
  ORDER_COMPLETED = "ORDER_COMPLETED",
  ORDER_ACCEPTED = "ORDER_ACCEPTED",
  PAYMENT_COMPLETED = "PAYMENT_COMPLETED",
  PAYOUT_APPROVED = "PAYOUT_APPROVED",
  PAYOUT_REJECTED = "PAYOUT_REJECTED",
}

export interface Notification {
  id: string;
  userId: string;
  type: ENotificationType;
  title: string;
  message: string;
  payload: Payload;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  data: {
    notifications: Notification[];
    cursor: string | null;
  };
  status: boolean;
}

export interface UseGetNotificationsParams {
  limit?: number;
  cursor?: string;
}

export interface Payload {
  orderId: string;
}
