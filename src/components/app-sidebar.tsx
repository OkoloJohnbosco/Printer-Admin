"use client";

import {
  AudioWaveform,
  Command,
  FolderTree,
  GalleryVerticalEnd,
  LayoutDashboard,
  Package,
  Palette,
  Printer,
  ShieldCheck,
  Users,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: routes.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      title: "Order Management",
      url: routes.ORDER_MANAGEMENT,
      icon: Package,
    },
    {
      title: "Hub Management",
      url: routes.HUB_MANAGEMENT,
      icon: Printer,
    },
    {
      title: "User Management",
      url: routes.USER_MANAGEMENT,
      icon: Users,
    },
    {
      title: "Design Requests",
      url: routes.DESIGN_REQUESTS,
      icon: Palette,
    },
    {
      title: "Categories",
      url: routes.CATEGORIES,
      icon: FolderTree,
    },
    {
      title: "Templates",
      url: routes.TEMPLATES,
      icon: Palette,
    },
    {
      title: "Settings",
      url: routes.MY_ACCOUNT,
      icon: ShieldCheck,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="border-0! border-r! border-gray-100"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="px-4 transition-[width,height,padding] group-data-[collapsible=icon]:p-0">
            <Link href={routes.ROOT}>
              <Image
                height={50}
                width={100}
                src="/logo.svg"
                alt=""
                className="block group-data-[collapsible=icon]:hidden"
              />
              <Image
                height={70}
                width={70}
                src="/logo-sm.svg"
                alt=""
                className="hidden group-data-[collapsible=icon]:block"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Main" items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
