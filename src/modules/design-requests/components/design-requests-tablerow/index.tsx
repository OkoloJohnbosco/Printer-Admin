import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { DesignerRequest } from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import {
  formatCurrency,
  formatStatusText,
  formatToFullYMD,
  getDesignerRequestStatusBadgeVariant,
  getDesignerRequestStatusIconKey,
} from "@/lib/utils";
import {
  Check,
  Clock,
  Eye,
  Hourglass,
  MoreHorizontal,
  Play,
  X,
} from "lucide-react";
import Link from "next/link";

const designerRequestStatusIcons = {
  pending: <Clock className="size-3" />,
  expired: <Hourglass className="size-3" />,
  rejected: <X className="size-3" />,
  accepted: <Check className="size-3" />,
  completed: <Check className="size-3" />,
  in_progress: <Play className="size-3" />,
};

function DesignRequestsTableRow({ request }: { request: DesignerRequest }) {
  const customerName = `${request.user.firstName} ${request.user.lastName}`;

  return (
    <TableRow key={request.id}>
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
      <TableCell className="px-6 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/design-requests/${request.id}`}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default DesignRequestsTableRow;
