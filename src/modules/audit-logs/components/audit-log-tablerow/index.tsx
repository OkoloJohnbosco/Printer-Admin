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
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{log.actorId.slice(0, 8)}...</div>
        <div className="text-muted-foreground text-xs capitalize">
          {log.actorType.toLowerCase().replace(/_/g, " ")}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getActionBadgeVariant(log.action)}>
          {formatStatusText(log.action.toLowerCase().replace(/_/g, " "))}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="capitalize">
          {log.entityType.toLowerCase().replace(/_/g, " ")}
        </span>
      </TableCell>
      <TableCell className="font-mono text-xs">
        {log.entityId.slice(0, 8)}...
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
