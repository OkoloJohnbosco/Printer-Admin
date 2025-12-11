import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader from "@/components/ui/table-row-skeleton";
import useGetAllOrders from "@/lib/hooks/orders/use-get-all-orders";
import { Package } from "lucide-react";
import OrderTableRow from "../order-tablerow";

function OrderTable({
  getAllOrders,
}: {
  getAllOrders: ReturnType<typeof useGetAllOrders>;
}) {
  const orders = getAllOrders?.value?.data?.orders || [];
  const isLoading = getAllOrders.isLoading && !getAllOrders?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={8} noOfRows={8} />;

    if (orders?.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <td colSpan={8}>
              <EmptyState
                icon={Package}
                title="No Orders Found"
                description="There are currently no orders matching your filters. Try adjusting your search criteria."
                className="border-0"
              />
            </td>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody className="page-fade-in">
        {orders?.map((order) => (
          <OrderTableRow key={order.id} order={order} />
        ))}
      </TableBody>
    );
  };

  return (
    <div className="border-border rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-6">Amount</TableHead>
            <TableHead className="px-6">Date</TableHead>
            <TableHead className="px-6">Customer</TableHead>
            <TableHead className="px-6">Item Count</TableHead>
            <TableHead className="px-6">Hub</TableHead>
            <TableHead className="px-6">Status</TableHead>
            <TableHead className="px-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <>{renderTableBody()}</>
      </Table>
    </div>
  );
}

export default OrderTable;
