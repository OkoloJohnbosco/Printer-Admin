import EmptyState from "@/components/ui/empty-state";
import { MobileListSkeleton } from "@/components/ui/mobile-list-skeleton";
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
import PrintHubTableRow, { PrintHubMobileCard } from "../printhub-tablerow";

function PrintHubTable({
  getAllHubs,
}: {
  getAllHubs: ReturnType<typeof useGetAllHubs>;
}) {
  const hubs = getAllHubs?.value?.data?.hubs || [];
  const isLoading = getAllHubs.isLoading && !getAllHubs?.value;

  const tableHeader = (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="px-5">Name</TableHead>
        <TableHead className="px-5">Address</TableHead>
        <TableHead className="px-5">Date Created</TableHead>
        <TableHead className="px-5">Email</TableHead>
        <TableHead className="px-5">Status</TableHead>
      </TableRow>
    </TableHeader>
  );

  if (isLoading) {
    return (
      <div className="page-fade-in rounded-md pt-6">
        <MobileListSkeleton rows={8} />
        <div className="hidden md:block">
          <Table>
            {tableHeader}
            <TableSkeletonRowLoader length={5} noOfRows={12} />
          </Table>
        </div>
      </div>
    );
  }

  if (hubs.length === 0) {
    return (
      <div className="page-fade-in rounded-md py-10 pt-6">
        <EmptyState
          icon={Printer}
          title="No Print Hubs Found"
          description="There are currently no print hubs matching your filters. Try adjusting your search criteria."
          className="border-0"
        />
      </div>
    );
  }

  return (
    <div className="page-fade-in rounded-md pt-6">
      <div className="divide-y md:hidden">
        {hubs.map((printHub) => (
          <PrintHubMobileCard key={printHub.id} printHub={printHub} />
        ))}
      </div>

      <div className="hidden md:block">
        <Table>
          {tableHeader}
          <TableBody className="page-fade-in">
            {hubs.map((printHub) => (
              <PrintHubTableRow key={printHub.id} printHub={printHub} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PrintHubTable;
