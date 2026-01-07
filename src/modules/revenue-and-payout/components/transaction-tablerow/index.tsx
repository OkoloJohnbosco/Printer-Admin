"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import {
  Payout,
  PayoutStatus,
  PayoutType,
} from "@/lib/hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import {
  formatCurrency,
  formatStatusText,
  formatTime,
  formatToFullYMD,
  getPayoutStatusBadgeVariant,
  getPayoutStatusIconKey,
} from "@/lib/utils";
import { AlertCircle, Check, Clock, X } from "lucide-react";
import ReviewPayoutFormModal from "../review-payout-form-modal";

const payoutStatusIcons = {
  pending: <Clock className="size-3" />,
  approved: <Check className="size-3" />,
  rejected: <X className="size-3" />,
  processed: <Check className="size-3" />,
  failed: <AlertCircle className="size-3" />,
};

export default function TransactionTableRow({ payout }: { payout: Payout }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isPayoutApproved = payout.status === PayoutStatus.APPROVED;

  return (
    <TableRow key={payout.id} className="cursor-pointer">
      <TableCell className="px-7">
        <p className="text-brand-gray-200">
          {formatToFullYMD(payout.createdAt)} - {formatTime(payout.createdAt)}
        </p>
      </TableCell>
      <TableCell className="px-7 font-medium">
        {payout.hub.businessName}
      </TableCell>
      <TableCell className="px-7 py-4">
        {payout.type === PayoutType.INITIAL ? "Initial Payout" : "Final Payout"}
      </TableCell>
      <TableCell className="px-7">
        <p className="foundation-black-400 text-sm font-medium">
          {formatCurrency(Number(payout.amount))}
        </p>
      </TableCell>

      <TableCell className="px-7">
        <Badge
          variant={getPayoutStatusBadgeVariant(payout.status as PayoutStatus)}
        >
          {
            payoutStatusIcons[
              getPayoutStatusIconKey(payout.status as PayoutStatus)
            ]
          }
          {formatStatusText(payout.status)}
        </Badge>
      </TableCell>

      <TableCell className="space-x-2 px-7 text-center">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-foundation-black-400"
            onClick={onOpen}
            disabled={isPayoutApproved}
          >
            Review Payout
          </Button>
        </div>
      </TableCell>
      <ReviewPayoutFormModal
        isOpen={isOpen}
        onClose={onClose}
        payout={payout}
      />
    </TableRow>
  );
}
