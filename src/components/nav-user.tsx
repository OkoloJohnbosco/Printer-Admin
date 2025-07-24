"use client";

import { ArrowUp01Icon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDisclosure from "@/hooks/use-disclosure";
import LogoutModal from "@/layout/components/logout-modal";
import routes from "@/routes";
import Link from "next/link";
import { Button } from "./ui/button";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="px-4 border-0 shadow-none hover:bg-white"
          >
            <Avatar className="h-9 w-9 rounded-full">
              <AvatarImage src="/profile.png" alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-brand-gray-400 font-[family-name:var(--font-manrope-heading)] font-medium">
                {user.name}
              </span>
              <span className="truncate text-xs font-extralight">
                {user.email}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-80 rounded-lg p-0 pb-3"
          align="end"
          sideOffset={10}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="h-24 w-full profile-hero"></div>
            <div className="flex flex-col -mt-12 items-center gap-1 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-[75px] w-[75px] border-2 border-brand-alternative rounded-full">
                <AvatarImage src="/profile.png" alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-center text-sm leading-tight">
                <span className="truncate text-lg font-medium">
                  {user.name}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="justify-between font-bold text-brand-gray-700 px-4 rounded-none">
              Switch to Customer
              <ArrowUp01Icon />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              asChild
              className="font-bold text-brand-gray-700 px-4 rounded-none"
            >
              <Link href={routes.MY_ACCOUNT}>Your profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="font-bold text-brand-gray-700 px-4 rounded-none"
            >
              <Link href={routes.ORDER_MANAGEMENT}>Orders Management</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="font-bold text-brand-gray-700 px-4 rounded-none"
            >
              <Link href={routes.NOTIFICATIONS}>Notifications</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="font-bold text-brand-gray-700 px-4 rounded-none"
            >
              <Link href={routes.ROOT}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="font-bold text-brand-gray-700 px-4 rounded-none"
            >
              <Link href={routes.HELP_AND_SUPPORT}>Help</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onOpen}
            className="font-bold text-brand-gray-700 px-4 rounded-none"
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
