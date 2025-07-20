"use client";

import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Printer,
  Settings2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import routes from "@/routes";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      icon: BookOpen,
    },
    {
      title: "Revenue & Payout",
      url: routes.REVENUE_AND_PAYOUT,
      icon: Settings2,
    },
  ],

  navPrintHub: [
    {
      title: "Portfolio & Works",
      url: routes.PORTFOLIO_AND_WORKS,
      icon: LayoutDashboard,
    },
    {
      title: "Company Story",
      url: routes.COMPANY_STORY,
      icon: Printer,
    },
    {
      title: "Product Offerings",
      url: routes.PRODUCT_OFFERINGS,
      icon: BookOpen,
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
      icon: LayoutDashboard,
    },
    {
      title: "Notifications",
      url: routes.NOTIFICATIONS,
      icon: Printer,
    },
    {
      title: "Help & Support",
      url: routes.HELP_AND_SUPPORT,
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-white" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Main" items={data.navMain} />
        <NavMain label="Print Hub Management" items={data.navPrintHub} />
        <NavMain label="Settings" items={data.navSettings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
