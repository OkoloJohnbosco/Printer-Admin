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

function getPayoutTypeLabel(type: string) {
  return type === PayoutType.INITIAL ? "Initial Payout" : "Final Payout";
}

export function TransactionMobileCard({ payout }: { payout: Payout }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${routes.REVENUE_AND_PAYOUT}/${payout.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:bg-muted/50 w-full space-y-3 border-b p-4 text-left transition-colors last:border-b-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium wrap-break-word">
            {payout.hub.businessName}
          </p>
          <p className="text-brand-gray-200 mt-1 text-xs">
            {formatToFullYMD(payout.createdAt)} - {formatTime(payout.createdAt)}
          </p>
        </div>
        <Badge
          variant={getPayoutStatusBadgeVariant(payout.status as PayoutStatus)}
          className="shrink-0"
        >
          {
            payoutStatusIcons[
              getPayoutStatusIconKey(payout.status as PayoutStatus)
            ]
          }
          {formatStatusText(payout.status)}
        </Badge>
      </div>
      <div className="text-muted-foreground flex items-center justify-between gap-3 text-sm">
        <span>{getPayoutTypeLabel(payout.type)}</span>
        <span className="text-foreground font-semibold">
          {formatCurrency(Number(payout.amount))}
        </span>
      </div>
    </button>
  );
}

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
      <TableCell className="px-4 lg:px-7">
        <p className="text-brand-gray-200 text-xs md:text-sm">
          {formatToFullYMD(payout.createdAt)} - {formatTime(payout.createdAt)}
        </p>
      </TableCell>
      <TableCell className="max-w-[180px] px-4 md:max-w-none lg:px-7">
        <p className="truncate font-medium md:overflow-visible md:wrap-break-word md:whitespace-normal">
          {payout.hub.businessName}
        </p>
      </TableCell>
      <TableCell className="px-4 lg:px-7">
        {getPayoutTypeLabel(payout.type)}
      </TableCell>
      <TableCell className="px-4 lg:px-7">
        <p className="foundation-black-400 text-sm font-medium">
          {formatCurrency(Number(payout.amount))}
        </p>
      </TableCell>

      <TableCell className="px-4 lg:px-7">
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
