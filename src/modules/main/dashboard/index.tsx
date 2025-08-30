"use client";

import useDisclosure from "@/lib/hooks/use-disclosure";
import { ChartAreaInteractive } from "@/modules/main/dashboard/components/monthly-revenue-chart";
import VerificationBanner from "@/modules/main/dashboard/components/verification-banner";
import WelcomeHeader from "@/modules/main/dashboard/components/welcome-header";
import RecentPrintJobs from "@/modules/main/dashboard/templates/recent-print-jobs";
import StatsCardRow from "@/modules/main/dashboard/templates/stats-card-row";
import VerificationStatusCard from "@/modules/main/dashboard/templates/verification-status-card";
import BusinessInfoVerificationFormModal from "./templates/business-info-verifcation-template";

export default function DashboardPageTemplate() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="page-fade-in space-y-5">
      <WelcomeHeader isVerified={true} />
      <VerificationBanner openVerificationModal={onOpen} />
      <StatsCardRow />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartAreaInteractive />
        <VerificationStatusCard />
      </div>
      <RecentPrintJobs />
      <BusinessInfoVerificationFormModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
