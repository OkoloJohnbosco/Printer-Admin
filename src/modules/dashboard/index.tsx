"use client";

import RecentActivityCard from "@/modules/dashboard/components/recent-activity-card";
import WelcomeHeader from "@/modules/dashboard/components/welcome-header";
import StatsCardRow from "@/modules/dashboard/templates/stats-card-row";
import HubPerformanceCard from "./components/hub-performance-card";
import QuickActionCard from "./components/quick-action-card";

export default function DashboardPageTemplate() {
  return (
    <div className="page-fade-in space-y-5">
      <WelcomeHeader />
      <StatsCardRow />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentActivityCard />
        <HubPerformanceCard />
      </div>
      <QuickActionCard />
    </div>
  );
}
