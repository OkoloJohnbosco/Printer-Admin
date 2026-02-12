"use client";

import DatePeriodFilter from "@/components/common/date-period-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import useDatePeriodFilter from "@/lib/hooks/common/use-date-period-filter";
import useGetOrderStats from "@/lib/hooks/stats/use-get-order-stats";
import { CheckCircle, Clock, Package, XCircle } from "lucide-react";

function OrderStatsRow() {
  const dateFilter = useDatePeriodFilter();

  const { value, isLoading } = useGetOrderStats({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
  });

  const stats = value?.data;

  return (
    <div className="space-y-4 pb-8">
      {/* Header with Date Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Heading size="h5">Order Statistics</Heading>
        <DatePeriodFilter filter={dateFilter} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Total Orders */}
        <Card className="@container/card border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-green-600/10">
              <Package className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-16" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.total?.toLocaleString() ?? "0"}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              {dateFilter.periodLabel}
            </p>
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card className="@container/card border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-yellow-600/10">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-16" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.pending?.toLocaleString() ?? "0"}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              {dateFilter.periodLabel}
            </p>
          </CardContent>
        </Card>

        {/* Rejected Orders */}
        <Card className="@container/card border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Orders
            </CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-red-600/10">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-12" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.rejected?.toLocaleString() ?? "0"}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              {dateFilter.periodLabel}
            </p>
          </CardContent>
        </Card>

        {/* Completed Orders */}
        <Card className="@container/card border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Orders
            </CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-green-600/10">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-16" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.completed?.toLocaleString() ?? "0"}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              {dateFilter.periodLabel}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderStatsRow;
