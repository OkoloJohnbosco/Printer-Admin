"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
import { Input } from "@/components/ui/input";
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
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useDebounce from "@/lib/hooks/common/use-debounce";
import useGetAllOrders from "@/lib/hooks/orders/use-get-all-orders";
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import { formatStatusText } from "@/lib/utils";
import { Calendar1Icon, Loader, Search } from "lucide-react";
import React, { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import OrderTable from "../order-table";

export default function OrderFiltersCard() {
  const [dateRange, setDateRangeState] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const setDateRange = useCallback((newDateRange: DateRange | undefined) => {
    setDateRangeState(newDateRange);
  }, []);

  const pagination = useCursorPagination({
    initialItemsPerPage: 12,
    scrollOnPageChange: true,
  });

  const [filters, setFilters] = React.useState<{
    searchQuery: string;
    statusFilter: OrderStatus | "all";
    hubFilter: string | undefined;
  }>({
    searchQuery: "",
    statusFilter: "all",
    hubFilter: undefined,
  });
  const debouncedSearch = useDebounce(filters.searchQuery, 500);

  const getAllHubs = useGetAllHubs({
    limit: 20,
  });

  const getAllOrders = useGetAllOrders({
    cursor: pagination.currentCursor || "",
    limit: pagination.itemsPerPage,
    status:
      filters.statusFilter === "all"
        ? undefined
        : (filters.statusFilter as OrderStatus),
    hubId: filters.hubFilter === "all" ? undefined : filters.hubFilter,
    search: debouncedSearch,
    // startDate: date?.toISOString(),
    // endDate: date?.toISOString(),
  });

  const isDateSelected = dateRange?.from && dateRange?.to;

  return (
    <Card className="@container/card border-0 shadow-none">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by order ID, customer, or product..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
              type="search"
              className="px-9"
            />
            {getAllOrders.isLoading && filters.searchQuery && (
              <Loader className="text-foundation-black-200 absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 animate-spin" />
            )}
          </div>
          <Select
            value={filters.statusFilter}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                statusFilter: value as OrderStatus | "all",
              })
            }
          >
            <SelectTrigger className="w-full capitalize md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.values(OrderStatus).map((status) => (
                <SelectItem className="capitalize" key={status} value={status}>
                  {formatStatusText(status?.toLowerCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.hubFilter}
            onValueChange={(value) =>
              setFilters({ ...filters, hubFilter: value })
            }
          >
            <SelectTrigger className="w-full capitalize md:w-[180px]">
              <SelectValue placeholder="Filter by hub" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hubs</SelectItem>
              {getAllHubs?.value?.data?.hubs?.map((hub) => (
                <SelectItem className="capitalize" key={hub.id} value={hub.id}>
                  {hub?.businessName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline_gray"
                id="date"
                className="h-10 w-fit justify-between rounded-md font-normal"
              >
                <Calendar1Icon />
                {isDateSelected ? (
                  <>
                    {dateRange?.from?.toLocaleDateString()} -{" "}
                    {dateRange?.to?.toLocaleDateString()}
                  </>
                ) : (
                  "Date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="center"
            >
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-lg border shadow-sm"
              />
            </PopoverContent>
          </Popover>
        </div>

        <OrderTable getAllOrders={getAllOrders} />
        <div className="rounded-2xl bg-white p-4">
          <CursorPaginationDetailed
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            onNextPage={pagination.handleNextPage}
            onPreviousPage={pagination.handlePreviousPage}
            isLoading={getAllOrders.isLoading}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            totalItemsOnCurrentPage={
              getAllOrders.value?.data?.orders?.length || 0
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
