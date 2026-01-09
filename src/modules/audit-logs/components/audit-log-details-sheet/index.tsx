"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AuditLog } from "@/lib/hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { formatStatusText } from "@/lib/utils";
import {
  Calendar,
  CircleDollarSign,
  Copy,
  ExternalLink,
  Hash,
  Package,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface AuditLogDetailsSheetProps {
  log: AuditLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`${label} copied to clipboard`);
};

export default function AuditLogDetailsSheet({
  log,
  open,
  onOpenChange,
}: AuditLogDetailsSheetProps) {
  if (!log) return null;

  const actorName = log.actor
    ? `${log.actor.firstName} ${log.actor.lastName}`
    : null;

  const hasMetadata =
    log.metadata &&
    (log.metadata.hubId || log.metadata.orderId || log.metadata.amount);

  const formattedDate = new Date(log.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader className="space-y-1">
          <SheetTitle className="flex items-center gap-2">
            Audit Log Details
          </SheetTitle>
          <SheetDescription>
            View detailed information about this audit log entry
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-8">
          {/* Action Badge */}
          <div className="flex items-center justify-between">
            <Badge
              variant={getActionBadgeVariant(log.action)}
              className="px-3 py-1 text-sm"
            >
              {formatStatusText(log.action.toLowerCase().replace(/_/g, " "))}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => copyToClipboard(log.id, "Log ID")}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy ID
            </Button>
          </div>

          {/* Actor Information */}
          <div className="space-y-3">
            <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              Actor Information
            </h4>
            <div className="bg-muted/50 rounded-lg p-4">
              {actorName ? (
                <div className="space-y-2">
                  <div>
                    <p className="text-muted-foreground text-xs">Name</p>
                    <p className="font-medium">{actorName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Email</p>
                    <p className="font-medium">{log.actor.email}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <p className="text-muted-foreground text-xs">Actor ID</p>
                    <p className="font-mono text-sm">{log.actorId}</p>
                  </div>
                </div>
              )}
              <div className="mt-2">
                <p className="text-muted-foreground text-xs">Actor Type</p>
                <p className="font-medium capitalize">
                  {log.actorType.toLowerCase().replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Entity Information */}
          <div className="space-y-3">
            <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <Hash className="h-4 w-4" />
              Entity Information
            </h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid gap-3">
                <div>
                  <p className="text-muted-foreground text-xs">Entity Type</p>
                  <p className="font-medium capitalize">
                    {log.entityType.toLowerCase().replace(/_/g, " ")}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Entity ID</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm">{log.entityId}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => copyToClipboard(log.entityId, "Entity ID")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          {hasMetadata && (
            <>
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Additional Details
                </h4>
                <div className="space-y-3">
                  {log.metadata.orderId && (
                    <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary rounded-full p-2">
                          <Package className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Order ID
                          </p>
                          <p className="font-mono text-sm">
                            {log.metadata.orderId}
                          </p>
                        </div>
                      </div>
                      <Link href={`/orders/${log.metadata.orderId}`}>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          View
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}

                  {log.metadata.hubId && (
                    <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-purple-500/10 p-2 text-purple-500">
                          <Store className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Hub ID
                          </p>
                          <p className="font-mono text-sm">
                            {log.metadata.hubId}
                          </p>
                        </div>
                      </div>
                      <Link href={`/print-hubs/${log.metadata.hubId}`}>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          View
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}

                  {log.metadata.amount !== undefined &&
                    log.metadata.amount !== null && (
                      <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
                        <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                          <CircleDollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Amount
                          </p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(log.metadata.amount)}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Timestamp */}
          <div className="space-y-3">
            <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Timestamp
            </h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-medium">{formattedDate}</p>
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                {log.createdAt}
              </p>
            </div>
          </div>

          {/* Log ID */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">Log ID</p>
            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
              <p className="font-mono text-xs">{log.id}</p>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => copyToClipboard(log.id, "Log ID")}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
