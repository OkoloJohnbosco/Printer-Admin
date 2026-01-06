import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatStatusText } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface ActiveFiltersBarProps {
  filters: {
    searchTerm: string;
    roleFilter: string;
  };
  dateRange: DateRange | undefined;
  resultCount: number | undefined;
  onClearAll: () => void;
}

export default function ActiveFiltersBar({
  filters,
  dateRange,
  resultCount,
  onClearAll,
}: ActiveFiltersBarProps) {
  const isDateSelected = dateRange?.from && dateRange?.to;

  const hasActiveFilters =
    filters.searchTerm || filters.roleFilter !== "all" || isDateSelected;

  if (!hasActiveFilters) return null;

  return (
    <div className="bg-muted/50 mb-4 flex items-center justify-between rounded-lg border px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium">
          Filter Result: {resultCount || 0}
        </span>
        {filters.searchTerm && (
          <Badge variant="secondary" className="gap-1 bg-white font-normal">
            Search: {filters.searchTerm}
          </Badge>
        )}
        {filters.roleFilter !== "all" && (
          <Badge variant="secondary" className="gap-1 bg-white font-normal">
            Role: {formatStatusText(filters.roleFilter.toLowerCase())}
          </Badge>
        )}
        {isDateSelected && (
          <Badge variant="secondary" className="gap-1 bg-white font-normal">
            Date: {dateRange?.from?.toLocaleDateString()} -{" "}
            {dateRange?.to?.toLocaleDateString()}
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
