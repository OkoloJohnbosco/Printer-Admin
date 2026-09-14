"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/lib/hooks/users/use-get-all-users/use-get-all-users.types";
import { formatStatusText } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface UserTableRowProps {
  user: User;
}

const getRoleBadgeVariant = (role: string) => {
  const variantMap: Record<
    string,
    "info" | "secondary" | "purple" | "outline"
  > = {
    ADMIN: "info",
    VENDOR: "purple",
    SYSTEM: "secondary",
    CUSTOMER: "outline",
  };
  return variantMap[role] || "outline";
};

export function UserMobileCard({ user }: UserTableRowProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/users/${user.id}`)}
      className="hover:bg-muted/50 w-full space-y-3 border-b p-4 text-left transition-colors last:border-b-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-muted-foreground mt-1 truncate text-xs">
            {user.email}
          </p>
        </div>
        <Badge variant={getRoleBadgeVariant(user.role)} className="shrink-0">
          {formatStatusText(user.role)}
        </Badge>
      </div>
      <p className="text-muted-foreground text-xs">
        Joined {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </button>
  );
}

export default function UserTableRow({ user }: UserTableRowProps) {
  const router = useRouter();

  const handleClick = () => router.push(`/users/${user.id}`);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <TableRow
      className="hover:bg-muted/50 cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <TableCell className="py-4">
        <div className="font-medium">
          {user.firstName} {user.lastName}
        </div>
      </TableCell>
      <TableCell className="py-4">{user.email}</TableCell>
      <TableCell className="py-4">
        <Badge variant={getRoleBadgeVariant(user.role)}>
          {formatStatusText(user.role)}
        </Badge>
      </TableCell>
      <TableCell className="py-4">
        {new Date(user.createdAt).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}
