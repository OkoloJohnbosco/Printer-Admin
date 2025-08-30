"use client";

import useDisclosure from "@/lib/hooks/use-disclosure";
import NoRevenueCard from "./components/no-revenue-card";
import RevenueHeader from "./components/revenue-header";
import RequestPayoutTemplate from "./templates/request-payout-template";
import RevenueStatsCardRow from "./templates/revenue-stats-card-row";

export default function RevenueAndPayoutsPageTemplate() {
  const { onOpen } = useDisclosure();
  return (
    <div className="page-fade-in space-y-5">
      <RevenueHeader onRequestPayoutModalOpen={onOpen} />
      <RevenueStatsCardRow />
      <NoRevenueCard />
      <RequestPayoutTemplate />
    </div>
  );
}
