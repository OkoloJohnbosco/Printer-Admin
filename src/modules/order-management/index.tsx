"use client";

import { Button } from "@/components/ui/button";
import { orders } from "@/lib/constants";
import { exportToCSV } from "@/lib/utils";
import { Download } from "lucide-react";
import OrderFiltersCard from "./components/order-filters-card";
import OrderStatsRow from "./components/order-stats-row";

export default function OrdersPageTemplate() {
  const handleExportCSV = () => {
    const exportData = orders.map((order) => ({
      "Order ID": order.id,
      Date: order.date,
      Customer: order.customer,
      Product: order.product,
      Quantity: order.quantity,
      "Print Hub": order.hub,
      Status: order.status,
    }));

    exportToCSV(exportData, "orders-export");
  };

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
          <Button onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
        {/* Stats Cards */}
        <OrderStatsRow />
        <OrderFiltersCard />
      </main>
    </div>
  );
}
