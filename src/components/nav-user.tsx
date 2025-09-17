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
import LogoutModal from "@/layout/components/logout-modal";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
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
            className="border-0 px-4 shadow-none hover:bg-white"
          >
            <Avatar className="h-9 w-9 rounded-full">
              <AvatarImage src="/profile.png" alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-brand-gray-400 truncate font-[family-name:var(--font-manrope-heading)] font-medium">
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
            <div className="profile-hero h-24 w-full"></div>
            <div className="-mt-12 flex flex-col items-center gap-1 px-1 py-1.5 text-left text-sm">
              <Avatar className="border-brand-alternative h-[75px] w-[75px] rounded-full border-2">
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
            <DropdownMenuItem className="text-brand-gray-700 justify-between rounded-none px-4 font-bold">
              Switch to Customer
              <ArrowUp01Icon />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              asChild
              className="text-brand-gray-700 rounded-none px-4 font-bold"
            >
              <Link href={routes.MY_ACCOUNT}>Your profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-brand-gray-700 rounded-none px-4 font-bold"
            >
              <Link href={routes.ORDER_MANAGEMENT}>Orders Management</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-brand-gray-700 rounded-none px-4 font-bold"
            >
              <Link href={routes.NOTIFICATIONS}>Notifications</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-brand-gray-700 rounded-none px-4 font-bold"
            >
              <Link href={routes.ROOT}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-brand-gray-700 rounded-none px-4 font-bold"
            >
              <Link href={routes.HELP_AND_SUPPORT}>Help</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onOpen}
            className="text-brand-gray-700 rounded-none px-4 font-bold"
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
