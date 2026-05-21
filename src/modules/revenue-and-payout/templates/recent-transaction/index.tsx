import toast from "@/components/ui/toast";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
import Heading from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useGetAllPayouts from "@/lib/hooks/payouts/use-get-all-payouts";
import {
  PayoutStatus,
  PayoutType,
} from "@/lib/hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import { formatStatusText } from "@/lib/utils";
import { useEffect, useState } from "react";
import ActiveFiltersBar from "../../components/active-filters-bar";
import RevenueHeader from "../../components/revenue-header";
import TransactionTable from "../../components/transaction-table";
import {
  downloadPayoutsCsv,
  fetchAllPayoutsForExport,
} from "../../utils/export-payouts-csv";

function RecentTransactions() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 20,
    scrollOnPageChange: true,
  });

  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState<{
    searchQuery: string;
    statusFilter: PayoutStatus | "all";
    typeFilter: PayoutType | "all";
    hubFilter: string | undefined;
    orderId: string | undefined;
  }>({
    searchQuery: "",
    statusFilter: "all",
    typeFilter: "all",
    hubFilter: undefined,
    orderId: undefined,
  });
  const getAllHubs = useGetAllHubs({
    limit: 100,
  });

  const getAllPayouts = useGetAllPayouts({
    cursor: pagination.currentCursor || "",
    limit: pagination.itemsPerPage,
    status:
      filters.statusFilter === "all"
        ? undefined
        : (filters.statusFilter as PayoutStatus),
    hubId: filters.hubFilter === "all" ? undefined : filters.hubFilter,
    type: PayoutType.FINAL,
    orderId: filters.orderId === "all" ? undefined : filters.orderId,
  });
  const nextCursor = getAllPayouts.value?.data?.nextCursor;

  // Update the next cursor when data changes
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  const clearAllFilters = () => {
    setFilters({
      searchQuery: "",
      statusFilter: "all",
      typeFilter: "all",
      hubFilter: "all",
      orderId: undefined,
    });
  };

  const getHubName = (hubId: string | undefined) => {
    if (!hubId) return "";
    const hub = getAllHubs?.value?.data?.hubs?.find((h) => h.id === hubId);
    return hub?.businessName || hubId;
  };

  const handleExportCSV = async () => {
    setIsExporting(true);

    try {
      const payoutsToExport = await fetchAllPayoutsForExport({
        status:
          filters.statusFilter === "all"
            ? undefined
            : (filters.statusFilter as PayoutStatus),
        hubId: filters.hubFilter === "all" ? undefined : filters.hubFilter,
        type: PayoutType.FINAL,
        orderId: filters.orderId === "all" ? undefined : filters.orderId,
      });

      if (payoutsToExport.length === 0) {
        toast.error({
          description: "No transactions to export for the current filters.",
        });
        return;
      }

      downloadPayoutsCsv(payoutsToExport);
      toast.success({
        description: `Exported ${payoutsToExport.length} transaction${payoutsToExport.length === 1 ? "" : "s"} to CSV.`,
      });
    } catch {
      toast.error({
        description: "Failed to export report. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <RevenueHeader
        onDownloadReport={handleExportCSV}
        isExporting={isExporting}
        isExportDisabled={getAllPayouts.isLoading}
      />
      <div className="grid w-full grid-cols-12 rounded-2xl bg-white shadow">
        <div className="col-span-12 flex items-center justify-between p-4">
          <div>
            <Heading size="h7">Recent Transactions</Heading>
            <p className="text-brand-gray-300 text-sm">
              View and manage your transaction history
            </p>
          </div>
          <div className="flex items-center gap-2">
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
                  <SelectItem
                    className="capitalize"
                    key={hub.id}
                    value={hub.id}
                  >
                    {hub?.businessName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.statusFilter}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  statusFilter: value as PayoutStatus | "all",
                })
              }
            >
              <SelectTrigger className="w-full capitalize md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.values(PayoutStatus).map((status) => (
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
            {/* <Select
            value={filters.typeFilter}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                typeFilter: value as PayoutType | "all",
              })
            }
          >
            <SelectTrigger className="w-full capitalize md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.values(PayoutType).map((status) => (
                <SelectItem className="capitalize" key={status} value={status}>
                  {formatStatusText(status?.toLowerCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          </div>
        </div>
        <div className="col-span-12 px-4">
          <ActiveFiltersBar
            filters={filters}
            resultCount={getAllPayouts?.value?.data?.payouts?.length}
            onClearAll={clearAllFilters}
            getHubName={getHubName}
          />
        </div>
        <div className="col-span-12 grid">
          <TransactionTable getAllPayouts={getAllPayouts} />
          <div className="rounded-2xl bg-white p-4">
            <CursorPaginationDetailed
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onNextPage={pagination.handleNextPage}
              onPreviousPage={pagination.handlePreviousPage}
              isLoading={getAllPayouts.isLoading}
              currentPage={pagination.currentPage}
              itemsPerPage={pagination.itemsPerPage}
              totalItemsOnCurrentPage={
                getAllPayouts.value?.data?.payouts?.length || 0
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentTransactions;
