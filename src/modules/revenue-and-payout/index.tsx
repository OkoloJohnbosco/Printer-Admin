"use client";

import useDisclosure from "@/lib/hooks/common/use-disclosure";
import RevenueHeader from "./components/revenue-header";
import ReviewPayoutFormModal from "./components/review-payout-form-modal";
import RecentTransactions from "./templates/recent-transaction";
import RevenueStatsCardRow from "./templates/revenue-stats-card-row";

export default function RevenueAndPayoutsPageTemplate() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="page-fade-in space-y-5">
      <RevenueHeader onRequestPayoutModalOpen={onOpen} />
      <RevenueStatsCardRow />
      <RecentTransactions />
      <ReviewPayoutFormModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
