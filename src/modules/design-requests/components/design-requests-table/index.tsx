"use client";
import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader from "@/components/ui/table-row-skeleton";
import useGetAllDesignerRequests from "@/lib/hooks/design-requests/use-get-all-designer-requests";
import { PenTool } from "lucide-react";
import DesignRequestsTableRow from "../design-requests-tablerow";

function DesignRequestsTable({
  getAllDesignerRequests,
}: {
  getAllDesignerRequests: ReturnType<typeof useGetAllDesignerRequests>;
}) {
  const designerRequests =
    getAllDesignerRequests?.value?.data?.designerRequests || [];
  const isLoading =
    getAllDesignerRequests.isLoading && !getAllDesignerRequests?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={7} noOfRows={8} />;

    if (designerRequests?.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <td colSpan={7}>
              <EmptyState
                icon={PenTool}
                title="No Design Requests Found"
                description="There are currently no design requests matching your filters. Try adjusting your search criteria."
                className="border-0"
              />
            </td>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody className="page-fade-in">
        {designerRequests?.map((request) => (
          <DesignRequestsTableRow key={request.id} request={request} />
        ))}
      </TableBody>
    );
  };

  return (
    <div className="border-border rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-6">Request ID</TableHead>
            <TableHead className="px-6">Customer</TableHead>
            <TableHead className="px-6">Type</TableHead>
            <TableHead className="px-6">Description</TableHead>
            <TableHead className="px-6">Price</TableHead>
            <TableHead className="px-6">Status</TableHead>
            <TableHead className="px-6">Date</TableHead>
          </TableRow>
        </TableHeader>
        <>{renderTableBody()}</>
      </Table>
    </div>
  );
}

export default DesignRequestsTable;
