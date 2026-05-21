export enum ENotificationType {
  ORDER_COMPLETED = "ORDER_COMPLETED",
  ORDER_ACCEPTED = "ORDER_ACCEPTED",
  ORDER_REJECTED = "ORDER_REJECTED",
  PAYMENT_COMPLETED = "PAYMENT_COMPLETED",
  PAYOUT_REQUESTED = "PAYOUT_REQUESTED",
  PAYOUT_APPROVED = "PAYOUT_APPROVED",
  PAYOUT_REJECTED = "PAYOUT_REJECTED",
  DESIGN_APPROVED = "DESIGN_APPROVED",
  DESIGN_REQUEST_ACCEPTED = "DESIGN_REQUEST_ACCEPTED",
  DESIGN_REQUEST_COMPLETED = "DESIGN_REQUEST_COMPLETED",
  PAYOUT_COMPLETED = "PAYOUT_COMPLETED",
  PAYOUT_INITIATED = "PAYOUT_INITIATED",
  HUB_VERIFICATION_REQUESTED = "HUB_VERIFICATION_REQUESTED",
  HUB_VERIFIED = "HUB_VERIFIED",
  HUB_DOCUMENT_REJECTED = "HUB_DOCUMENT_REJECTED",
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

export interface NotificationPayload {
  reference?: string;
  hubId?: string;
  orderId?: string;
  businessName?: string;
  checkoutUrl?: string;
}

/** @deprecated Use NotificationPayload */
export type Payload = NotificationPayload;
