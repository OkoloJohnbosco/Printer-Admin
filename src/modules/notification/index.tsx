"use client";

import { CursorPagination } from "@/components/ui/cursor-pagination";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useGetNotifications from "@/lib/hooks/notification/use-get-notifications";
import { Notification } from "@/lib/hooks/notification/use-get-notifications/use-get-notifications.types";
import useMarkAllNotificationsRead from "@/lib/hooks/notification/use-mark-all-notifications-read";
import { useEffect } from "react";
import NotificationCard, {
  EmptyNotifications,
  NotificationCardSkeleton,
} from "./components/notification-card";
import NotificationTabs from "./components/notification-tabs";

function NotificationPageTemplate() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 20,
    scrollOnPageChange: false,
  });

  const getNotifications = useGetNotifications({
    limit: pagination.itemsPerPage,
    cursor: pagination.currentCursor,
  });
  const markAllAsRead = useMarkAllNotificationsRead();

  const notifications = getNotifications.value?.data?.notifications || [];
  const nextCursor = getNotifications.value?.data?.cursor;
  const isLoading = getNotifications.isLoading;
  const hasNotifications = notifications.length > 0;

  // Update pagination when we get new data
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  return (
    <div className="page-fade-in space-y-6">
      <div className="rounded-lg shadow">
        <NotificationTabs
          onMarkAllAsRead={() => markAllAsRead.mutate({})}
          isMarkingAllAsRead={markAllAsRead.isPending}
          hasNotifications={hasNotifications}
        />
      </div>

      {isLoading ? (
        <div className="notification-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <NotificationCardSkeleton key={i} />
          ))}
        </div>
      ) : !hasNotifications ? (
        <EmptyNotifications />
      ) : (
        <div className="notification-grid">
          {notifications.map((notification: Notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {hasNotifications &&
        (pagination.hasNextPage || pagination.hasPreviousPage) && (
          <CursorPagination
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            onNextPage={pagination.handleNextPage}
            onPreviousPage={pagination.handlePreviousPage}
            currentPage={pagination.currentPage}
            isLoading={isLoading}
          />
        )}
    </div>
  );
}

export default NotificationPageTemplate;
