"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function PrintHubDetailsSkeleton() {
  return (
    <div className="page-fade-in w-full">
      <main>
        {/* Header Section */}
        <div className="mb-6 space-y-4">
          {/* Back Button */}
          <Skeleton className="h-6 w-32" />

          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {/* Hub name */}
              <Skeleton className="h-9 w-64" />
              {/* Location */}
              <Skeleton className="h-5 w-48" />
            </div>
            {/* Settings button */}
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {/* Active Orders Card */}
          <Card className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>

          {/* Completed Today Card */}
          <Card className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-8 w-16" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>

          {/* Avg Processing Time Card */}
          <Card className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-8 w-20" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column (2/3 width) */}
          <div className="space-y-6 md:col-span-2">
            {/* Hub Orders Table */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <div className="border-border rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>
                          <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-12" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-20" />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Skeleton className="h-4 w-20" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-8" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-20 rounded-full" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-4 w-24" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Hub Information Card */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address Section */}
                <div className="flex items-start gap-3">
                  <Skeleton className="mt-0.5 h-5 w-5" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-64" />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="border-border border-t pt-4">
                  <Skeleton className="mb-3 h-4 w-36" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-12" />
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Status */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* Capacity Section */}
                <div className="border-border border-t pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  {/* Progress bar */}
                  <Skeleton className="h-2 w-full rounded-full" />
                  {/* Optional warning message */}
                  <Skeleton className="mt-2 h-3 w-48" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Action buttons */}
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PrintHubDetailsSkeleton;
