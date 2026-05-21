import {
  ENotificationType,
  Notification,
} from "@/lib/hooks/notification/use-get-notifications/use-get-notifications.types";
import routes from "@/routes";

const payoutNotificationTypes = new Set<ENotificationType>([
  ENotificationType.PAYOUT_REQUESTED,
  ENotificationType.PAYOUT_APPROVED,
  ENotificationType.PAYOUT_REJECTED,
  ENotificationType.PAYOUT_COMPLETED,
  ENotificationType.PAYOUT_INITIATED,
]);

const hubNotificationTypes = new Set<ENotificationType>([
  ENotificationType.HUB_VERIFICATION_REQUESTED,
  ENotificationType.HUB_VERIFIED,
  ENotificationType.HUB_DOCUMENT_REJECTED,
]);

export const getPayoutDetailsRoute = (reference: string) =>
  routes.ORDER_MANAGEMENT + `/${reference}`;

export const getHubDetailsRoute = (hubId: string) => routes.HUB_DETAILS(hubId);

export const getNotificationRoute = (
  notification: Pick<Notification, "type" | "payload">,
): string => {
  const { type, payload } = notification;

  if (payoutNotificationTypes.has(type) && payload?.reference) {
    return getPayoutDetailsRoute(payload.reference);
  }

  if (hubNotificationTypes.has(type) && payload?.hubId) {
    return getHubDetailsRoute(payload.hubId);
  }

  return routes.NOTIFICATIONS;
};
