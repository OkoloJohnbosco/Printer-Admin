"use client";

import RevenueHeader from "./components/revenue-header";
import RecentTransactions from "./templates/recent-transaction";

export default function RevenueAndPayoutsPageTemplate() {
  return (
    <div className="page-fade-in space-y-5">
      <RevenueHeader />
      {/* <RevenueStatsCardRow /> */}
      <RecentTransactions />
    </div>
  );
}
