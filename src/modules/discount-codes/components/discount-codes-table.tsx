"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader, {
  EmptyTable,
} from "@/components/ui/table-row-skeleton";
import useGetAllDiscountCodes from "@/lib/hooks/admin/discount-codes/use-get-all-discount-codes";
import { useState } from "react";
import DiscountCodeTableRow from "./discount-code-tablerow";

export default function DiscountCodesTable() {
  const [statusFilter, setStatusFilter] = useState<
    "ACTIVE" | "INACTIVE" | undefined
  >(undefined);

  const getDiscountCodes = useGetAllDiscountCodes(statusFilter);
  const isLoading = getDiscountCodes.isLoading && !getDiscountCodes?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={9} noOfRows={10} />;

    if (getDiscountCodes?.value?.data?.length === 0)
      return <EmptyTable length={9} message="No discount codes found" />;

    return (
      <TableBody className="page-fade-in">
        {getDiscountCodes?.value?.data?.map((code) => (
          <DiscountCodeTableRow key={code.id} discountCode={code} />
        ))}
      </TableBody>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-[200px]">
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) =>
              setStatusFilter(
                value === "all" ? undefined : (value as "ACTIVE" | "INACTIVE"),
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6">Code</TableHead>
            <TableHead className="px-6">Type</TableHead>
            <TableHead className="px-6">Value</TableHead>
            <TableHead className="px-6">Min. Subtotal</TableHead>
            <TableHead className="px-6">Max Discount</TableHead>
            <TableHead className="px-6">Expires</TableHead>
            <TableHead className="px-6">Usage</TableHead>
            <TableHead className="px-6">Status</TableHead>
            <TableHead className="w-[100px] px-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <>{renderTableBody()}</>
      </Table>
    </div>
  );
}
