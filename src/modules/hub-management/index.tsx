"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllHubs, { HubStatus } from "@/lib/hooks/admin/use-get-all-hubs";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useDebounce from "@/lib/hooks/common/use-debounce";
import { cn, formatStatusText } from "@/lib/utils";
import { Loader, Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ActiveFiltersBar from "./components/active-filters-bar";
import HubStatsRow from "./components/hub-stats-row";
import PrintHubTable from "./components/printhub-table";
import PrintHubGrid from "./templates/print-hub-grid";

const tabs = [
  {
    title: "Gallery",
    value: "gallery",
  },
  {
    title: "List",
    value: "list",
  },
];

const cities = [
  {
    label: "Ikeja",
    value: "ikeja",
  },
  {
    label: "Ajah",
    value: "ajah",
  },
  {
    label: "Lekki",
    value: "lekki",
  },
  {
    label: "Victoria Island",
    value: "victoria-island",
  },
  {
    label: "Festac",
    value: "festac",
  },
  {
    label: "Ogba",
    value: "ogba",
  },
  {
    label: "Yaba",
    value: "yaba",
  },
];

export default function PrintHubsPageTemplate() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 20,
    scrollOnPageChange: true,
  });

  const [filters, setFilters] = useState({
    searchTerm: "",
    statusFilter: "all",
    locationFilter: "all",
  });
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

  const getAllHubs = useGetAllHubs({
    limit: pagination.itemsPerPage,
    search: debouncedSearchTerm,
    location:
      filters.locationFilter === "all" ? undefined : filters.locationFilter,
    cursor: pagination.currentCursor || "",
    status:
      filters.statusFilter === "all"
        ? undefined
        : (filters.statusFilter as HubStatus),
  });
  const nextCursor = getAllHubs.value?.data?.nextCursor;

  // Update the next cursor when data changes
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  const [active, setActive] = useState<string>("list");

  const clearAllFilters = () => {
    setFilters({
      searchTerm: "",
      statusFilter: "all",
      locationFilter: "all",
    });
  };

  const getLocationName = (locationValue: string) => {
    const city = cities.find((c) => c.value === locationValue);
    return city?.label || locationValue;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Print Hubs
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage and monitor print hub operations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <HubStatsRow />

      {/* Filters */}
      <Card className="@container/card shadow-none">
        <CardHeader>
          <CardTitle>Filter Hubs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="relative w-full sm:min-w-[200px] sm:flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search hubs..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                type="search"
                className="pr-6 pl-10"
              />
              {getAllHubs?.isLoading && filters.searchTerm && (
                <Loader className="text-foundation-black-200 absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 animate-spin" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Select
                value={filters.statusFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, statusFilter: value })
                }
              >
                <SelectTrigger className="w-full capitalize sm:w-fit">
                  <SelectValue
                    className="capitalize"
                    placeholder="Filter by status"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(HubStatus).map((status) => (
                    <SelectItem
                      className="capitalize"
                      key={status}
                      value={status}
                    >
                      {formatStatusText(status?.toLowerCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.locationFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, locationFilter: value })
                }
              >
                <SelectTrigger className="w-full sm:w-fit">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="bg-brand-gray-50 flex shrink-0 items-center gap-2 overflow-hidden rounded-full">
                {tabs?.map((tab) => (
                  <Button
                    key={tab.value}
                    value={active}
                    onClick={() => setActive(tab.value)}
                    variant="ghost"
                    className={cn(
                      "text-foundation-black-300 items-center justify-center px-3 font-normal hover:bg-transparent sm:px-6",
                      tab.value === active && "text-white",
                    )}
                  >
                    <span
                      className={cn(
                        tab.value === active
                          ? "text-white"
                          : "text-foundation-black-300",
                        "z-10 capitalize duration-200 ease-in-out",
                      )}
                    >
                      {tab.title}
                    </span>

                    {tab.value === active ? (
                      <motion.span
                        className="absolute top-0 left-0 h-full w-full rounded-full bg-black"
                        layoutId="underline-notification"
                      />
                    ) : null}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <ActiveFiltersBar
            filters={filters}
            resultCount={getAllHubs.value?.data?.hubs?.length}
            onClearAll={clearAllFilters}
            getLocationName={getLocationName}
          />

          <div>
            {/* Print Hubs Grid */}
            {active === "gallery" ? (
              <PrintHubGrid getAllHubs={getAllHubs} />
            ) : (
              <PrintHubTable getAllHubs={getAllHubs} />
            )}
            <div className="rounded-2xl bg-white p-4">
              <CursorPaginationDetailed
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onNextPage={pagination.handleNextPage}
                onPreviousPage={pagination.handlePreviousPage}
                isLoading={getAllHubs.isLoading}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                totalItemsOnCurrentPage={
                  getAllHubs.value?.data?.hubs?.length || 0
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
