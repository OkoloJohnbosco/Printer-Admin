import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { orders } from "@/lib/constants";
import { Eye } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Received: "bg-muted text-muted-foreground",
  "In Progress": "bg-primary/10 text-primary",
  Shipped: "bg-chart-2/10 text-chart-2",
  Delivered: "bg-chart-4/10 text-chart-4",
  Completed: "bg-primary/20 text-primary",
};

function OrderTableRow({ order }: { order: (typeof orders)[0] }) {
  return (
    <TableRow key={order.id}>
      <TableCell className="font-mono text-sm">{order.id}</TableCell>
      <TableCell className="text-muted-foreground">{order.date}</TableCell>
      <TableCell>{order.customer}</TableCell>
      <TableCell>{order.product}</TableCell>
      <TableCell>{order.quantity}</TableCell>
      <TableCell>
        <span
          className={order.hub === "Unassigned" ? "text-muted-foreground" : ""}
        >
          {order.hub}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className={statusColors[order.status]}>
          {order.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
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
