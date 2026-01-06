"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/lib/hooks/users/use-get-all-users/use-get-all-users.types";
import { formatStatusText } from "@/lib/utils";
import { Eye } from "lucide-react";
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

export default function UserTableRow({ user }: UserTableRowProps) {
  const router = useRouter();

  return (
    <TableRow key={user.id}>
      <TableCell>
        <div className="font-medium">
          {user.firstName} {user.lastName}
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Badge variant={getRoleBadgeVariant(user.role)}>
          {formatStatusText(user.role)}
        </Badge>
      </TableCell>
      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/users/${user.id}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
