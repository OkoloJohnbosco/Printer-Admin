"use client";

import useDisclosure from "@/hooks/use-disclosure";
import NoRevenueCard from "./components/no-revenue-card";
import RevenueHeader from "./components/revenue-header";
import RequestPayoutTemplate from "./templates/request-payout-template";
import RevenueStatsCardRow from "./templates/revenue-stats-card-row";

export default function RevenueAndPayoutsPageTemplate() {
  const { onOpen } = useDisclosure();
  return (
    <div className="space-y-5 page-fade-in">
      <RevenueHeader onRequestPayoutModalOpen={onOpen} />
      <RevenueStatsCardRow />
      <NoRevenueCard />
      <RequestPayoutTemplate />
    </div>
  );
}
