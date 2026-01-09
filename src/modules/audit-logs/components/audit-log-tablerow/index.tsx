"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { AuditLog } from "@/lib/hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { formatStatusText } from "@/lib/utils";

interface AuditLogTableRowProps {
  log: AuditLog;
  onSelect: (log: AuditLog) => void;
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function AuditLogTableRow({
  log,
  onSelect,
}: AuditLogTableRowProps) {
  const actorName = log.actor
    ? `${log.actor.firstName} ${log.actor.lastName}`
    : null;
  const actorEmail = log.actor?.email;

  const hasMetadata =
    log.metadata &&
    (log.metadata.hubId || log.metadata.orderId || log.metadata.amount);

  return (
    <TableRow
      className="hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => onSelect(log)}
    >
      <TableCell>
        {actorName ? (
          <>
            <div className="font-medium">{actorName}</div>
            <div className="text-muted-foreground text-xs">{actorEmail}</div>
          </>
        ) : (
          <>
            <div className="font-medium">{log.actorId.slice(0, 8)}...</div>
            <div className="text-muted-foreground text-xs capitalize">
              {log.actorType.toLowerCase().replace(/_/g, " ")}
            </div>
          </>
        )}
      </TableCell>
      <TableCell>
        <Badge variant={getActionBadgeVariant(log.action)}>
          {formatStatusText(log.action.toLowerCase().replace(/_/g, " "))}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="capitalize">
          {log.entityType.toLowerCase().replace(/_/g, " ")}
        </div>
        <div className="text-muted-foreground font-mono text-xs">
          {log.entityId.slice(0, 8)}...
        </div>
      </TableCell>
      <TableCell>
        {hasMetadata ? (
          <div className="space-y-1 text-xs">
            {log.metadata.orderId && (
              <div>
                <span className="text-muted-foreground">Order: </span>
                <span className="font-mono">
                  {log.metadata.orderId.slice(0, 8)}...
                </span>
              </div>
            )}
            {log.metadata.hubId && (
              <div>
                <span className="text-muted-foreground">Hub: </span>
                <span className="font-mono">
                  {log.metadata.hubId.slice(0, 8)}...
                </span>
              </div>
            )}
            {log.metadata.amount !== undefined &&
              log.metadata.amount !== null && (
                <div>
                  <span className="text-muted-foreground">Amount: </span>
                  <span className="font-medium">
                    {formatCurrency(log.metadata.amount)}
                  </span>
                </div>
              )}
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
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
