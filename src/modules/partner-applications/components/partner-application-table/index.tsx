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
import { PartnerApplication } from "@/lib/hooks/admin/use-get-all-partner-applications/use-get-all-partner-applications.types";
import { Building2 } from "lucide-react";
import PartnerApplicationTableRow from "../partner-application-tablerow";

interface PartnerApplicationTableProps {
  applications: PartnerApplication[];
  isLoading?: boolean;
}

export default function PartnerApplicationTable({
  applications,
  isLoading,
}: PartnerApplicationTableProps) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Business Type</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableSkeletonRowLoader length={5} noOfRows={10} />
      </Table>
    );
  }

  if (applications.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No Partner Applications Found"
        description="No partner applications match your current filters. Try adjusting your search criteria or clear the filters to see all applications."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Business Type</TableHead>
          <TableHead>Applied Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <PartnerApplicationTableRow
            key={application.id}
            application={application}
          />
        ))}
      </TableBody>
    </Table>
  );
}
