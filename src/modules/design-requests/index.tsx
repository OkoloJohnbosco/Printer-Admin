"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useGetAllDesignerRequests from "@/lib/hooks/design-requests/use-get-all-designer-requests";
import { DesignerRequestStatus } from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import DesignRequestsStatsCardRow from "./components/design-requests-stats-card-row";
import DesignRequestsTable from "./components/design-requests-table";

const STATUS_LABELS: Record<DesignerRequestStatus, string> = {
  [DesignerRequestStatus.PENDING]: "Pending",
  [DesignerRequestStatus.EXPIRED]: "Expired",
  [DesignerRequestStatus.REJECTED]: "Rejected",
  [DesignerRequestStatus.ACCEPTED]: "Accepted",
  [DesignerRequestStatus.COMPLETED]: "Completed",
  [DesignerRequestStatus.IN_PROGRESS]: "In Progress",
};

export default function DesignRequestsPageTemplate() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 20,
    scrollOnPageChange: true,
  });
  const [filters, setFilters] = useState<{
    searchTerm: string;
    statusFilter: DesignerRequestStatus | "all";
  }>({
    searchTerm: "",
    statusFilter: "all",
  });

  const getAllDesignerRequests = useGetAllDesignerRequests({
    cursor: pagination.currentCursor || "",
    limit: pagination.itemsPerPage,
    status: filters.statusFilter === "all" ? undefined : filters.statusFilter,
  });

  const nextCursor = getAllDesignerRequests.value?.data?.nextCursor;

  // Update the next cursor when data changes
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  return (
    <div className="page-fade-in w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Heading size="h4">Design Requests</Heading>
          <p className="text-muted-foreground text-sm">
            Manage customer design requests and designer assignments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <DesignRequestsStatsCardRow />

      {/* Filters */}
      <Card className="@container/card shadow-none">
        <CardHeader>
          <CardTitle>Design Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <div className="relative w-full min-w-[200px] flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search requests..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                className="pl-10"
              />
            </div>
            <Select
              value={filters.statusFilter}
              onValueChange={(value: DesignerRequestStatus | "all") =>
                setFilters({ ...filters, statusFilter: value })
              }
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.values(DesignerRequestStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-12 grid">
            <DesignRequestsTable
              getAllDesignerRequests={getAllDesignerRequests}
            />
            <div className="rounded-2xl bg-white p-4">
              <CursorPaginationDetailed
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onNextPage={pagination.handleNextPage}
                onPreviousPage={pagination.handlePreviousPage}
                isLoading={getAllDesignerRequests.isLoading}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                totalItemsOnCurrentPage={
                  getAllDesignerRequests.value?.data?.designerRequests
                    ?.length || 0
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
