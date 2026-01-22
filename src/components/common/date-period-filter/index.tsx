"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DatePeriod,
  UseDatePeriodFilterReturn,
} from "@/lib/hooks/common/use-date-period-filter";
import { Calendar1Icon } from "lucide-react";

interface DatePeriodFilterProps {
  filter: UseDatePeriodFilterReturn;
  selectClassName?: string;
  align?: "start" | "center" | "end";
}

export function DatePeriodFilter({
  filter,
  selectClassName = "w-[140px]",
  align = "end",
}: DatePeriodFilterProps) {
  const {
    selectedPeriod,
    setSelectedPeriod,
    customDateRange,
    setCustomDateRange,
    isCustomDateSelected,
  } = filter;

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedPeriod}
        onValueChange={(value) => setSelectedPeriod(value as DatePeriod)}
      >
        <SelectTrigger className={selectClassName}>
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last_week">Last week</SelectItem>
          <SelectItem value="last_month">Last month</SelectItem>
          <SelectItem value="last_year">Last year</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {selectedPeriod === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline_gray"
              className="h-10 w-fit justify-between rounded-md font-normal"
            >
              <Calendar1Icon className="mr-2 h-4 w-4" />
              {isCustomDateSelected ? (
                <>
                  {customDateRange?.from?.toLocaleDateString()} -{" "}
                  {customDateRange?.to?.toLocaleDateString()}
                </>
              ) : (
                "Select date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align={align}>
            <Calendar
              mode="range"
              defaultMonth={customDateRange?.from}
              selected={customDateRange}
              onSelect={setCustomDateRange}
              numberOfMonths={2}
              className="rounded-lg border shadow-sm"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default DatePeriodFilter;
