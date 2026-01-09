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
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useDebounce from "@/lib/hooks/common/use-debounce";
import useGetAllUsers from "@/lib/hooks/users/use-get-all-users";
import { UserRole } from "@/lib/hooks/users/use-get-all-users/use-get-all-users.types";
import { exportToCSV, formatStatusText } from "@/lib/utils";
import {
  Calendar1Icon,
  Download,
  Loader,
  Search,
  UserPlus,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import ActiveFiltersBar from "./components/active-filters-bar";
import UserStatsRow from "./components/user-stats-row";
import UserTable from "./components/user-table";

export default function UserManagementPageTemplate() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 12,
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
    searchTerm: "",
    roleFilter: "all",
  });
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

  const getAllUsers = useGetAllUsers({
    limit: pagination.itemsPerPage,
    cursor: pagination.currentCursor || "",
    role:
      filters.roleFilter === "all"
        ? undefined
        : (filters.roleFilter as UserRole),
    startDate: dateRange?.from?.toISOString(),
    endDate: dateRange?.to?.toISOString(),
    search: debouncedSearchTerm,
  });

  const nextCursor = getAllUsers.value?.data?.nextCursor;

  // Update the next cursor when data changes
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  const users = getAllUsers.value?.data?.data || [];
  const isDateSelected = dateRange?.from && dateRange?.to;

  const clearAllFilters = () => {
    setDateRange(undefined);
    setFilters({
      searchTerm: "",
      roleFilter: "all",
    });
  };
  const handleExportCSV = () => {
    const exportData = users.map((user) => ({
      "User ID": user.id,
      Name: `${user.firstName} ${user.lastName}`,
      Email: user.email,
      Role: user.role,
      "Join Date": new Date(user.createdAt).toLocaleDateString(),
    }));

    exportToCSV(exportData, "users-export");
  };

  return (
    <div className="page-fade-in w-full space-y-6">
      <main>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage and monitor all platform users
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="default_blue">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <UserStatsRow />

        <Card className="@container/card border-0 shadow-none">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search by name or email..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters({ ...filters, searchTerm: e.target.value })
                  }
                  className="pl-9"
                />
                {getAllUsers.isLoading && filters.searchTerm && (
                  <Loader className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
                )}
              </div>
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
              <Select
                value={filters.roleFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, roleFilter: value })
                }
              >
                <SelectTrigger className="w-full capitalize md:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role} className="capitalize">
                      {formatStatusText(role.toLowerCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ActiveFiltersBar
              filters={filters}
              dateRange={dateRange}
              resultCount={users.length}
              onClearAll={clearAllFilters}
            />

            <UserTable users={users} isLoading={getAllUsers.isLoading} />

            <div className="mt-4">
              <CursorPaginationDetailed
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onNextPage={pagination.handleNextPage}
                onPreviousPage={pagination.handlePreviousPage}
                isLoading={getAllUsers.isLoading}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                totalItemsOnCurrentPage={users.length}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
