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

export function OrderMobileCard({ order }: { order: Order }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/orders/${order.id}`)}
      className="hover:bg-muted/50 w-full space-y-3 border-b p-4 text-left transition-colors last:border-b-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{order.customerName}</p>
          <p className="text-muted-foreground mt-1 text-xs">
            {formatToFullYMD(order.createdAt)}
          </p>
        </div>
        <Badge
          variant={getOrderStatusBadgeVariant(order.status as OrderStatus)}
          className="shrink-0"
        >
          {orderStatusIcons[getOrderStatusIconKey(order.status as OrderStatus)]}
          {formatStatusText(order.status)}
        </Badge>
      </div>
      <div className="text-muted-foreground flex items-center justify-between gap-3 text-sm">
        <span className="min-w-0 truncate">{order.hubName}</span>
        <span className="text-foreground shrink-0 font-semibold">
          {formatCurrency(Number(order.total))}
        </span>
      </div>
      <p className="text-muted-foreground text-xs">
        {order.itemCount} item{order.itemCount === 1 ? "" : "s"}
      </p>
    </button>
  );
}

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
