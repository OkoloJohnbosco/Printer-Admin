"use client";

import toast from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
import { Input } from "@/components/ui/input";
import useGetAllPartnerApplications from "@/lib/hooks/admin/use-get-all-partner-applications";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useDebounce from "@/lib/hooks/common/use-debounce";
import { Download, Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import PartnerApplicationTable from "./components/partner-application-table";
import {
  downloadPartnerApplicationsCsv,
  fetchAllPartnerApplicationsForExport,
} from "./utils/export-partner-applications-csv";

export default function PartnerApplicationsPageTemplate() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 20,
    scrollOnPageChange: true,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getAllPartnerApplications = useGetAllPartnerApplications({
    limit: pagination.itemsPerPage,
    cursor: pagination.currentCursor || "",
    search: debouncedSearchTerm,
  });

  const nextCursor = getAllPartnerApplications.value?.data?.nextCursor;

  // Update the next cursor when data changes
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  const applications =
    getAllPartnerApplications.value?.data?.applications || [];

  const handleExportCSV = async () => {
    setIsExporting(true);

    try {
      const applicationsToExport = await fetchAllPartnerApplicationsForExport({
        search: debouncedSearchTerm || undefined,
      });

      if (applicationsToExport.length === 0) {
        toast.error({
          description:
            "No partner applications to export for the current filters.",
        });
        return;
      }

      downloadPartnerApplicationsCsv(applicationsToExport);
      toast.success({
        description: `Exported ${applicationsToExport.length} application${applicationsToExport.length === 1 ? "" : "s"} to CSV.`,
      });
    } catch {
      toast.error({
        description: "Failed to export partner applications. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="page-fade-in w-full space-y-6">
      <main>
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
              Partner Applications
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              View and manage partner applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="w-full sm:w-auto"
              disabled={isExporting || getAllPartnerApplications.isLoading}
              isLoading={isExporting}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Card className="@container/card border-0 shadow-none">
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search by email or company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
                {getAllPartnerApplications.isLoading && searchTerm && (
                  <Loader className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
                )}
              </div>
            </div>

            <PartnerApplicationTable
              applications={applications}
              isLoading={getAllPartnerApplications.isLoading}
            />

            <div className="mt-4">
              <CursorPaginationDetailed
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onNextPage={pagination.handleNextPage}
                onPreviousPage={pagination.handlePreviousPage}
                isLoading={getAllPartnerApplications.isLoading}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                totalItemsOnCurrentPage={applications.length}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
