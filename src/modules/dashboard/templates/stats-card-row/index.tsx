"use client";

import DatePeriodFilter from "@/components/common/date-period-filter";
import { NairaIcon } from "@/components/ui/icons";
import Heading from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import useDatePeriodFilter from "@/lib/hooks/common/use-date-period-filter";
import useGetDashboardStats from "@/lib/hooks/stats/use-get-dashboard-stats";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Users, XCircle } from "lucide-react";

function StatsCardRow() {
  const dateFilter = useDatePeriodFilter();

  const { value, isLoading } = useGetDashboardStats({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
  });

  const stats = value?.data;

  return (
    <div className="space-y-4">
      {/* Header with Date Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Heading size="h5">Overview</Heading>
        <DatePeriodFilter filter={dateFilter} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Total Orders */}
        <div className="space-y-4 rounded-lg bg-white px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-brand-purple-500 grid h-12 w-12 place-items-center rounded-full">
              <ShoppingCart className="text-brand-gray-400 h-4 w-4" />
            </div>
            <div>
              <p className="text-nm">Total Orders</p>
              {isLoading ? (
                <Skeleton className="mt-1 block h-7 w-16" />
              ) : (
                <Heading size="h4" className="page-fade-in">
                  {stats?.totalOrders?.toLocaleString() ?? "0"}
                </Heading>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            {dateFilter.periodLabel}
          </p>
        </div>

        {/* Total Customers */}
        <div className="space-y-4 rounded-lg bg-white px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-brand-green-200 grid h-12 w-12 place-items-center rounded-full">
              <Users className="text-brand-green-300 h-4 w-4" />
            </div>
            <div>
              <p className="text-nm">Total Customers</p>
              {isLoading ? (
                <Skeleton className="mt-1 block h-7 w-16" />
              ) : (
                <Heading size="h4" className="page-fade-in">
                  {stats?.totalCustomers?.toLocaleString() ?? "0"}
                </Heading>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            {dateFilter.periodLabel}
          </p>
        </div>

        {/* Total Revenue */}
        <div className="space-y-4 rounded-lg bg-white px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-brand-blue-100 grid h-12 w-12 place-items-center rounded-full">
              <NairaIcon className="text-brand-blue-200 h-4 w-4" />
            </div>
            <div>
              <p className="text-nm">Total Revenue</p>
              {isLoading ? (
                <Skeleton className="mt-1 block h-7 w-24" />
              ) : (
                <Heading size="h4" className="page-fade-in">
                  {formatCurrency(stats?.totalIncome ?? 0)}
                </Heading>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            {dateFilter.periodLabel}
          </p>
        </div>

        {/* Rejected Orders */}
        <div className="space-y-4 rounded-lg bg-white px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-brand-yellow-100 grid h-12 w-12 place-items-center rounded-full">
              <XCircle className="text-brand-yellow-200 h-4 w-4" />
            </div>
            <div>
              <p className="text-nm">Rejected Orders</p>
              {isLoading ? (
                <Skeleton className="mt-1 block h-7 w-12" />
              ) : (
                <Heading size="h4" className="page-fade-in">
                  {stats?.rejectedOrders?.toLocaleString() ?? "0"}
                </Heading>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            {dateFilter.periodLabel}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatsCardRow;
