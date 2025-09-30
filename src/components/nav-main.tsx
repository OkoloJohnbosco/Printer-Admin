"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
  label = "Platform",
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  label?: string;
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel className="text-brand-gray-200 pl-4 font-[600]">
        {label}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-0 group-data-[collapsible=icon]:gap-2">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              variant="base"
              size="base"
              asChild
              tooltip={item.title}
              isActive={pathname.includes(item.url)}
            >
              <Link href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
