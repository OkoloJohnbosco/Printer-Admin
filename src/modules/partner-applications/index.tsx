"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
import { Input } from "@/components/ui/input";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useDebounce from "@/lib/hooks/common/use-debounce";
import useGetAllPartnerApplications from "@/lib/hooks/admin/use-get-all-partner-applications";
import { exportToCSV, formatStatusText } from "@/lib/utils";
import { Download, Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import PartnerApplicationTable from "./components/partner-application-table";

export default function PartnerApplicationsPageTemplate() {
  const pagination = useCursorPagination({
    initialItemsPerPage: 12,
    scrollOnPageChange: true,
  });

  const [searchTerm, setSearchTerm] = useState("");
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

  const applications = getAllPartnerApplications.value?.data?.data || [];

  const handleExportCSV = () => {
    const exportData = applications.map((application) => ({
      "Application ID": application.id,
      "Company Name": application.companyName,
      Email: application.email,
      Status: formatStatusText(application.status),
      "Applied Date": new Date(application.createdAt).toLocaleDateString(),
    }));

    exportToCSV(exportData, "partner-applications-export");
  };

  return (
    <div className="page-fade-in w-full space-y-6">
      <main>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Partner Applications</h1>
            <p className="text-muted-foreground">
              View and manage partner applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCSV}>
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
