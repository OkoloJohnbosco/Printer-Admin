"use client";

import useGetPayoutById from "@/lib/hooks/payouts/use-get-payout-by-id";
import { PayoutDetailsContent } from "./components/payout-details-content";
import { PayoutDetailsError } from "./components/payout-details-error";
import { PayoutDetailsSkeleton } from "./components/payout-details-skeleton";

export default function PayoutDetailsTemplate({
  params,
}: {
  params: { payoutId: string };
}) {
  const { isLoading, isError, error, refetch, value } = useGetPayoutById(
    params.payoutId,
  );
  const payout = value?.data;

  if (isLoading && !value) {
    return <PayoutDetailsSkeleton />;
  }

  if (isError || !payout) {
    return (
      <PayoutDetailsError message={error?.message} onRetry={() => refetch()} />
    );
  }

  return <PayoutDetailsContent payout={payout} />;
}
