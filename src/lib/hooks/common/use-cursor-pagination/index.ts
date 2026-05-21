"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const PAGINATION_PAGE_PARAM = "page";
export const PAGINATION_CURSOR_PARAM = "cursor";
export const PAGINATION_LIMIT_PARAM = "limit";

interface UseCursorPaginationOptions {
  initialItemsPerPage?: number;
  scrollOnPageChange?: boolean;
  /** Sync page, cursor, and limit to URL query params (default: true) */
  syncToUrl?: boolean;
}

interface UseCursorPaginationReturn {
  currentCursor: string | undefined;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setNextCursor: (cursor: string | null | undefined) => void;
  resetPagination: () => void;
  setItemsPerPage: (items: number) => void;
}

function parsePage(value: string | null): number {
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function parseLimit(value: string | null, fallback: number): number {
  const limit = Number.parseInt(value ?? String(fallback), 10);
  return Number.isFinite(limit) && limit > 0 ? limit : fallback;
}

/**
 * Cursor-based pagination with optional URL query sync.
 *
 * URL params when syncToUrl is enabled:
 * - `page` — current page (omitted when 1)
 * - `cursor` — API cursor for the current page (omitted on page 1)
 * - `limit` — items per page (omitted when equal to initialItemsPerPage)
 */
export function useCursorPagination(
  options: UseCursorPaginationOptions = {},
): UseCursorPaginationReturn {
  const {
    initialItemsPerPage = 20,
    scrollOnPageChange = true,
    syncToUrl = true,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlPage = syncToUrl
    ? parsePage(searchParams.get(PAGINATION_PAGE_PARAM))
    : 1;
  const urlCursor = syncToUrl
    ? (searchParams.get(PAGINATION_CURSOR_PARAM) ?? undefined)
    : undefined;
  const urlLimit = syncToUrl
    ? parseLimit(searchParams.get(PAGINATION_LIMIT_PARAM), initialItemsPerPage)
    : initialItemsPerPage;

  const [localCursor, setLocalCursor] = useState<string | undefined>(undefined);
  const [localPage, setLocalPage] = useState(1);
  const [localLimit, setLocalLimit] = useState(initialItemsPerPage);
  const [cursorHistory, setCursorHistory] = useState<(string | undefined)[]>([
    undefined,
  ]);
  const [nextCursor, setNextCursorState] = useState<string | null | undefined>(
    undefined,
  );

  const currentPage = syncToUrl ? urlPage : localPage;
  const currentCursor = syncToUrl ? urlCursor : localCursor;
  const itemsPerPage = syncToUrl ? urlLimit : localLimit;

  const hasNextPage = !!nextCursor;
  const hasPreviousPage = currentPage > 1;

  const scrollToTop = useCallback(() => {
    if (scrollOnPageChange) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scrollOnPageChange]);

  const buildParams = useCallback(
    (overrides: { page?: number; cursor?: string | null; limit?: number }) => {
      const params = new URLSearchParams(searchParams.toString());
      const page = overrides.page ?? currentPage;
      const cursor =
        overrides.cursor !== undefined ? overrides.cursor : currentCursor;
      const limit = overrides.limit ?? itemsPerPage;

      if (page <= 1) {
        params.delete(PAGINATION_PAGE_PARAM);
      } else {
        params.set(PAGINATION_PAGE_PARAM, String(page));
      }

      if (!cursor) {
        params.delete(PAGINATION_CURSOR_PARAM);
      } else {
        params.set(PAGINATION_CURSOR_PARAM, cursor);
      }

      if (limit === initialItemsPerPage) {
        params.delete(PAGINATION_LIMIT_PARAM);
      } else {
        params.set(PAGINATION_LIMIT_PARAM, String(limit));
      }

      return params;
    },
    [
      searchParams,
      currentPage,
      currentCursor,
      itemsPerPage,
      initialItemsPerPage,
    ],
  );

  const applyParams = useCallback(
    (params: URLSearchParams, method: "push" | "replace") => {
      const qs = params.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      if (method === "push") {
        router.push(href, { scroll: false });
      } else {
        router.replace(href, { scroll: false });
      }
    },
    [router, pathname],
  );

  // Reset in-memory history when URL returns to page 1
  useEffect(() => {
    if (syncToUrl && currentPage === 1 && !currentCursor) {
      setCursorHistory([undefined]);
    }
  }, [syncToUrl, currentPage, currentCursor]);

  const handleNextPage = useCallback(() => {
    if (!hasNextPage || !nextCursor) return;

    if (syncToUrl) {
      setCursorHistory((prev) => [...prev, currentCursor]);
      const params = buildParams({
        page: currentPage + 1,
        cursor: nextCursor,
      });
      applyParams(params, "push");
    } else {
      setCursorHistory((prev) => [...prev, localCursor]);
      setLocalCursor(nextCursor);
      setLocalPage((prev) => prev + 1);
    }
    scrollToTop();
  }, [
    hasNextPage,
    nextCursor,
    syncToUrl,
    currentCursor,
    currentPage,
    localCursor,
    buildParams,
    applyParams,
    scrollToTop,
  ]);

  const handlePreviousPage = useCallback(() => {
    if (!hasPreviousPage) return;

    if (syncToUrl && cursorHistory.length > 1) {
      const newHistory = [...cursorHistory];
      newHistory.pop();
      const previousCursor = newHistory[newHistory.length - 1];
      setCursorHistory(newHistory);

      const nextPage = currentPage - 1;
      const params = buildParams({
        page: nextPage,
        cursor: previousCursor ?? null,
      });
      applyParams(params, "replace");
      scrollToTop();
      return;
    }

    if (syncToUrl) {
      router.back();
      scrollToTop();
      return;
    }

    if (cursorHistory.length > 1) {
      const newHistory = [...cursorHistory];
      newHistory.pop();
      const previousCursor = newHistory[newHistory.length - 1];
      setCursorHistory(newHistory);
      setLocalCursor(previousCursor);
      setLocalPage((prev) => prev - 1);
      scrollToTop();
    }
  }, [
    hasPreviousPage,
    syncToUrl,
    cursorHistory,
    currentPage,
    buildParams,
    applyParams,
    router,
    scrollToTop,
  ]);

  const setNextCursor = useCallback((cursor: string | null | undefined) => {
    setNextCursorState(cursor);
  }, []);

  const resetPagination = useCallback(() => {
    setCursorHistory([undefined]);
    setNextCursorState(undefined);

    if (syncToUrl) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(PAGINATION_PAGE_PARAM);
      params.delete(PAGINATION_CURSOR_PARAM);
      applyParams(params, "replace");
    } else {
      setLocalCursor(undefined);
      setLocalPage(1);
    }
    scrollToTop();
  }, [syncToUrl, searchParams, applyParams, scrollToTop]);

  const setItemsPerPage = useCallback(
    (items: number) => {
      setCursorHistory([undefined]);
      setNextCursorState(undefined);

      if (syncToUrl) {
        const params = buildParams({
          page: 1,
          cursor: null,
          limit: items,
        });
        params.delete(PAGINATION_PAGE_PARAM);
        params.delete(PAGINATION_CURSOR_PARAM);
        applyParams(params, "replace");
      } else {
        setLocalLimit(items);
        setLocalCursor(undefined);
        setLocalPage(1);
      }
    },
    [syncToUrl, buildParams, applyParams],
  );

  return {
    currentCursor,
    currentPage,
    itemsPerPage,
    hasNextPage,
    hasPreviousPage,
    handleNextPage,
    handlePreviousPage,
    setNextCursor,
    resetPagination,
    setItemsPerPage,
  };
}
