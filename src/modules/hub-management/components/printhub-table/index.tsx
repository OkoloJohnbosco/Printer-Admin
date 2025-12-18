import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader from "@/components/ui/table-row-skeleton";
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import { Printer } from "lucide-react";
import PrintHubTableRow from "../printhub-tablerow";

function PrintHubTable({
  getAllHubs,
}: {
  getAllHubs: ReturnType<typeof useGetAllHubs>;
}) {
  const isLoading = getAllHubs.isLoading && !getAllHubs?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={5} noOfRows={12} />;

    if (getAllHubs?.value?.data?.hubs?.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <td colSpan={5}>
              <EmptyState
                icon={Printer}
                title="No Print Hubs Found"
                description="There are currently no print hubs matching your filters. Try adjusting your search criteria."
                className="border-0"
              />
            </td>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody className="page-fade-in">
        {getAllHubs?.value?.data?.hubs?.map((printHub) => (
          <PrintHubTableRow key={printHub.userId} printHub={printHub} />
        ))}
      </TableBody>
    );
  };

  return (
    <div className="page-fade-in rounded-md pt-6">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-5">Name</TableHead>
            <TableHead className="px-5">Address</TableHead>
            <TableHead className="px-5">Email</TableHead>
            <TableHead className="px-5">Status</TableHead>
            <TableHead className="px-5"></TableHead>
          </TableRow>
        </TableHeader>
        <>{renderTableBody()}</>
      </Table>
    </div>
  );
}

export default PrintHubTable;
