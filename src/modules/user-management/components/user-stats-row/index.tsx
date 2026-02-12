"use client";

import DatePeriodFilter from "@/components/common/date-period-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import useDatePeriodFilter from "@/lib/hooks/common/use-date-period-filter";
import useGetUserStats from "@/lib/hooks/stats/use-get-user-stats";
import { Shield, ShoppingBag, Store, Users } from "lucide-react";

export default function UserStatsRow() {
  const dateFilter = useDatePeriodFilter();

  const { value, isLoading } = useGetUserStats({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
  });

  const stats = value?.data;

  return (
    <div className="mb-6 space-y-4">
      {/* Header with Date Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Heading size="h5">User Statistics</Heading>
        <DatePeriodFilter filter={dateFilter} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Total Users */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-blue-600/10">
              <Users className="h-4 w-4 text-blue-600" />
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

        {/* Total Customers */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-green-600/10">
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-16" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.customers?.toLocaleString() ?? "0"}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              {dateFilter.periodLabel}
            </p>
          </CardContent>
        </Card>

        {/* Total Vendors */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-purple-600/10">
              <Store className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-16" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.vendors?.toLocaleString() ?? "0"}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              {dateFilter.periodLabel}
            </p>
          </CardContent>
        </Card>

        {/* Total Admins */}
        <Card className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-amber-600/10">
              <Shield className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="mt-1 block h-7 w-12" />
            ) : (
              <div className="page-fade-in text-2xl font-bold">
                {stats?.admins?.toLocaleString() ?? "0"}
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
