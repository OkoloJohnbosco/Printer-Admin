"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "USER" | "ADMIN" | "HUB_OWNER";
  status: "ACTIVE" | "SUSPENDED";
  verified: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const router = useRouter();

  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Users Found"
        description="No users match your current filters. Try adjusting your search criteria or clear the filters to see all users."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="font-medium">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-muted-foreground text-sm">{user.phone}</div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  user.role === "ADMIN"
                    ? "info"
                    : user.role === "HUB_OWNER"
                      ? "secondary"
                      : "outline"
                }
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "ACTIVE" ? "info" : "destructive"}
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.verified ? "info" : "secondary"}>
                {user.verified ? "Verified" : "Unverified"}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString()
                : "Never"}
            </TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
}
