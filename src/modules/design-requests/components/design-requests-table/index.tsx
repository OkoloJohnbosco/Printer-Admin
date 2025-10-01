"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";

// Mock data
const designRequests = [
  {
    id: "DR-001",
    customer: "Alice Cooper",
    email: "alice@email.com",
    productType: "Business Logo",
    brief: "Modern tech startup logo with clean design",
    timeline: "5 days",
    status: "requested",
    designer: null,
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: "DR-002",
    customer: "Bob Smith",
    email: "bob@email.com",
    productType: "T-Shirt Design",
    brief: "Vintage band merchandise design for rock concert",
    timeline: "3 days",
    status: "assigned",
    designer: "Jane Designer",
    date: "2024-01-14",
    priority: "medium",
  },
  {
    id: "DR-003",
    customer: "Carol Johnson",
    email: "carol@email.com",
    productType: "Poster Design",
    brief: "Event poster for music festival with retro theme",
    timeline: "7 days",
    status: "completed",
    designer: "John Creative",
    date: "2024-01-13",
    priority: "low",
  },
];

const statusConfig = {
  requested: {
    label: "Requested",
    color: "bg-yellow-600",
    icon: AlertCircle,
  },
  assigned: { label: "Assigned", color: "bg-blue-600", icon: User },
  "in-progress": { label: "In Progress", color: "bg-info", icon: Clock },
  completed: {
    label: "Completed",
    color: "bg-green-600",
    icon: CheckCircle,
  },
  approved: { label: "Approved", color: "bg-success", icon: CheckCircle },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-muted-foreground" },
  medium: { label: "Medium", color: "bg-yellow-500" },
  high: { label: "High", color: "bg-destructive" },
};

export default function DesignRequestsTable() {
  return (
    <Table className="@container/table">
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Product Type</TableHead>
          <TableHead>Brief</TableHead>
          <TableHead>Timeline</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Designer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {designRequests.map((request) => (
          <TableRow key={request.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{request.id}</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{request.customer}</div>
                <div className="text-muted-foreground text-sm">
                  {request.email}
                </div>
              </div>
            </TableCell>
            <TableCell>{request.productType}</TableCell>
            <TableCell>
              <div className="max-w-[200px] truncate" title={request.brief}>
                {request.brief}
              </div>
            </TableCell>
            <TableCell>{request.timeline}</TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "text-white",
                  priorityConfig[
                    request.priority as keyof typeof priorityConfig
                  ].color,
                )}
              >
                {
                  priorityConfig[
                    request.priority as keyof typeof priorityConfig
                  ].label
                }
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Badge
                  className={cn(
                    "text-white",
                    statusConfig[request.status as keyof typeof statusConfig]
                      .color,
                  )}
                >
                  {(() => {
                    const StatusIcon =
                      statusConfig[request.status as keyof typeof statusConfig]
                        .icon;
                    return StatusIcon ? (
                      <StatusIcon className="h-4 w-4" />
                    ) : null;
                  })()}
                  {
                    statusConfig[request.status as keyof typeof statusConfig]
                      .label
                  }
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              {request.designer ? (
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  {request.designer}
                </div>
              ) : (
                <span className="text-muted-foreground">Unassigned</span>
              )}
            </TableCell>
            <TableCell>{request.date}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
}
