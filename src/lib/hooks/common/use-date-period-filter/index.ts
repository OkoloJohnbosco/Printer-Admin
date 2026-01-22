"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

export type DatePeriod = "last_week" | "last_month" | "last_year" | "custom";

export const periodLabels: Record<DatePeriod, string> = {
  last_week: "Last week",
  last_month: "Last month",
  last_year: "Last year",
  custom: "Custom",
};

function getDateRangeFromPeriod(period: DatePeriod): {
  startDate: Date;
  endDate: Date;
} {
  const now = new Date();
  const endDate = new Date(now);

  switch (period) {
    case "last_week":
      return {
        startDate: new Date(now.setDate(now.getDate() - 7)),
        endDate,
      };
    case "last_month":
      return {
        startDate: new Date(now.setMonth(now.getMonth() - 1)),
        endDate,
      };
    case "last_year":
      return {
        startDate: new Date(now.setFullYear(now.getFullYear() - 1)),
        endDate,
      };
    default:
      return {
        startDate: new Date(now.setDate(now.getDate() - 7)),
        endDate,
      };
  }
}

export interface UseDatePeriodFilterOptions {
  defaultPeriod?: DatePeriod;
}

export interface UseDatePeriodFilterReturn {
  selectedPeriod: DatePeriod;
  setSelectedPeriod: (period: DatePeriod) => void;
  customDateRange: DateRange | undefined;
  setCustomDateRange: (range: DateRange | undefined) => void;
  startDate: string | undefined;
  endDate: string | undefined;
  periodLabel: string;
  isCustomDateSelected: boolean;
}

export function useDatePeriodFilter(
  options: UseDatePeriodFilterOptions = {},
): UseDatePeriodFilterReturn {
  const { defaultPeriod = "last_week" } = options;

  const [selectedPeriod, setSelectedPeriod] =
    useState<DatePeriod>(defaultPeriod);
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    {
      from: undefined,
      to: undefined,
    },
  );

  const { startDate, endDate } = useMemo(() => {
    if (selectedPeriod === "custom" && customDateRange?.from) {
      return {
        startDate: customDateRange.from.toISOString(),
        endDate: customDateRange.to?.toISOString(),
      };
    }
    const range = getDateRangeFromPeriod(selectedPeriod);
    return {
      startDate: range.startDate.toISOString(),
      endDate: range.endDate.toISOString(),
    };
  }, [selectedPeriod, customDateRange]);

  const isCustomDateSelected = Boolean(
    customDateRange?.from && customDateRange?.to,
  );

  return {
    selectedPeriod,
    setSelectedPeriod,
    customDateRange,
    setCustomDateRange,
    startDate,
    endDate,
    periodLabel: periodLabels[selectedPeriod],
    isCustomDateSelected,
  };
}

export default useDatePeriodFilter;
