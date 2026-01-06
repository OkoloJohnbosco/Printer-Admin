"use client";

import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader from "@/components/ui/table-row-skeleton";
import { User } from "@/lib/hooks/users/use-get-all-users/use-get-all-users.types";
import { Users } from "lucide-react";
import UserTableRow from "../user-tablerow";

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
}

export default function UserTable({ users, isLoading }: UserTableProps) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableSkeletonRowLoader length={5} noOfRows={10} />;
      </Table>
    );
  }

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
          <TableHead>Join Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserTableRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
}
