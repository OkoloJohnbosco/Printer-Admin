"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Calendar, Hash, MapPin, Package, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { StatusUpdateDialog } from "./components/status-update-modal";

export default function OrderDetailPageTemplate({
  params,
}: {
  params: { id: string };
}) {
  const [status, setStatus] = useState("In Progress");
  const [selectedHub, setSelectedHub] = useState("NYC Hub");

  // Mock order data
  const order = {
    id: params.id,
    date: "2025-09-30",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    },
    product: {
      name: "Custom T-Shirt",
      type: "Apparel",
      quantity: 50,
      price: "$15.00",
      total: "$750.00",
    },
    hub: "NYC Hub",
    status: "In Progress",
    timeline: [
      { status: "Received", date: "2025-09-30 09:00 AM", completed: true },
      { status: "In Progress", date: "2025-09-30 10:30 AM", completed: true },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false },
      { status: "Completed", date: "Pending", completed: false },
    ],
  };

  const availableHubs = [
    { name: "NYC Hub", distance: "2.3 miles", capacity: "Available" },
    { name: "Brooklyn Hub", distance: "5.1 miles", capacity: "Available" },
    { name: "Queens Hub", distance: "8.7 miles", capacity: "Limited" },
  ];

  const handleStatusUpdate = (newStatus: string, notes?: string) => {
    console.log("Updating status to:", newStatus, "Notes:", notes);
    setStatus(newStatus);
    // In a real app, this would make an API call
  };

  const handleHubAssignment = () => {
    console.log("Assigning to hub:", selectedHub);
    // Hub assignment logic would go here
  };

  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6">
          <Link href="/orders">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <h1 className="mb-2 text-3xl font-bold">Order Details</h1>
          <p className="text-muted-foreground">
            View and manage order {params.id}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Hash className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Order ID</p>
                      <p className="font-mono font-medium">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Order Date
                      </p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Product</p>
                      <p className="font-medium">{order.product.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {order.product.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Print Hub</p>
                      <p className="font-medium">{order.hub}</p>
                    </div>
                  </div>
                </div>

                <div className="border-border border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Quantity</p>
                      <p className="text-2xl font-bold">
                        {order.product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-sm">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold">
                        {order.product.total}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-start gap-3">
                  <User className="text-muted-foreground mt-0.5 h-5 w-5" />
                  <div className="flex-1">
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer.email}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer.phone}
                    </p>
                  </div>
                </div>
                <div className="border-border border-t pt-4">
                  <p className="text-muted-foreground mb-1 text-sm">
                    Delivery Address
                  </p>
                  <p className="text-sm">{order.customer.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`mt-2 h-2 w-2 rounded-full ${item.completed ? "bg-primary" : "bg-muted"}`}
                      />
                      <div className="border-border last flex-1 border-b pb-4 last:pb-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {item.status}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-muted-foreground mb-2 block text-sm">
                    Current Status
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger disabled>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Received">Received</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <StatusUpdateDialog
                  currentStatus={status}
                  onStatusUpdate={handleStatusUpdate}
                  trigger={
                    <Button className="w-full" size="lg">
                      Update Status
                    </Button>
                  }
                />
                <p className="text-muted-foreground text-xs">
                  Customer will receive an email notification
                </p>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Assign Print Hub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-muted-foreground mb-2 block text-sm">
                    Select Hub
                  </label>
                  <Select value={selectedHub} onValueChange={setSelectedHub}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableHubs.map((hub) => (
                        <SelectItem key={hub.name} value={hub.name}>
                          {hub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Available Hubs</p>
                  {availableHubs.map((hub) => (
                    <div
                      key={hub.name}
                      className="border-border flex items-center justify-between rounded-md border p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{hub.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {hub.distance}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        {hub.capacity}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleHubAssignment}
                  className="w-full"
                  size="lg"
                >
                  Assign Hub
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
