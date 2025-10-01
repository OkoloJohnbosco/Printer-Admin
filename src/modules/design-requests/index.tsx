"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import DesignRequestsStatsCardRow from "./components/design-requests-stats-card-row";
import DesignRequestsTable from "./components/design-requests-table";

export default function DesignRequestsPageTemplate() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    statusFilter: "all",
    priorityFilter: "all",
  });

  return (
    <div className="page-fade-in w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Heading size="h4">Design Requests</Heading>
          <p className="text-muted-foreground text-sm">
            Manage customer design requests and designer assignments
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Assign Designer
        </Button>
      </div>

      {/* Stats Cards */}
      <DesignRequestsStatsCardRow />

      {/* Filters */}
      <Card className="@container/card shadow-none">
        <CardHeader>
          <CardTitle>Design Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <div className="relative w-full min-w-[200px] flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search requests..."
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
                <SelectItem value="requested">Requested</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.priorityFilter}
              onValueChange={(value) =>
                setFilters({ ...filters, priorityFilter: value })
              }
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline_gray">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
          <DesignRequestsTable />
        </CardContent>
      </Card>
    </div>
  );
}
