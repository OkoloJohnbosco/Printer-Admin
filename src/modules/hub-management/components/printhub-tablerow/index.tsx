import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { PrintHub } from "@/lib/hooks/admin/use-get-all-hubs";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Received: "bg-muted text-muted-foreground",
  "In Progress": "bg-primary/10 text-primary",
  Shipped: "bg-chart-2/10 text-chart-2",
  Delivered: "bg-chart-4/10 text-chart-4",
  Completed: "bg-primary/20 text-primary",
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
      <TableCell className="px-5">12</TableCell>
      <TableCell className="px-5">12</TableCell>
      <TableCell className="px-5">12</TableCell>
      <TableCell className="px-5">{printHub.businessEmail}</TableCell>
      <TableCell className="px-5">
        <Badge variant="secondary" className={statusColors[printHub.status]}>
          {printHub.status}
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
                href={`/print-hubs/${printHub.userId}`}
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
