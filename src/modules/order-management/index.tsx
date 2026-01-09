"use client";

import OrderFiltersCard from "./components/order-filters-card";
import OrderStatsRow from "./components/order-stats-row";

export default function OrdersPageTemplate() {
  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">
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
