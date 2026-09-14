"use client";

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
import { User } from "@/lib/hooks/auth/use-get-user-data";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import getInitials from "@/lib/utils";
import routes from "@/routes";
import Link from "next/link";
import { Button } from "./ui/button";

export function NavUser({ user }: { user?: User }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="page-fade-in h-9 w-9 shrink-0 border-0 p-0 shadow-none hover:bg-white md:h-auto md:w-auto md:px-4"
          >
            <Avatar className="h-8 w-8 rounded-full sm:h-9 sm:w-9">
              <AvatarImage src={user?.avatar || ""} alt={user?.firstName} />
              <AvatarFallback className="rounded-lg">
                {getInitials(`${user?.firstName} ${user?.lastName}`)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden min-w-0 flex-1 text-left text-sm leading-tight md:grid">
              <span className="text-brand-gray-400 truncate font-[family-name:var(--font-manrope-heading)] font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="truncate text-xs font-extralight">
                Admin - Print Hub
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[calc(100vw-2rem)] max-w-80 min-w-56 rounded-lg p-0 pb-3 md:w-(--radix-dropdown-menu-trigger-width) md:min-w-80"
          align="end"
          sideOffset={10}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="profile-hero h-24 w-full"></div>
            <div className="-mt-12 flex flex-col items-center gap-1 px-1 py-1.5 text-left text-sm">
              <Avatar className="border-brand-alternative z-10 h-[75px] w-[75px] rounded-full border-2 bg-white">
                {/* <AvatarImage src="/profile.png" alt={user?.firstName} /> */}
                <AvatarFallback className="rounded-lg bg-white text-xl font-bold text-black!">
                  {getInitials(`${user?.firstName} ${user?.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-center text-sm leading-tight">
                <span className="truncate text-lg font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>

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
