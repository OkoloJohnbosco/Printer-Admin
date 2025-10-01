"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orders } from "@/lib/constants";
import { exportToCSV } from "@/lib/utils";
import { CalendarIcon, Download, Search } from "lucide-react";
import { useState } from "react";
import OrderStatsRow from "./components/order-stats-row";
import OrderTable from "./components/order-table";

export default function OrdersPageTemplate() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    statusFilter: "all",
    hubFilter: "all",
  });
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));

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
      <main className="p-6">
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
        <Card className="@container/card border-0 shadow-none">
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search by order ID, customer, or product..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({ ...filters, searchQuery: e.target.value })
                  }
                  className="pl-9"
                />
              </div>
              <Select
                value={filters.statusFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, statusFilter: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.hubFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, hubFilter: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by hub" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hubs</SelectItem>
                  <SelectItem value="nyc">NYC Hub</SelectItem>
                  <SelectItem value="la">LA Hub</SelectItem>
                  <SelectItem value="chicago">Chicago Hub</SelectItem>
                  <SelectItem value="miami">Miami Hub</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline_gray"
                    id="date"
                    className="h-10 w-fit justify-between rounded-md font-normal"
                  >
                    <CalendarIcon />
                    {date ? date.toLocaleDateString() : "Date range"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                    }}
                    defaultMonth={date}
                    numberOfMonths={2}
                    className="rounded-lg border shadow-sm"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <OrderTable />

            <div className="mt-4 flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                Showing 5 of 1,284 orders
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
