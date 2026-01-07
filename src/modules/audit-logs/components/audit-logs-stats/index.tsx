import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditLog } from "@/lib/hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { FileText, Shield } from "lucide-react";

interface AuditLogsStatsProps {
  logs: AuditLog[];
}

export default function AuditLogsStats({ logs }: AuditLogsStatsProps) {
  const approvalCount = logs.filter(
    (l) => l.action.includes("APPROVED") || l.action.includes("VERIFIED"),
  ).length;

  const rejectionCount = logs.filter(
    (l) => l.action.includes("REJECTED") || l.action.includes("DELETED"),
  ).length;

  const configCount = logs.filter((l) => l.action.includes("CONFIG")).length;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
          <FileText className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{logs.length}</div>
          <p className="text-muted-foreground text-xs">Current page</p>
        </CardContent>
      </Card>
      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Approval Actions
          </CardTitle>
          <Shield className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvalCount}</div>
          <p className="text-muted-foreground text-xs">On current page</p>
        </CardContent>
      </Card>
      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Rejection Actions
          </CardTitle>
          <Shield className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rejectionCount}</div>
          <p className="text-muted-foreground text-xs">On current page</p>
        </CardContent>
      </Card>
      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Config Changes</CardTitle>
          <Shield className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{configCount}</div>
          <p className="text-muted-foreground text-xs">On current page</p>
        </CardContent>
      </Card>
    </div>
  );
}
