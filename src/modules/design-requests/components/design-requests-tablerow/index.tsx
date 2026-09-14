import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { DesignerRequest } from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import {
  formatCurrency,
  formatStatusText,
  formatToFullYMD,
  getDesignerRequestStatusBadgeVariant,
  getDesignerRequestStatusIconKey,
} from "@/lib/utils";
import { Check, Clock, Hourglass, Play, X } from "lucide-react";
import { useRouter } from "next/navigation";

const designerRequestStatusIcons = {
  pending: <Clock className="size-3" />,
  expired: <Hourglass className="size-3" />,
  rejected: <X className="size-3" />,
  accepted: <Check className="size-3" />,
  completed: <Check className="size-3" />,
  in_progress: <Play className="size-3" />,
};

export function DesignRequestMobileCard({
  request,
}: {
  request: DesignerRequest;
}) {
  const router = useRouter();
  const customerName = `${request.user.firstName} ${request.user.lastName}`;

  return (
    <button
      type="button"
      onClick={() => router.push(`/design-requests/${request.id}`)}
      className="hover:bg-muted/50 w-full space-y-3 border-b p-4 text-left transition-colors last:border-b-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{customerName}</p>
          <p className="text-muted-foreground mt-1 truncate text-xs">
            {request.user.email}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {formatToFullYMD(request.createdAt)}
          </p>
        </div>
        <Badge
          variant={getDesignerRequestStatusBadgeVariant(request.status)}
          className="shrink-0"
        >
          {
            designerRequestStatusIcons[
              getDesignerRequestStatusIconKey(request.status)
            ]
          }
          {formatStatusText(request.status)}
        </Badge>
      </div>
      <p className="text-muted-foreground line-clamp-2 text-sm">
        {request.description}
      </p>
      <div className="text-muted-foreground flex items-center justify-between gap-3 text-sm">
        <span className="capitalize">{request.type}</span>
        <span className="text-foreground font-semibold">
          {formatCurrency(Number(request.price))}
        </span>
      </div>
      <p className="text-muted-foreground font-mono text-xs">
        {request.id.slice(0, 8)}...
      </p>
    </button>
  );
}

function DesignRequestsTableRow({ request }: { request: DesignerRequest }) {
  const router = useRouter();
  const customerName = `${request.user.firstName} ${request.user.lastName}`;

  const handleClick = () => router.push(`/design-requests/${request.id}`);
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
      <TableCell className="px-6 font-mono text-sm">
        {request.id.slice(0, 8)}...
      </TableCell>
      <TableCell className="px-6">
        <div>
          <div className="font-medium">{customerName}</div>
          <div className="text-muted-foreground text-sm">
            {request.user.email}
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 capitalize">{request.type}</TableCell>
      <TableCell className="px-6">
        <div className="max-w-[200px] truncate" title={request.description}>
          {request.description}
        </div>
      </TableCell>
      <TableCell className="px-6 font-mono text-sm">
        {formatCurrency(Number(request.price))}
      </TableCell>
      <TableCell className="px-6">
        <Badge variant={getDesignerRequestStatusBadgeVariant(request.status)}>
          {
            designerRequestStatusIcons[
              getDesignerRequestStatusIconKey(request.status)
            ]
          }
          {formatStatusText(request.status)}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground px-6">
        {formatToFullYMD(request.createdAt)}
      </TableCell>
    </TableRow>
  );
}

export default DesignRequestsTableRow;
