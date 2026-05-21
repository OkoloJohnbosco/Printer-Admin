"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useGetUserData from "@/lib/hooks/auth/use-get-user-data";
import useGetUnreadNotificationCount from "@/lib/hooks/notification/use-get-unread-count";
import useNotificationStream from "@/lib/hooks/notification/use-notification-stream";
import { Notification } from "@/lib/hooks/notification/use-get-notifications/use-get-notifications.types";
import { getNotificationRoute } from "@/lib/notification-routing";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import Heading from "./ui/heading";
import { Skeleton } from "./ui/skeleton";
import toast from "./ui/toast";

function NavHeader() {
  const router = useRouter();
  const getUserData = useGetUserData();
  const isLoading = getUserData.isLoading && !getUserData?.value;
  const unreadCount = useGetUnreadNotificationCount();
  const count = unreadCount.value?.data?.count ?? 0;
  const isLoggedIn = !!getUserData?.value?.data;

  // Connect to notification stream for real-time updates
  useNotificationStream({
    enabled: isLoggedIn,
    onNotification: (notification: Notification) => {
      const actionRoute = getNotificationRoute(notification);

      toast.success({
        description: `${notification.title}: ${notification.message}`,
        button: {
          label: "View",
          onClick: () => {
            router.push(actionRoute);
          },
        },
      });
    },
    onConnected: () => {
      console.log("🔔 Notification stream connected");
    },
    onError: () => {
      console.warn("Notification stream disconnected, will retry...");
    },
  });

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-100 bg-white transition-[width,height] ease-linear">
      <div className="container-wrapper flex w-full items-center justify-between">
        <div className="-ml-3 flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Heading size="h5">Admin Dashboard</Heading>
        </div>
        <div className="flex items-center gap-1">
          <Link href={routes.NOTIFICATIONS}>
            <Button
              // asChild
              variant="ghost"
              size="icon"
              className="relative shrink-0"
            >
              <Bell className="h-5 w-5" />
              {count > 0 && (
                <span className="bg-brand-alternative absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium text-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Button>
          </Link>
          {isLoading ? (
            <div className="page-fade-in flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4.5 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ) : (
            <NavUser user={getUserData?.value?.data} />
          )}
        </div>
      </div>
    </header>
  );
}

export default NavHeader;
