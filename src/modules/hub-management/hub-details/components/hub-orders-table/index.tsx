import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CursorPaginationDetailed } from "@/components/ui/cursor-pagination";
import { useCursorPagination } from "@/lib/hooks/common/use-cursor-pagination";
import useGetAllOrders from "@/lib/hooks/orders/use-get-all-orders";
import OrderTable from "@/modules/order-management/components/order-table";
import { useEffect } from "react";

export default function HubOrdersTable({ hubId }: { hubId: string }) {
  const pagination = useCursorPagination({
    initialItemsPerPage: 20,
    scrollOnPageChange: true,
  });

  const getAllOrders = useGetAllOrders({
    cursor: pagination.currentCursor || "",
    limit: pagination.itemsPerPage,
    hubId,
  });

  const nextCursor = getAllOrders.value?.data?.nextCursor;

  // Update the next cursor when data changes
  useEffect(() => {
    pagination.setNextCursor(nextCursor);
  }, [nextCursor, pagination]);

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Hub Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-border rounded-md border">
          <OrderTable getAllOrders={getAllOrders} />
          <div className="rounded-2xl bg-white p-4">
            <CursorPaginationDetailed
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onNextPage={pagination.handleNextPage}
              onPreviousPage={pagination.handlePreviousPage}
              isLoading={getAllOrders.isLoading}
              currentPage={pagination.currentPage}
              itemsPerPage={pagination.itemsPerPage}
              totalItemsOnCurrentPage={
                getAllOrders.value?.data?.orders?.length || 0
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
