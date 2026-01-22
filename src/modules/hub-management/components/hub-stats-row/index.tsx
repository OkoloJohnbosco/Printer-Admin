"use client";

import DatePeriodFilter from "@/components/common/date-period-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import useDatePeriodFilter from "@/lib/hooks/common/use-date-period-filter";
import useGetHubStats from "@/lib/hooks/stats/use-get-hub-stats";
import { Activity, MapPin, Package, XCircle } from "lucide-react";

function HubStatsRow() {
  const dateFilter = useDatePeriodFilter();

  const { value, isLoading } = useGetHubStats({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
  });

  const stats = value?.data;

  return (
    <div className="space-y-4">
      {/* Header with Date Toggle */}
      <div className="flex items-center justify-between">
        <Heading size="h5">Hub Statistics</Heading>
        <DatePeriodFilter filter={dateFilter} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Hubs */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hubs</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-blue-600/10">
              <MapPin className="h-4 w-4 text-blue-600" />
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

        {/* Active Hubs */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hubs</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-green-600/10">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-16" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.active?.toLocaleString() ?? "0"}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              {dateFilter.periodLabel}
            </p>
          </CardContent>
        </Card>

        {/* Pending Verification */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Verification
            </CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-yellow-600/10">
              <Package className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-12" />
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

        {/* Rejected Hubs */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Hubs</CardTitle>
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
      </div>
    </div>
  );
}

export default HubStatsRow;
