import PayoutDetailsTemplate from "@/modules/revenue-and-payout/payout-details";

export default async function PayoutDetailsPage({
  params,
}: {
  params: Promise<{ payoutId: string }>;
}) {
  const { payoutId } = await params;
  return <PayoutDetailsTemplate params={{ payoutId }} />;
}
