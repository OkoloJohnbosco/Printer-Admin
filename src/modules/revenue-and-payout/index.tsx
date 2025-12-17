"use client";

import useDisclosure from "@/lib/hooks/common/use-disclosure";
import RequestPayoutFormModal from "./components/request-payout-form-modal";
import RevenueHeader from "./components/revenue-header";
import RecentTransactions from "./templates/recent-transaction";
import RevenueStatsCardRow from "./templates/revenue-stats-card-row";

export default function RevenueAndPayoutsPageTemplate() {
  const [
    isRequestPayoutModalOpen,
    onRequestPayoutModalOpen,
    onRequestPayoutModalClose,
  ] = useDisclosure();

  return (
    <div className="page-fade-in space-y-5">
      <RevenueHeader onRequestPayoutModalOpen={onRequestPayoutModalOpen} />
      <RevenueStatsCardRow />
      <RecentTransactions />
      <RequestPayoutFormModal
        isOpen={isRequestPayoutModalOpen}
        onClose={onRequestPayoutModalClose}
      />
    </div>
  );
}
