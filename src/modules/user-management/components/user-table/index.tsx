"use client";

import EmptyState from "@/components/ui/empty-state";
import { MobileListSkeleton } from "@/components/ui/mobile-list-skeleton";
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
import UserTableRow, { UserMobileCard } from "../user-tablerow";

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
}

export default function UserTable({ users, isLoading }: UserTableProps) {
  const tableHeader = (
    <TableHeader>
      <TableRow>
        <TableHead>User</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Join Date</TableHead>
      </TableRow>
    </TableHeader>
  );

  if (isLoading) {
    return (
      <>
        <MobileListSkeleton rows={8} />
        <div className="hidden md:block">
          <Table>
            {tableHeader}
            <TableSkeletonRowLoader length={4} noOfRows={10} />
          </Table>
        </div>
      </>
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
    <>
      <div className="divide-y md:hidden">
        {users.map((user) => (
          <UserMobileCard key={user.id} user={user} />
        ))}
      </div>

      <div className="hidden md:block">
        <Table>
          {tableHeader}
          <TableBody>
            {users.map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
