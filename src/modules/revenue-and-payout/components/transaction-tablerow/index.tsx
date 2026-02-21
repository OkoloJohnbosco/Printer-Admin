"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
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
import routes from "@/routes";
import { AlertCircle, Check, Clock, X } from "lucide-react";
import { useRouter } from "next/navigation";

const payoutStatusIcons = {
  pending: <Clock className="size-3" />,
  approved: <Check className="size-3" />,
  rejected: <X className="size-3" />,
  processed: <Check className="size-3" />,
  failed: <AlertCircle className="size-3" />,
};

export default function TransactionTableRow({ payout }: { payout: Payout }) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`${routes.REVENUE_AND_PAYOUT}/${payout.id}`);
  };

  return (
    <TableRow
      key={payout.id}
      className="hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
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
    </TableRow>
  );
}
