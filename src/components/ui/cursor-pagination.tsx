"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CursorPaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  isLoading?: boolean;
  currentPage?: number;
  className?: string;
}

export function CursorPagination({
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  isLoading = false,
  currentPage = 1,
  className,
}: CursorPaginationProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2 py-4", className)}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousPage}
        disabled={!hasPreviousPage || isLoading}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2 px-4">
        <span className="text-muted-foreground text-sm">
          Page {currentPage}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={!hasNextPage || isLoading}
        className="gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface CursorPaginationDetailedProps extends CursorPaginationProps {
  itemsPerPage?: number;
  totalItemsOnCurrentPage?: number;
}

export function CursorPaginationDetailed({
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  isLoading = false,
  currentPage = 1,
  itemsPerPage = 10,
  totalItemsOnCurrentPage = 0,
  className,
}: CursorPaginationDetailedProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = (currentPage - 1) * itemsPerPage + totalItemsOnCurrentPage;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 sm:flex-row",
        className,
      )}
    >
      <div className="text-muted-foreground text-sm">
        {totalItemsOnCurrentPage > 0 ? (
          <>
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> results
          </>
        ) : (
          "No results found"
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousPage}
          disabled={!hasPreviousPage || isLoading}
          className="h-9 gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="border-input bg-background flex h-9 items-center rounded-md border px-3">
          <span className="text-sm font-medium">Page {currentPage}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!hasNextPage || isLoading}
          className="h-9 gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
