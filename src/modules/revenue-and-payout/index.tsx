"use client";

import RevenueHeader from "./components/revenue-header";
import RecentTransactions from "./templates/recent-transaction";
import RevenueStatsCardRow from "./templates/revenue-stats-card-row";

export default function RevenueAndPayoutsPageTemplate() {
  return (
    <div className="page-fade-in space-y-5">
      <RevenueHeader />
      <RevenueStatsCardRow />
      <RecentTransactions />
    </div>
  );
}
