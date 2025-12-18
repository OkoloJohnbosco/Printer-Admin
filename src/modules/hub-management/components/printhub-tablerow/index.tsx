import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { HubStatus, PrintHub } from "@/lib/hooks/admin/use-get-all-hubs";
import {
  formatStatusText,
  getHubStatusBadgeVariant,
  getHubStatusIconKey,
} from "@/lib/utils";
import {
  AlertCircle,
  Check,
  Clock,
  Eye,
  MoreHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";

const hubStatusIcons = {
  pending: <Clock className="size-3" />,
  approved: <Check className="size-3" />,
  rejected: <X className="size-3" />,
  action_required: <AlertCircle className="size-3" />,
};

function PrintHubTableRow({ printHub }: { printHub: PrintHub }) {
  return (
    <TableRow key={printHub.userId}>
      <TableCell className="px-5 font-mono text-sm">
        {printHub.businessName}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {printHub.businessAddress}
      </TableCell>
      <TableCell className="px-5">{printHub.businessEmail}</TableCell>
      <TableCell className="px-5">
        <Badge variant={getHubStatusBadgeVariant(printHub.status as HubStatus)}>
          {hubStatusIcons[getHubStatusIconKey(printHub.status as HubStatus)]}
          {formatStatusText(printHub.status)}
        </Badge>
      </TableCell>
      <TableCell className="px-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/print-hubs/${printHub.id}`}
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

export default PrintHubTableRow;
