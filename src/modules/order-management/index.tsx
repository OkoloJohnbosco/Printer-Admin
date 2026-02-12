"use client";

import OrderFiltersCard from "./components/order-filters-card";
import OrderStatsRow from "./components/order-stats-row";

export default function OrdersPageTemplate() {
  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
              Orders
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage and monitor all customer orders
            </p>
          </div>
        </div>
        {/* Stats Cards */}
        <OrderStatsRow />
        <OrderFiltersCard />
      </main>
    </div>
  );
}
