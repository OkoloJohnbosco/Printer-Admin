"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetAllHubs, {
  HubStatus,
  PrintHub,
} from "@/lib/hooks/admin/use-get-all-hubs";
import { getHubStatusBadgeVariant } from "@/lib/utils";
import Link from "next/link";

const HUB_STATUS_LABELS: Record<HubStatus, string> = {
  [HubStatus.APPROVED]: "Operational",
  [HubStatus.PENDING]: "Pending verification",
  [HubStatus.REJECTED]: "Rejected",
  [HubStatus.ACTION_REQUIRED]: "Action required",
};

function getHubStatusLabel(status: string): string {
  return HUB_STATUS_LABELS[status as HubStatus] ?? status;
}

function HubRow({ hub }: { hub: PrintHub }) {
  const status = (hub.status ?? HubStatus.PENDING) as HubStatus;
  const location = [hub.city, hub.state].filter(Boolean).join(", ") || "—";

  return (
    <Link href={`/print-hubs/${hub.id}`} className="block">
      <div className="border-border hover:border-primary/30 hover:bg-muted/30 bg-card flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-3 transition-colors">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{hub.businessName}</p>
          <p className="text-muted-foreground mt-0.5 truncate text-xs">
            {location}
          </p>
        </div>
        <Badge
          variant={getHubStatusBadgeVariant(status)}
          className="shrink-0 font-normal"
        >
          {getHubStatusLabel(status)}
        </Badge>
      </div>
    </Link>
  );
}

function HubPerformanceCard() {
  const { value, isLoading } = useGetAllHubs({ limit: 6 });
  const hubs = value?.data?.hubs ?? [];

  return (
    <Card className="@container/card border-0 shadow-none">
      <CardHeader>
        <CardTitle>Print hub status</CardTitle>
        <CardDescription>
          Verification and operational status of your print hubs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-border bg-card flex items-center gap-4 rounded-lg border px-4 py-3"
              >
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            ))}
          </div>
        ) : hubs.length === 0 ? (
          <p className="text-muted-foreground py-4 text-sm">
            No print hubs yet. Approved hubs will appear here.
          </p>
        ) : (
          <div className="space-y-3">
            {hubs.map((hub) => (
              <HubRow key={hub.id} hub={hub} />
            ))}
            <Link
              href="/print-hubs"
              className="text-muted-foreground hover:text-foreground mt-4 block text-center text-sm"
            >
              View all hubs →
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default HubPerformanceCard;
