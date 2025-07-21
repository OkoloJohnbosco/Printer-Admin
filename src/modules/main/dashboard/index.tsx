import { ChartAreaInteractive } from "@/modules/main/dashboard/components/monthly-revenue-chart";
import VerificationBanner from "@/modules/main/dashboard/components/verification-banner";
import WelcomeHeader from "@/modules/main/dashboard/components/welcome-header";
import RecentPrintJobs from "@/modules/main/dashboard/templates/recent-print-jobs";
import StatsCardRow from "@/modules/main/dashboard/templates/stats-card-row";
import VerificationStatusCard from "@/modules/main/dashboard/templates/verification-status-card";

export default function DashboardPageTemplate() {
  return (
    <div className="space-y-5 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <WelcomeHeader isVerified={true} />
      <VerificationBanner />
      <StatsCardRow />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartAreaInteractive />
        <VerificationStatusCard />
      </div>
      <RecentPrintJobs />
    </div>
  );
}
