"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckCheck, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface NotificationTabsProps {
  onMarkAllAsRead?: () => void;
  isMarkingAllAsRead?: boolean;
  hasNotifications?: boolean;
}

function NotificationTabs({
  onMarkAllAsRead,
  isMarkingAllAsRead,
  hasNotifications,
}: NotificationTabsProps) {
  const [active, setActive] = useState<string>("all");

  const tabs = [
    {
      title: "All",
      value: "all",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg bg-white p-4">
      <div className="flex items-center gap-2">
        {tabs?.map((tab) => (
          <Button
            key={tab.value}
            value={active}
            onClick={() => setActive(tab.value)}
            variant="ghost"
            className={cn(
              "text-foundation-black-300 items-end px-3 font-normal hover:bg-transparent sm:px-6",
              tab.value === active && "text-white",
            )}
          >
            <span
              className={cn(
                tab.value === active
                  ? "text-white"
                  : "text-foundation-black-300",
                "z-10 capitalize duration-200 ease-in-out",
              )}
            >
              {tab.title}
            </span>

            {tab.value === active ? (
              <motion.span
                className="absolute top-0 left-0 h-full w-full rounded-md bg-black"
                layoutId="underline-notification"
              />
            ) : null}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-lg min-w-[150px] md:max-w-xs">
          <Search className="text-foundation-black-200 absolute top-1/2 left-2 size-4 -translate-y-1/2" />
          <Input
            className="pl-7 text-xs"
            placeholder="Search notifications..."
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllAsRead}
          disabled={!hasNotifications || isMarkingAllAsRead}
          className="gap-1"
        >
          <CheckCheck className="size-4" />
          {isMarkingAllAsRead ? "Marking..." : "Mark all as read"}
        </Button>
      </div>
    </div>
  );
}

export default NotificationTabs;
