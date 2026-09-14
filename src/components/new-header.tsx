"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useGetUserData from "@/lib/hooks/auth/use-get-user-data";
import { Notification } from "@/lib/hooks/notification/use-get-notifications/use-get-notifications.types";
import useGetUnreadNotificationCount from "@/lib/hooks/notification/use-get-unread-count";
import useNotificationStream from "@/lib/hooks/notification/use-notification-stream";
import { getNotificationRoute } from "@/lib/notification-routing";
import routes from "@/routes";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center border-b border-gray-100 bg-white transition-[width,height] ease-linear sm:h-16">
      <div className="container-wrapper flex w-full min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:-ml-3 sm:gap-2 sm:px-4">
          <SidebarTrigger className="size-9 shrink-0 sm:size-7" />
          <Heading size="h5" className="truncate md:text-[20px]">
            Admin Dashboard
          </Heading>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Link href={routes.NOTIFICATIONS}>
            <Button
              variant="ghost"
              size="icon"
              className="relative size-9 shrink-0 sm:size-10"
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
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              <div className="hidden flex-col gap-1 md:flex">
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
