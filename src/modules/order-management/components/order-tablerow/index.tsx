import { Badge } from "@/components/ui/badge";
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
  ListTodo,
  Loader,
  PackageCheck,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleClick = () => router.push(`/orders/${order.id}`);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <TableRow
      key={order.id}
      className="hover:bg-muted/50 cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <TableCell className="px-6 py-4 font-mono text-sm">
        {formatCurrency(Number(order.total))}
      </TableCell>
      <TableCell className="text-muted-foreground px-6 py-4">
        {formatToFullYMD(order.createdAt)}
      </TableCell>
      <TableCell className="px-6 py-4">{order.customerName}</TableCell>
      <TableCell className="px-6 py-4">{order.itemCount}</TableCell>
      <TableCell className="px-6 py-4">{order.hubName}</TableCell>
      <TableCell className="px-6 py-4">
        <Badge
          variant={getOrderStatusBadgeVariant(order.status as OrderStatus)}
        >
          {orderStatusIcons[getOrderStatusIconKey(order.status as OrderStatus)]}
          {formatStatusText(order.status)}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;
