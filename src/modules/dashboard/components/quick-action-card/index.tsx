"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetAllHubs, { HubStatus } from "@/lib/hooks/admin/use-get-all-hubs";
import useGetAllDesignerRequests from "@/lib/hooks/design-requests/use-get-all-designer-requests";
import { DesignerRequestStatus } from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import useGetAllOrders from "@/lib/hooks/orders/use-get-all-orders";
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import { AlertCircle, CheckCircle, Clock, MapPin } from "lucide-react";
import Link from "next/link";

function getTodayDateRange() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;
  return { startDate: dateStr, endDate: dateStr };
}

function QuickActionCard() {
  const todayRange = getTodayDateRange();

  const pendingOrders = useGetAllOrders({
    cursor: "",
    limit: 100,
    status: OrderStatus.PENDING,
  });

  const pendingDesignRequests = useGetAllDesignerRequests({
    cursor: "",
    limit: 100,
    status: DesignerRequestStatus.PENDING,
  });

  const hubs = useGetAllHubs({ limit: 100 });
  const approvedHubs = hubs.value?.data?.hubs?.filter(
    (h) => h.status === HubStatus.APPROVED,
  );
  const totalHubs = hubs.value?.data?.hubs?.length ?? 0;
  const operationalCount = approvedHubs?.length ?? 0;

  const todayCompletedOrders = useGetAllOrders({
    cursor: "",
    limit: 100,
    status: OrderStatus.COMPLETED,
    startDate: todayRange.startDate,
    endDate: todayRange.endDate,
  });

  const pendingCount = pendingOrders.value?.data?.orders?.length ?? 0;
  const designPendingCount =
    pendingDesignRequests.value?.data?.designerRequests?.length ?? 0;
  const todayCompletedCount =
    todayCompletedOrders.value?.data?.orders?.length ?? 0;

  const isLoading =
    pendingOrders.isLoading ||
    pendingDesignRequests.isLoading ||
    hubs.isLoading ||
    todayCompletedOrders.isLoading;

  return (
    <Card className="@container/card border-0 shadow-none">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link href="/orders?status=PENDING">
            <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors">
              <AlertCircle className="text-warning h-5 w-5" />
              <div>
                <p className="font-medium">Pending Assignments</p>
                {isLoading ? (
                  <Skeleton className="mt-0.5 h-4 w-20" />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {pendingCount} order{pendingCount !== 1 ? "s" : ""} need
                    hubs
                  </p>
                )}
              </div>
            </div>
          </Link>

          <Link href="/design-requests?status=PENDING">
            <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors">
              <Clock className="text-info h-5 w-5" />
              <div>
                <p className="font-medium">Design Requests</p>
                {isLoading ? (
                  <Skeleton className="mt-0.5 h-4 w-24" />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {designPendingCount} awaiting assignment
                  </p>
                )}
              </div>
            </div>
          </Link>

          <Link href="/print-hubs">
            <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors">
              <MapPin className="text-success h-5 w-5" />
              <div>
                <p className="font-medium">Hub Status</p>
                {isLoading ? (
                  <Skeleton className="mt-0.5 h-4 w-28" />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {totalHubs === 0
                      ? "No hubs"
                      : operationalCount === totalHubs
                        ? "All hubs operational"
                        : `${operationalCount} of ${totalHubs} operational`}
                  </p>
                )}
              </div>
            </div>
          </Link>

          <Link href="/orders?status=COMPLETED">
            <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors">
              <CheckCircle className="text-success h-5 w-5" />
              <div>
                <p className="font-medium">Today&apos;s Completed</p>
                {isLoading ? (
                  <Skeleton className="mt-0.5 h-4 w-16" />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {todayCompletedCount} order
                    {todayCompletedCount !== 1 ? "s" : ""} finished
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickActionCard;
