"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { TableCell, TableRow } from "@/components/ui/table";
import { Check, File } from "lucide-react";
import { invoices } from "../transaction-table";

export default function TransactionTableRow({
  invoice,
}: {
  invoice: (typeof invoices)[0];
}) {
  return (
    <TableRow key={invoice.invoice} className="cursor-pointer">
      <TableCell className="px-7">
        <p className="text-brand-gray-200">May 28, 2025 - 09:45 AM</p>
      </TableCell>
      <TableCell className="px-7 font-medium">#{invoice.jobId}</TableCell>
      <TableCell className="px-7 py-4">
        <div className="flex items-center gap-2">
          <div className="text-brand-purple-400 bg-brand-purple-100 flex h-9 w-9 items-center justify-center rounded-full">
            <File className="size-4" />
          </div>
          <div>
            <Heading className="foundation-black-400 font-[600]" size="h7">
              Corporate Brochure Print
            </Heading>
            <p className="text-foundation-black-400 flex items-center gap-1 text-xs">
              <span className="text-brand-gray-200">Order #ORD-47829</span>
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-7">
        <p className="foundation-black-400 text-sm font-medium">+₦40,025.00</p>
      </TableCell>

      <TableCell className="px-7">
        <Badge variant="success">
          <Check className="size-3" />
          Successful
        </Badge>
      </TableCell>

      <TableCell className="space-x-2 px-7 text-center">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-foundation-black-400"
          >
            View Details
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
