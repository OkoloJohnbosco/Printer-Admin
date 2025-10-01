"use client";

import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orders, printHubs } from "@/lib/constants";
import { Clock, MapPin, Package, Settings, TrendingUp } from "lucide-react";

export default function PrintHubDetailPageTamplate({
  params,
}: {
  params: { id: string };
}) {
  const hub = printHubs.find((hub) => hub.id === params.id);
  if (!hub) {
    return <div>Hub not found</div>;
  }

  const statusColors: Record<string, string> = {
    "In Progress": "bg-primary/10 text-primary",
    Completed: "bg-primary/20 text-primary",
  };

  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6 space-y-4">
          <BackButton text="Back to Print Hubs" />
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{hub.name}</h1>
              <p className="text-muted-foreground">{hub.location}</p>
            </div>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-3">
          <Card className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Active Orders
              </CardTitle>
              <Package className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hub.activeOrders}</div>
              <p className="text-primary text-xs">Currently processing</p>
            </CardContent>
          </Card>

          <Card className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Completed Today
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hub.completedToday}</div>
              <p className="text-primary text-xs">+15% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="@container/card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Avg Processing Time
              </CardTitle>
              <Clock className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hub.avgProcessingTime}</div>
              <p className="text-primary text-xs">-12% from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Hub Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-border rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Order ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Started At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={statusColors[order.status]}
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {order.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Hub Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">Address</p>
                    <p className="font-medium">{hub.address}</p>
                  </div>
                </div>

                <div className="border-border border-t pt-4">
                  <p className="mb-3 text-sm font-medium">
                    Contact Information
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Manager
                      </span>
                      <span className="text-sm font-medium">
                        {hub.contact.manager}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Email
                      </span>
                      <span className="text-sm font-medium">
                        {hub.contact.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Phone
                      </span>
                      <span className="text-sm font-medium">
                        {hub.contact.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Current Status
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {hub.status}
                  </Badge>
                </div>

                <div className="border-border border-t pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Capacity
                    </span>
                    <span className="text-sm font-medium">{hub.capacity}%</span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className={`h-full ${hub.capacity > 80 ? "bg-destructive" : "bg-green-700"}`}
                      style={{ width: `${hub.capacity}%` }}
                    />
                  </div>
                  {hub.capacity > 80 && (
                    <p className="text-destructive mt-2 text-xs">
                      High capacity - consider load balancing
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">Assign New Order</Button>

                <Button variant="outline" className="w-full bg-transparent">
                  Performance Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
