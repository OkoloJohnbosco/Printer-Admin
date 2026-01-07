"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
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
import useGetAuditLogs from "@/lib/hooks/audit-logs/use-get-audit-logs";
import { AuditLogAction } from "@/lib/hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import { exportToCSV, formatStatusText } from "@/lib/utils";
import { Calendar1Icon, Download } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import ActiveFiltersBar from "./components/active-filters-bar";
import AuditLogTable from "./components/audit-log-table";
import AuditLogsStatsRow from "./components/audit-logs-stats-row";

export default function AuditLogsPageTemplate() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 20,
    scrollOnPageChange: true,
  });

  const [dateRange, setDateRangeState] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const setDateRange = useCallback((newDateRange: DateRange | undefined) => {
    setDateRangeState(newDateRange);
  }, []);

  const [filters, setFilters] = useState({
    actionFilter: "all",
  });

  const getAuditLogs = useGetAuditLogs({
    limit: pagination.itemsPerPage,
    cursor: pagination.currentCursor || "",
    action:
      filters.actionFilter === "all"
        ? undefined
        : (filters.actionFilter as AuditLogAction),
    startDate: dateRange?.from?.toISOString(),
    endDate: dateRange?.to?.toISOString(),
  });

  const nextCursor = getAuditLogs.value?.data?.nextCursor;

  // Update the next cursor when data changes
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  const logs = getAuditLogs.value?.data?.logs || [];
  const isDateSelected = dateRange?.from && dateRange?.to;

  const clearAllFilters = () => {
    setDateRange(undefined);
    setFilters({
      actionFilter: "all",
    });
  };

  const handleExportCSV = () => {
    const exportData = logs.map((log) => ({
      ID: log.id,
      Actor: log.actor
        ? `${log.actor.firstName} ${log.actor.lastName}`
        : "System",
      "Actor Email": log.actor?.email || "N/A",
      Action: log.action,
      "Target Type": log.targetType,
      "Target ID": log.targetId,
      Date: new Date(log.createdAt).toLocaleString(),
    }));

    exportToCSV(exportData, "audit-logs-export");
  };

  // Group actions by category for better UX
  const actionGroups = {
    Documents: [
      AuditLogAction.DOCUMENT_APPROVED,
      AuditLogAction.DOCUMENT_REJECTED,
    ],
    Hubs: [AuditLogAction.HUB_VERIFIED],
    Orders: [AuditLogAction.ORDER_REASSIGNED],
    Payouts: [AuditLogAction.PAYOUT_APPROVED, AuditLogAction.PAYOUT_REJECTED],
    Categories: [
      AuditLogAction.CATEGORY_CREATED,
      AuditLogAction.CATEGORY_UPDATED,
      AuditLogAction.CATEGORY_DELETED,
      AuditLogAction.SUBCATEGORY_CREATED,
      AuditLogAction.SUBCATEGORY_UPDATED,
      AuditLogAction.SUBCATEGORY_DELETED,
    ],
    Templates: [
      AuditLogAction.TEMPLATE_CREATED,
      AuditLogAction.TEMPLATE_UPDATED,
      AuditLogAction.TEMPLATE_DELETED,
    ],
    Config: [AuditLogAction.CONFIG_UPDATED, AuditLogAction.CONFIG_DELETED],
  };

  return (
    <div className="page-fade-in w-full space-y-6">
      <main>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Audit Logs</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Track and monitor all administrative actions on the platform
            </p>
          </div>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <AuditLogsStatsRow logs={logs} />

        <Card className="@container/card border-0 shadow-none">
          <CardHeader>
            <CardTitle>All Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline_gray"
                    id="date"
                    className="h-10 w-full justify-between rounded-md font-normal md:w-fit"
                  >
                    <Calendar1Icon className="mr-2 h-4 w-4" />
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
                  align="start"
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
              <Select
                value={filters.actionFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, actionFilter: value })
                }
              >
                <SelectTrigger className="w-full capitalize md:w-[280px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {Object.entries(actionGroups).map(([group, actions]) => (
                    <div key={group}>
                      <div className="text-muted-foreground px-2 py-1.5 text-xs font-semibold">
                        {group}
                      </div>
                      {actions.map((action) => (
                        <SelectItem
                          key={action}
                          value={action}
                          className="capitalize"
                        >
                          {formatStatusText(
                            action.toLowerCase().replace(/_/g, " "),
                          )}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ActiveFiltersBar
              filters={filters}
              dateRange={dateRange}
              resultCount={logs.length}
              onClearAll={clearAllFilters}
            />

            <AuditLogTable logs={logs} isLoading={getAuditLogs.isLoading} />

            <div className="mt-4">
              <CursorPaginationDetailed
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onNextPage={pagination.handleNextPage}
                onPreviousPage={pagination.handlePreviousPage}
                isLoading={getAuditLogs.isLoading}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                totalItemsOnCurrentPage={logs.length}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
