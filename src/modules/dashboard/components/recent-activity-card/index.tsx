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
import useGetAllOrders from "@/lib/hooks/orders/use-get-all-orders";
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import {
  formatCurrency,
  formatStatusText,
  getOrderStatusBadgeVariant,
} from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Package } from "lucide-react";
import Link from "next/link";

function RecentActivityCard() {
  const { value, isLoading } = useGetAllOrders({
    cursor: "",
    limit: 6,
  });

  const orders = value?.data?.orders ?? [];

  return (
    <Card className="@container/card border-0 shadow-none">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Last 6 orders placed on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Package className="text-muted-foreground mb-2 h-8 w-8" />
            <p className="text-muted-foreground text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="border-border hover:bg-muted/50 flex items-start gap-3 border-b py-3 transition-colors last:border-0 last:pb-0"
              >
                <div className="bg-primary/10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  <Package className="text-primary h-4 w-4" />
                </div>
                <div className="flex flex-1 items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {order.customerName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {order.hubName} •{" "}
                      {formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge
                      variant={getOrderStatusBadgeVariant(
                        order.status as OrderStatus,
                      )}
                      className="text-xs"
                    >
                      {formatStatusText(order.status)}
                    </Badge>
                    <span className="text-sm font-semibold">
                      {formatCurrency(Number(order.total))}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentActivityCard;
