"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  PartnerApplication,
  PartnerApplicationStatus,
} from "@/lib/hooks/admin/use-get-all-partner-applications/use-get-all-partner-applications.types";
import { formatStatusText } from "@/lib/utils";
import { Eye } from "lucide-react";

interface PartnerApplicationTableRowProps {
  application: PartnerApplication;
}

const getStatusBadgeVariant = (status: PartnerApplicationStatus) => {
  const variantMap: Record<
    PartnerApplicationStatus,
    "warning" | "success" | "destructive"
  > = {
    [PartnerApplicationStatus.PENDING]: "warning",
    [PartnerApplicationStatus.APPROVED]: "success",
    [PartnerApplicationStatus.REJECTED]: "destructive",
  };
  return variantMap[status] || "warning";
};

export default function PartnerApplicationTableRow({
  application,
}: PartnerApplicationTableRowProps) {
  return (
    <TableRow key={application.id}>
      <TableCell>
        <div className="font-medium">{application.companyName}</div>
      </TableCell>
      <TableCell>{application.email}</TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(application.status)}>
          {formatStatusText(application.status)}
        </Badge>
      </TableCell>
      <TableCell>
        {new Date(application.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
