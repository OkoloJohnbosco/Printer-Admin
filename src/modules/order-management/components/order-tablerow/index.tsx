import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import { formatCurrency, formatToFullYMD } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Received: "bg-muted text-muted-foreground",
  "In Progress": "bg-primary/10 text-primary",
  Shipped: "bg-chart-2/10 text-chart-2",
  Delivered: "bg-chart-4/10 text-chart-4",
  Completed: "bg-primary/20 text-primary",
};

function OrderTableRow({ order }: { order: Order }) {
  return (
    <TableRow key={order.id}>
      <TableCell className="px-6 font-mono text-sm">
        {formatCurrency(Number(order.total))}
      </TableCell>
      <TableCell className="text-muted-foreground px-6">
        {formatToFullYMD(order.createdAt)}
      </TableCell>
      <TableCell className="px-6">{order.customerName}</TableCell>
      <TableCell className="px-6">{order.itemCount}</TableCell>
      <TableCell className="px-6">{order.hubName}</TableCell>
      <TableCell className="px-6">
        <Badge variant="secondary" className={statusColors[order.status]}>
          {order.status}
        </Badge>
      </TableCell>
      <TableCell className="px-6 text-right">
        <Link href={`/orders/${order.id}`}>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;
