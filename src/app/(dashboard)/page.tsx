import { ChartAreaInteractive } from "@/modules/main/dashboard/components/monthly-revenue-chart";
import VerificationBanner from "@/modules/main/dashboard/components/verification-banner";
import WelcomeHeader from "@/modules/main/dashboard/components/welcome-header";
import StatsCardRow from "@/modules/main/dashboard/templates/stats-card-row";

export default function Home() {
  return (
    <div className="space-y-5 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <WelcomeHeader isVerified={true} />
      <VerificationBanner />
      <StatsCardRow />

      <div className="grid grid-cols-2 gap-4">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
