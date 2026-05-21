"use client";

import RecentTransactions from "./templates/recent-transaction";

export default function RevenueAndPayoutsPageTemplate() {
  return (
    <div className="page-fade-in space-y-5">
      {/* <RevenueStatsCardRow /> */}
      <RecentTransactions />
    </div>
  );
}
