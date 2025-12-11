import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatStatusText } from "@/lib/utils";

interface ActiveFiltersBarProps {
  filters: {
    searchTerm: string;
    statusFilter: string;
    locationFilter: string;
  };
  resultCount: number | undefined;
  onClearAll: () => void;
  getLocationName: (locationValue: string) => string;
}

export default function ActiveFiltersBar({
  filters,
  resultCount,
  onClearAll,
  getLocationName,
}: ActiveFiltersBarProps) {
  const hasActiveFilters =
    filters.searchTerm ||
    filters.statusFilter !== "all" ||
    filters.locationFilter !== "all";

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
        {filters.statusFilter !== "all" && (
          <Badge variant="secondary" className="gap-1 bg-white font-normal">
            Status: {formatStatusText(filters.statusFilter.toLowerCase())}
          </Badge>
        )}
        {filters.locationFilter !== "all" && (
          <Badge variant="secondary" className="gap-1 bg-white font-normal">
            Location: {getLocationName(filters.locationFilter)}
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
