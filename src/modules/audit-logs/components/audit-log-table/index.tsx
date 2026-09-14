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
import { AuditLog } from "@/lib/hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { FileText } from "lucide-react";
import AuditLogTableRow, { AuditLogMobileCard } from "../audit-log-tablerow";

interface AuditLogTableProps {
  logs: AuditLog[];
  isLoading?: boolean;
  onSelectLog: (log: AuditLog) => void;
}

export default function AuditLogTable({
  logs,
  isLoading,
  onSelectLog,
}: AuditLogTableProps) {
  const tableHeader = (
    <TableHeader>
      <TableRow>
        <TableHead>Actor</TableHead>
        <TableHead>Action</TableHead>
        <TableHead>Entity</TableHead>
        <TableHead>Details</TableHead>
        <TableHead>Date</TableHead>
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
            <TableSkeletonRowLoader length={5} noOfRows={10} />
          </Table>
        </div>
      </>
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
    <>
      <div className="divide-y md:hidden">
        {logs.map((log) => (
          <AuditLogMobileCard key={log.id} log={log} onSelect={onSelectLog} />
        ))}
      </div>

      <div className="hidden md:block">
        <Table>
          {tableHeader}
          <TableBody>
            {logs.map((log) => (
              <AuditLogTableRow key={log.id} log={log} onSelect={onSelectLog} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
