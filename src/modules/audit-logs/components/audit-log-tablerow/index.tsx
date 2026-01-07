"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { AuditLog } from "@/lib/hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { formatStatusText } from "@/lib/utils";

interface AuditLogTableRowProps {
  log: AuditLog;
}

const getActionBadgeVariant = (
  action: string,
): "info" | "destructive" | "secondary" | "purple" | "warning" | "outline" => {
  if (action.includes("APPROVED") || action.includes("VERIFIED")) {
    return "info";
  }
  if (action.includes("REJECTED") || action.includes("DELETED")) {
    return "destructive";
  }
  if (action.includes("CREATED")) {
    return "purple";
  }
  if (action.includes("UPDATED")) {
    return "warning";
  }
  if (action.includes("REASSIGNED")) {
    return "secondary";
  }
  return "outline";
};

export default function AuditLogTableRow({ log }: AuditLogTableRowProps) {
  const actorName = log.actor
    ? `${log.actor.firstName} ${log.actor.lastName}`
    : "System";

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{actorName}</div>
        <div className="text-muted-foreground text-xs">
          {log.actor?.email || "N/A"}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getActionBadgeVariant(log.action)}>
          {formatStatusText(log.action.toLowerCase().replace(/_/g, " "))}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="capitalize">{log.targetType.toLowerCase()}</span>
      </TableCell>
      <TableCell className="font-mono text-xs">
        {log.targetId.slice(0, 8)}...
      </TableCell>
      <TableCell>
        {new Date(log.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </TableCell>
    </TableRow>
  );
}
