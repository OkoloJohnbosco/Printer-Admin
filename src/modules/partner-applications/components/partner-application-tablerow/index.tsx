"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PartnerApplication } from "@/lib/hooks/admin/use-get-all-partner-applications/use-get-all-partner-applications.types";
import { Eye } from "lucide-react";

interface PartnerApplicationTableRowProps {
  application: PartnerApplication;
}

export default function PartnerApplicationTableRow({
  application,
}: PartnerApplicationTableRowProps) {
  return (
    <TableRow key={application.id}>
      <TableCell>
        <div className="font-medium">{application.companyName}</div>
      </TableCell>
      <TableCell>{application.email}</TableCell>
      <TableCell>{application.businessType}</TableCell>
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
