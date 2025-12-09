"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useGetUserData from "@/lib/hooks/auth/use-get-user-data";
import { Bell } from "lucide-react";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import Heading from "./ui/heading";
import { Skeleton } from "./ui/skeleton";

function NavHeader() {
  const getUserData = useGetUserData();
  const isLoading = getUserData.isLoading && !getUserData?.value;
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-100 bg-white transition-[width,height] ease-linear">
      <div className="container-wrapper flex w-full items-center justify-between">
        <div className="-ml-3 flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Heading size="h5">Admin Dashboard</Heading>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
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
