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
import { users } from "@/lib/constants";
import { exportToCSV } from "@/lib/utils";
import { Download, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import UserStatsRow from "./components/user-stats-row";
import UserTable from "./components/user-table";

export default function UserManagementPageTemplate() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    statusFilter: "all",
    verifiedFilter: "all",
  });

  // Filter users based on current filters
  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      filters.statusFilter === "all" || user.status === filters.statusFilter;
    const matchesVerified =
      filters.verifiedFilter === "all" ||
      (filters.verifiedFilter === "verified" && user.verified) ||
      (filters.verifiedFilter === "unverified" && !user.verified);
    const matchesSearch =
      !filters.searchTerm ||
      user.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      user.phone.includes(filters.searchTerm);

    return matchesStatus && matchesVerified && matchesSearch;
  });

  const handleExportCSV = () => {
    const exportData = filteredUsers.map((user) => ({
      "User ID": user.id,
      Name: `${user.firstName} ${user.lastName}`,
      Email: user.email,
      Phone: user.phone,
      Role: user.role,
      Status: user.status,
      Verified: user.verified ? "Yes" : "No",
      "Join Date": new Date(user.createdAt).toLocaleDateString(),
      "Last Login": user.lastLogin
        ? new Date(user.lastLogin).toLocaleDateString()
        : "Never",
    }));

    exportToCSV(exportData, "users-export");
  };

  return (
    <div className="page-fade-in w-full space-y-6">
      <main>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage and monitor all platform users
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="default_blue">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <UserStatsRow />

        <Card className="@container/card border-0 shadow-none">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters({ ...filters, searchTerm: e.target.value })
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.verifiedFilter}
                onValueChange={(value) =>
                  setFilters({ ...filters, verifiedFilter: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <UserTable users={filteredUsers} />

            <div className="mt-4 flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
