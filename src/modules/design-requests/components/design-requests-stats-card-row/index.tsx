"use client";

import DatePeriodFilter from "@/components/common/date-period-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useDatePeriodFilter from "@/lib/hooks/common/use-date-period-filter";
import useGetDesignerRequestStats from "@/lib/hooks/stats/use-get-designer-request-stats";
import Heading from "@/components/ui/heading";
import { AlertCircle, CheckCircle, Clock, UserPlus } from "lucide-react";

export default function DesignRequestsStatsCardRow() {
  const dateFilter = useDatePeriodFilter();

  const { value, isLoading } = useGetDesignerRequestStats({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
  });

  const data = value?.data;

  const total = data?.total ?? 0;
  const pending = data?.pending ?? data?.PENDING ?? 0;
  const inProgress = data?.inProgress ?? data?.IN_PROGRESS ?? 0;
  const completed = data?.completed ?? data?.COMPLETED ?? 0;

  const stats = [
    { title: "Total Requests", value: total, icon: AlertCircle },
    { title: "Pending Assignment", value: pending, icon: UserPlus },
    { title: "In Progress", value: inProgress, icon: Clock },
    { title: "Completed", value: completed, icon: CheckCircle },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Heading size="h5">Design request stats</Heading>
        <DatePeriodFilter filter={dateFilter} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                </div>
              )}
              <p className="text-muted-foreground mt-1 text-xs">
                {dateFilter.periodLabel}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
