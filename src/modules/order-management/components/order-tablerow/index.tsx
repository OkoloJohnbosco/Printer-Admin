import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Order,
  OrderStatus,
} from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import {
  formatCurrency,
  formatStatusText,
  formatToFullYMD,
  getOrderStatusBadgeVariant,
  getOrderStatusIconKey,
  type OrderStatusIconKey,
} from "@/lib/utils";
import {
  AlertCircle,
  Check,
  Clock,
  Eye,
  ListTodo,
  Loader,
  PackageCheck,
  X,
} from "lucide-react";
import Link from "next/link";

const orderStatusIcons: Record<OrderStatusIconKey, React.ReactElement> = {
  pending: <Clock className="size-3" />,
  queued: <ListTodo className="size-3" />,
  processing: <Loader className="size-3" />,
  completed: <Check className="size-3" />,
  rejected: <X className="size-3" />,
  failed: <AlertCircle className="size-3" />,
  delivered: <PackageCheck className="size-3" />,
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
        <Badge
          variant={getOrderStatusBadgeVariant(order.status as OrderStatus)}
        >
          {orderStatusIcons[getOrderStatusIconKey(order.status as OrderStatus)]}
          {formatStatusText(order.status)}
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
