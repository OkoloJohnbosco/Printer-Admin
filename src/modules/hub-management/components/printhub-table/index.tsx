import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader, {
  EmptyTable,
} from "@/components/ui/table-row-skeleton";
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import PrintHubTableRow from "../printhub-tablerow";

function PrintHubTable({
  getAllHubs,
}: {
  getAllHubs: ReturnType<typeof useGetAllHubs>;
}) {
  const isLoading = getAllHubs.isLoading && !getAllHubs?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={8} noOfRows={8} />;

    if (getAllHubs?.value?.data?.hubs?.length === 0)
      return <EmptyTable length={8} />;

    return (
      <TableBody className="page-fade-in">
        {getAllHubs?.value?.data?.hubs?.map((printHub) => (
          <PrintHubTableRow key={printHub.userId} printHub={printHub} />
        ))}
      </TableBody>
    );
  };

  return (
    <div className="border-border page-fade-in rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-5">Name</TableHead>
            <TableHead className="px-5">Address</TableHead>
            <TableHead className="px-5">Active Orders</TableHead>
            <TableHead className="px-5">Completed</TableHead>
            <TableHead className="px-5">Avg Time</TableHead>
            <TableHead className="px-5">Capacity</TableHead>
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
