import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Heading from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ENotificationType,
  Notification,
} from "@/lib/hooks/notification/use-get-notifications/use-get-notifications.types";
import useMarkNotificationRead from "@/lib/hooks/notification/use-mark-notification-read";
import { getNotificationRoute } from "@/lib/notification-routing";
import { formatDistanceToNow } from "date-fns";
import { BellOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Map notification types to badge variants and styles
const getNotificationBadge = (type: ENotificationType | string) => {
  switch (type) {
    case ENotificationType.ORDER_COMPLETED:
      return { variant: "success" as const, label: "Completed" };
    case ENotificationType.ORDER_ACCEPTED:
      return { variant: "action_required" as const, label: "Order Update" };
    case ENotificationType.PAYMENT_COMPLETED:
      return { variant: "success" as const, label: "Payment" };
    case ENotificationType.PAYOUT_APPROVED:
      return { variant: "warning" as const, label: "Payout Approved" };
    case ENotificationType.PAYOUT_REJECTED:
      return { variant: "destructive" as const, label: "Payout Rejected" };
    case ENotificationType.PAYOUT_REQUESTED:
      return { variant: "success" as const, label: "Payout Request" };
    case ENotificationType.HUB_VERIFICATION_REQUESTED:
      return {
        variant: "action_required" as const,
        label: "Verification Request",
      };
    case ENotificationType.HUB_VERIFIED:
      return { variant: "success" as const, label: "Hub Verified" };
    case ENotificationType.HUB_DOCUMENT_REJECTED:
      return { variant: "destructive" as const, label: "Document Rejected" };
    case ENotificationType.DESIGN_REQUEST_ACCEPTED:
    case ENotificationType.DESIGN_REQUEST_COMPLETED:
    case ENotificationType.DESIGN_APPROVED:
    case ENotificationType.DESIGNER_REQUEST_SUBMITTED:
      return { variant: "purple" as const, label: "Design Request" };
    default:
      return { variant: "secondary" as const, label: "Info" };
  }
};

// Format timestamp
const formatTimestamp = (dateString: string) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
};

interface NotificationCardProps {
  notification: Notification;
  onDelete?: (id: string) => void;
}

function NotificationCard({ notification }: NotificationCardProps) {
  const router = useRouter();
  const badge = getNotificationBadge(notification.type);
  const actionRoute = getNotificationRoute(notification);

  const markNotificationRead = useMarkNotificationRead(notification.id);

  const handleMarkAsRead = () => {
    markNotificationRead.mutate({});
  };

  const handleViewDetails = () => {
    if (!notification.isRead) {
      markNotificationRead.mutate({});
    }
    router.push(actionRoute);
  };

  return (
    <div
      className={`group flex h-fit gap-2 rounded-lg bg-white p-4 shadow-2xs transition-all duration-200 ease-in-out ${
        notification.isRead ? "opacity-70" : ""
      }`}
    >
      <div className="pt-1">
        <Checkbox checked={notification.isRead} />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={badge.variant} className="rounded-full">
              {badge.label}
            </Badge>
            {!notification.isRead && (
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            )}
          </div>
          <span className="text-brand-gray-200 text-xs">
            {formatTimestamp(notification.createdAt)}
          </span>
        </div>
        <div className="space-y-1">
          <Heading size="h8" className="font-semibold">
            {notification.title}
          </Heading>
          <p className="text-brand-neutral text-nm">{notification.message}</p>
        </div>

        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            {!notification.isRead && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={handleMarkAsRead}
                isLoading={markNotificationRead.isPending}
              >
                Mark as Read
              </Button>
            )}
            <Button
              variant="outline_gray"
              size="sm"
              className="h-7 px-2"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton for notifications
export function NotificationCardSkeleton() {
  return (
    <div className="flex h-fit gap-2 rounded-lg bg-white p-4 shadow-2xs">
      <div className="pt-1">
        <Skeleton className="h-4 w-4 rounded" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-24" />
        </div>
      </div>
    </div>
  );
}

// Empty state component
export function EmptyNotifications() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-lg bg-white py-12 text-center shadow-2xs">
      <div className="rounded-full bg-gray-100 p-4">
        <BellOff className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        No notifications
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        You&apos;re all caught up! Check back later for updates.
      </p>
    </div>
  );
}

export default NotificationCard;
