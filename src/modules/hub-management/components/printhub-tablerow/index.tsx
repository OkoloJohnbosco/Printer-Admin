import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { printHubs } from "@/lib/constants";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Received: "bg-muted text-muted-foreground",
  "In Progress": "bg-primary/10 text-primary",
  Shipped: "bg-chart-2/10 text-chart-2",
  Delivered: "bg-chart-4/10 text-chart-4",
  Completed: "bg-primary/20 text-primary",
};

function PrintHubTableRow({ printHub }: { printHub: (typeof printHubs)[0] }) {
  return (
    <TableRow key={printHub.id}>
      <TableCell className="font-mono text-sm">{printHub.name}</TableCell>
      <TableCell className="text-muted-foreground">
        {printHub.address}
      </TableCell>
      <TableCell>{printHub.activeOrders}</TableCell>
      <TableCell>{printHub.completedToday}</TableCell>
      <TableCell>{printHub.avgProcessingTime}</TableCell>
      <TableCell>{printHub.capacity}</TableCell>
      <TableCell>
        <Badge variant="secondary" className={statusColors[printHub.status]}>
          {printHub.status}
        </Badge>
      </TableCell>
      <TableCell>
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
