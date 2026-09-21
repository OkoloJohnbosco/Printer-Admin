"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { QUERYKEYS } from "@/lib/endpoints";
import { DiscountCode } from "@/lib/hooks/admin/discount-codes/use-get-all-discount-codes";
import useUpdateDiscountCode from "@/lib/hooks/admin/discount-codes/use-update-discount-code";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import { formatCurrency } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Edit, MoreVertical, Power, PowerOff } from "lucide-react";
import React from "react";
import EditDiscountCodeModal from "./edit-discount-code-modal";

export default function DiscountCodeTableRow({
  discountCode,
}: {
  discountCode: DiscountCode;
}) {
  const {
    isOpen: isOpenEditingCode,
    onOpen: onOpenEditingCode,
    onClose: onCloseEditingCode,
  } = useDisclosure();

  const queryClient = useQueryClient();
  const updateDiscountCode = useUpdateDiscountCode(discountCode.id);

  const handleToggleStatus = () => {
    const newStatus = discountCode.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    updateDiscountCode
      .mutateAsync({ status: newStatus })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.GET_ALL_DISCOUNT_CODES],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatValue = () => {
    if (discountCode.type === "PERCENTAGE") {
      return `${discountCode.value}%`;
    }
    return formatCurrency(Number(discountCode.value));
  };

  const formatExpiry = () => {
    if (!discountCode.expiresAt) return "Never";
    const expiryDate = new Date(discountCode.expiresAt);
    const now = new Date();
    const isExpired = expiryDate < now;

    return (
      <span className={isExpired ? "text-red-600" : ""}>
        {format(expiryDate, "MMM dd, yyyy 'at' h:mm a")}
        {isExpired && " (Expired)"}
      </span>
    );
  };

  const formatUsage = () => {
    if (!discountCode.maxUses) return `${discountCode.usageCount} / ∞`;
    return `${discountCode.usageCount} / ${discountCode.maxUses}`;
  };

  return (
    <React.Fragment key={discountCode.id}>
      <TableRow className="hover:bg-muted/50">
        <TableCell className="px-6 font-medium">{discountCode.code}</TableCell>
        <TableCell className="px-6">{discountCode.type}</TableCell>
        <TableCell className="px-6">{formatValue()}</TableCell>
        <TableCell className="px-6">
          {formatCurrency(Number(discountCode.minimumSubtotal))}
        </TableCell>
        <TableCell className="px-6">
          {discountCode.maxDiscountAmount
            ? formatCurrency(Number(discountCode.maxDiscountAmount))
            : "--"}
        </TableCell>
        <TableCell className="px-6">{formatExpiry()}</TableCell>
        <TableCell className="px-6">{formatUsage()}</TableCell>
        <TableCell className="px-6">
          <Badge
            variant={discountCode.status === "ACTIVE" ? "success" : "rejected"}
          >
            {discountCode.status}
          </Badge>
        </TableCell>
        <TableCell className="px-6 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onOpenEditingCode}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {discountCode.status === "ACTIVE" ? (
                <DropdownMenuItem
                  onClick={handleToggleStatus}
                  className="text-orange-600"
                  disabled={updateDiscountCode.isPending}
                >
                  <PowerOff className="mr-2 h-4 w-4" />
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={handleToggleStatus}
                  className="text-green-600"
                  disabled={updateDiscountCode.isPending}
                >
                  <Power className="mr-2 h-4 w-4" />
                  Activate
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <EditDiscountCodeModal
        isOpen={isOpenEditingCode}
        onClose={onCloseEditingCode}
        discountCode={discountCode}
      />
    </React.Fragment>
  );
}
