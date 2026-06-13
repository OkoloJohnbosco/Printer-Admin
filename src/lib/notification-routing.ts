import {
  ENotificationType,
  Notification,
  NotificationPayload,
} from "@/lib/hooks/notification/use-get-notifications/use-get-notifications.types";
import {
  isDesignerRequestReference,
  isOrderReference,
  isPayoutReference,
} from "@/lib/resource-reference";
import routes from "@/routes";

const payoutNotificationTypes = new Set<string>([
  ENotificationType.PAYOUT_REQUESTED,
  ENotificationType.PAYOUT_APPROVED,
  ENotificationType.PAYOUT_REJECTED,
  ENotificationType.PAYOUT_COMPLETED,
  ENotificationType.PAYOUT_INITIATED,
]);

const orderNotificationTypes = new Set<string>([
  ENotificationType.PAYMENT_COMPLETED,
  ENotificationType.ORDER_ACCEPTED,
  ENotificationType.ORDER_COMPLETED,
  ENotificationType.ORDER_REJECTED,
]);

const hubNotificationTypes = new Set<string>([
  ENotificationType.HUB_VERIFICATION_REQUESTED,
  ENotificationType.HUB_VERIFIED,
  ENotificationType.HUB_DOCUMENT_REJECTED,
]);

const designerRequestNotificationTypes = new Set<string>([
  ENotificationType.DESIGNER_REQUEST_SUBMITTED,
  ENotificationType.DESIGN_REQUEST_ACCEPTED,
  ENotificationType.DESIGN_REQUEST_COMPLETED,
  ENotificationType.DESIGN_APPROVED,
]);

export const getPayoutDetailsRoute = (reference: string) =>
  routes.PAYOUT_DETAILS(reference);

export const getOrderDetailsRoute = (idOrReference: string) =>
  `${routes.ORDER_MANAGEMENT}/${idOrReference}`;

export const getHubDetailsRoute = (hubId: string) => routes.HUB_DETAILS(hubId);

export const getHubVerificationRoute = (hubId: string) =>
  routes.HUB_DETAILS(hubId);

export const getDesignRequestDetailsRoute = (reference: string) =>
  `${routes.DESIGN_REQUESTS}/${reference}`;

const getPayoutNotificationRoute = (
  payload?: NotificationPayload | null,
): string => {
  if (payload?.reference && isPayoutReference(payload.reference)) {
    return getPayoutDetailsRoute(payload.reference);
  }

  if (payload?.reference && isOrderReference(payload.reference)) {
    return getOrderDetailsRoute(payload.reference);
  }

  if (payload?.orderId) {
    return getOrderDetailsRoute(payload.orderId);
  }

  return routes.REVENUE_AND_PAYOUT;
};

export const getNotificationRoute = (
  notification: Pick<Notification, "type" | "payload">,
): string => {
  const { type, payload } = notification;

  if (hubNotificationTypes.has(type) && payload?.hubId) {
    return getHubVerificationRoute(payload.hubId);
  }

  if (payoutNotificationTypes.has(type)) {
    return getPayoutNotificationRoute(payload);
  }

  if (
    orderNotificationTypes.has(type) &&
    payload?.reference &&
    isOrderReference(payload.reference)
  ) {
    return getOrderDetailsRoute(payload.reference);
  }

  if (
    designerRequestNotificationTypes.has(type) &&
    payload?.reference &&
    isDesignerRequestReference(payload.reference)
  ) {
    return getDesignRequestDetailsRoute(payload.reference);
  }

  if (hubNotificationTypes.has(type)) {
    return routes.HUB_MANAGEMENT;
  }

  return routes.NOTIFICATIONS;
};
