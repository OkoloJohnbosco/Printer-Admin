import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PayoutStatus,
  PayoutType,
} from "@/lib/hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import { formatStatusText } from "@/lib/utils";

interface ActiveFiltersBarProps {
  filters: {
    searchQuery: string;
    statusFilter: PayoutStatus | "all";
    typeFilter: PayoutType | "all";
    hubFilter: string | undefined;
    orderId: string | undefined;
  };
  resultCount: number | undefined;
  onClearAll: () => void;
  getHubName?: (hubId: string | undefined) => string;
}

export default function ActiveFiltersBar({
  filters,
  resultCount,
  onClearAll,
  getHubName,
}: ActiveFiltersBarProps) {
  const hasActiveFilters =
    filters.searchQuery ||
    filters.statusFilter !== "all" ||
    filters.typeFilter !== "all" ||
    (filters.hubFilter && filters.hubFilter !== "all") ||
    (filters.orderId && filters.orderId !== "all");

  if (!hasActiveFilters) return null;

  return (
    <div className="bg-muted/50 mb-4 flex items-center justify-between rounded-lg border px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium">
          Filter Result: {resultCount || 0}
        </span>
        {filters.searchQuery && (
          <Badge
            variant="secondary"
            className="gap-1 bg-white font-normal shadow-2xs"
          >
            Search: {filters.searchQuery}
          </Badge>
        )}
        {filters.statusFilter !== "all" && (
          <Badge
            variant="secondary"
            className="gap-1 bg-white font-normal shadow-2xs"
          >
            Status: {formatStatusText(filters.statusFilter.toLowerCase())}
          </Badge>
        )}
        {filters.typeFilter !== "all" && (
          <Badge
            variant="secondary"
            className="gap-1 bg-white font-normal shadow-2xs"
          >
            Type: {formatStatusText(filters.typeFilter.toLowerCase())}
          </Badge>
        )}
        {filters.hubFilter && filters.hubFilter !== "all" && (
          <Badge
            variant="secondary"
            className="gap-1 bg-white font-normal shadow-2xs"
          >
            Hub:{" "}
            {getHubName ? getHubName(filters.hubFilter) : filters.hubFilter}
          </Badge>
        )}
        {filters.orderId && filters.orderId !== "all" && (
          <Badge
            variant="secondary"
            className="gap-1 bg-white font-normal shadow-2xs"
          >
            Order ID: {filters.orderId}
          </Badge>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-muted-foreground hover:text-foreground h-auto p-0 text-sm font-normal"
      >
        Clear all
      </Button>
    </div>
  );
}
