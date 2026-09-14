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
import useGetAllOrders from "@/lib/hooks/orders/use-get-all-orders";
import { Package } from "lucide-react";
import OrderTableRow, { OrderMobileCard } from "../order-tablerow";

function OrderTable({
  getAllOrders,
}: {
  getAllOrders: ReturnType<typeof useGetAllOrders>;
}) {
  const orders = getAllOrders?.value?.data?.orders || [];
  const isLoading = getAllOrders.isLoading && !getAllOrders?.value;

  const tableHeader = (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="px-6">Amount</TableHead>
        <TableHead className="px-6">Date</TableHead>
        <TableHead className="px-6">Customer</TableHead>
        <TableHead className="px-6">Item Count</TableHead>
        <TableHead className="px-6">Hub</TableHead>
        <TableHead className="px-6">Status</TableHead>
      </TableRow>
    </TableHeader>
  );

  if (isLoading) {
    return (
      <div className="border-border rounded-md border">
        <MobileListSkeleton rows={8} />
        <div className="hidden md:block">
          <Table>
            {tableHeader}
            <TableSkeletonRowLoader length={6} noOfRows={8} />
          </Table>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border-border rounded-md border py-10">
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="There are currently no orders matching your filters. Try adjusting your search criteria."
          className="border-0"
        />
      </div>
    );
  }

  return (
    <div className="border-border rounded-md border">
      <div className="divide-y md:hidden">
        {orders.map((order) => (
          <OrderMobileCard key={order.id} order={order} />
        ))}
      </div>

      <div className="hidden md:block">
        <Table>
          {tableHeader}
          <TableBody className="page-fade-in">
            {orders.map((order) => (
              <OrderTableRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default OrderTable;
