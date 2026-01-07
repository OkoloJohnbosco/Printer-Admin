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
import { AuditLog } from "@/lib/hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { FileText } from "lucide-react";
import AuditLogTableRow from "../audit-log-tablerow";

interface AuditLogTableProps {
  logs: AuditLog[];
  isLoading?: boolean;
}

export default function AuditLogTable({ logs, isLoading }: AuditLogTableProps) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity Type</TableHead>
            <TableHead>Entity ID</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableSkeletonRowLoader length={5} noOfRows={10} />
      </Table>
    );
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No Audit Logs Found"
        description="No audit logs match your current filters. Try adjusting your search criteria or clear the filters to see all logs."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Actor</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Entity Type</TableHead>
          <TableHead>Entity ID</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <AuditLogTableRow key={log.id} log={log} />
        ))}
      </TableBody>
    </Table>
  );
}
