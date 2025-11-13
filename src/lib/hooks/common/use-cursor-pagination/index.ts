import { useCallback, useState } from "react";

interface UseCursorPaginationOptions {
  initialItemsPerPage?: number;
  scrollOnPageChange?: boolean;
}

interface UseCursorPaginationReturn {
  // State
  currentCursor: string | undefined;
  currentPage: number;
  itemsPerPage: number;

  // Computed values
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  // Actions
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setNextCursor: (cursor: string | null | undefined) => void;
  resetPagination: () => void;
  setItemsPerPage: (items: number) => void;
}

/**
 * Custom hook for managing cursor-based pagination
 *
 * @param options - Configuration options for pagination
 * @returns Pagination state and handlers
 *
 * @example
 * ```tsx
 * const pagination = useCursorPagination({ initialItemsPerPage: 10 });
 *
 * // In your component
 * const { data } = useGetData(pagination.itemsPerPage, pagination.currentCursor);
 * pagination.setNextCursor(data?.nextCursor);
 * ```
 */
export function useCursorPagination(
  options: UseCursorPaginationOptions = {},
): UseCursorPaginationReturn {
  const { initialItemsPerPage = 10, scrollOnPageChange = true } = options;

  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined,
  );
  const [cursorHistory, setCursorHistory] = useState<(string | undefined)[]>([
    undefined,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [nextCursor, setNextCursorState] = useState<string | null | undefined>(
    undefined,
  );

  const hasNextPage = !!nextCursor;
  const hasPreviousPage = currentPage > 1;

  const scrollToTop = useCallback(() => {
    if (scrollOnPageChange) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scrollOnPageChange]);

  const handleNextPage = useCallback(() => {
    if (hasNextPage && nextCursor) {
      setCursorHistory((prev) => [...prev, currentCursor]);
      setCurrentCursor(nextCursor);
      setCurrentPage((prev) => prev + 1);
      scrollToTop();
    }
  }, [hasNextPage, nextCursor, currentCursor, scrollToTop]);

  const handlePreviousPage = useCallback(() => {
    if (hasPreviousPage && cursorHistory.length > 1) {
      const newHistory = [...cursorHistory];
      newHistory.pop(); // Remove current cursor
      const previousCursor = newHistory[newHistory.length - 1];
      setCursorHistory(newHistory);
      setCurrentCursor(previousCursor);
      setCurrentPage((prev) => prev - 1);
      scrollToTop();
    }
  }, [hasPreviousPage, cursorHistory, scrollToTop]);

  const setNextCursor = useCallback((cursor: string | null | undefined) => {
    setNextCursorState(cursor);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentCursor(undefined);
    setCursorHistory([undefined]);
    setCurrentPage(1);
    setNextCursorState(undefined);
    scrollToTop();
  }, [scrollToTop]);

  return {
    // State
    currentCursor,
    currentPage,
    itemsPerPage,

    // Computed values
    hasNextPage,
    hasPreviousPage,

    // Actions
    handleNextPage,
    handlePreviousPage,
    setNextCursor,
    resetPagination,
    setItemsPerPage,
  };
}
