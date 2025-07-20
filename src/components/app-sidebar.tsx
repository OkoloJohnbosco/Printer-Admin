"use client";

import {
  AudioWaveform,
  BellIcon,
  Castle,
  CircleDollarSign,
  CircleQuestionMark,
  Command,
  GalleryVertical,
  GalleryVerticalEnd,
  LayoutDashboard,
  Printer,
  Settings2,
  ShieldCheck,
  Tag,
  UserRoundCog,
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
      title: "Print Jobs",
      url: routes.PRINT_JOBS,
      icon: Printer,
    },
    {
      title: "Verification",
      url: routes.VERIFICATION,
      icon: ShieldCheck,
    },
    {
      title: "Revenue & Payout",
      url: routes.REVENUE_AND_PAYOUT,
      icon: CircleDollarSign,
    },
  ],

  navPrintHub: [
    {
      title: "Portfolio & Works",
      url: routes.PORTFOLIO_AND_WORKS,
      icon: GalleryVertical,
    },
    {
      title: "Company Story",
      url: routes.COMPANY_STORY,
      icon: Castle,
    },
    {
      title: "Product Offerings",
      url: routes.PRODUCT_OFFERINGS,
      icon: Tag,
    },
    {
      title: "Order Management",
      url: routes.ORDER_MANAGEMENT,
      icon: Settings2,
    },
  ],

  navSettings: [
    {
      title: "Account",
      url: routes.MY_ACCOUNT,
      icon: UserRoundCog,
    },
    {
      title: "Notifications",
      url: routes.NOTIFICATIONS,
      icon: BellIcon,
    },
    {
      title: "Help & Support",
      url: routes.HELP_AND_SUPPORT,
      icon: CircleQuestionMark,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-0!" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="px-4 transition-[width,height,padding] group-data-[collapsible=icon]:p-0">
            <Link href={routes.ROOT}>
              <Image
                height={50}
                width={100}
                src="/logo.svg"
                alt=""
                className="group-data-[collapsible=icon]:hidden block"
              />
              <Image
                height={70}
                width={70}
                src="/logo-sm.svg"
                alt=""
                className="group-data-[collapsible=icon]:block hidden"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Main" items={data.navMain} />
        <NavMain label="Print Hub Management" items={data.navPrintHub} />
        <NavMain label="Settings" items={data.navSettings} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
