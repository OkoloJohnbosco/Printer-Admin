"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import { cn } from "@/lib/utils";
import {
  Activity,
  Filter,
  MapPin,
  Package,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import PrintHubTable from "./components/printhub-table";
import PrintHubGrid from "./templates/print-hub-grid";

const tabs = [
  {
    title: "Gallery",
    value: "gallery",
  },
  {
    title: "List",
    value: "list",
  },
];

export default function PrintHubsPageTemplate() {
  const getAllHubs = useGetAllHubs({
    limit: 20,
    cursor: "",
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
    statusFilter: "all",
    locationFilter: "all",
  });
  const [active, setActive] = useState<string>("gallery");

  const stats = [
    {
      title: "Total Hubs",
      value: "12",
      icon: MapPin,
      change: "+2 this quarter",
    },
    {
      title: "Active Hubs",
      value: "10",
      icon: Activity,
      change: "83% operational",
    },
    {
      title: "Total Capacity",
      value: "890",
      icon: Package,
      change: "+15% efficiency",
    },
    {
      title: "Avg Rating",
      value: "4.7",
      icon: Users,
      change: "+0.2 this month",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Print Hubs</h1>
          <p className="text-muted-foreground">
            Manage and monitor print hub operations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Hub
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-success text-xs">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="@container/card shadow-none">
        <CardHeader>
          <CardTitle>Filter Hubs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative w-full">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search hubs..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                className="pl-10"
              />
            </div>
            <Select
              value={filters.statusFilter}
              onValueChange={(value) =>
                setFilters({ ...filters, statusFilter: value })
              }
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.locationFilter}
              onValueChange={(value) =>
                setFilters({ ...filters, locationFilter: value })
              }
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="il">Illinois</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline_gray">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
            <div className="bg-brand-gray-50 flex shrink-0 items-center gap-2 overflow-hidden rounded-full">
              {tabs?.map((tab) => (
                <Button
                  key={tab.value}
                  value={active}
                  onClick={() => setActive(tab.value)}
                  variant="ghost"
                  className={cn(
                    "text-foundation-black-300 items-center justify-center px-3 font-normal hover:bg-transparent sm:px-6",
                    tab.value === active && "text-white",
                  )}
                >
                  <span
                    className={cn(
                      tab.value === active
                        ? "text-white"
                        : "text-foundation-black-300",
                      "z-10 capitalize duration-200 ease-in-out",
                    )}
                  >
                    {tab.title}
                  </span>

                  {tab.value === active ? (
                    <motion.span
                      className="absolute top-0 left-0 h-full w-full rounded-full bg-black"
                      layoutId="underline-notification"
                    />
                  ) : null}
                </Button>
              ))}
            </div>
          </div>

          {/* Print Hubs Grid */}
          {active === "gallery" ? (
            <PrintHubGrid getAllHubs={getAllHubs} />
          ) : (
            <PrintHubTable getAllHubs={getAllHubs} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
