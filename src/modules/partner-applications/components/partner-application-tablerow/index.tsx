"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { PartnerApplication } from "@/lib/hooks/admin/use-get-all-partner-applications/use-get-all-partner-applications.types";

interface PartnerApplicationTableRowProps {
  application: PartnerApplication;
}

export default function PartnerApplicationTableRow({
  application,
}: PartnerApplicationTableRowProps) {
  return (
    <TableRow key={application.id}>
      <TableCell className="px-6 py-3">
        <div className="font-medium">{application.companyName}</div>
      </TableCell>
      <TableCell className="px-6 py-3">{application.email}</TableCell>
      <TableCell className="px-6 py-3">{application.businessType}</TableCell>
      <TableCell className="px-6 py-3">
        {new Date(application.createdAt).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}
