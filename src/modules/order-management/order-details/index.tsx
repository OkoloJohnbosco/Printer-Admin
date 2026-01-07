"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import useGetOrderDetails from "@/lib/hooks/orders/use-get-order-details";
import { formatCurrency, formatStatusText, formatToMDY } from "@/lib/utils";
import { ArrowLeft, Calendar, Hash, MapPin, Package, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AssignedHubCard } from "./components/assigned-hub-card";
import { OrderDetailsError } from "./components/order-details-error";
import { OrderDetailsSkeleton } from "./components/order-details-skeleton";
import { StatusUpdateDialog } from "./components/status-update-modal";

export default function OrderDetailPageTemplate({
  params,
}: {
  params: { id: string };
}) {
  const { isLoading, isError, error, refetch, value } = useGetOrderDetails(
    params.id,
  );
  const orderDetails = value?.data;
  const [selectedHub, setSelectedHub] = useState("");
  // Initialize status from API data
  const [status, setStatus] = useState("");

  // Update status when orderDetails loads
  useMemo(() => {
    if (orderDetails?.status) {
      setStatus(orderDetails.status);
    }
    if (orderDetails?.hub?.businessName) {
      setSelectedHub(orderDetails.hub.businessName);
    }
  }, [orderDetails]);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  // Show error state
  if (isError || !orderDetails) {
    return (
      <OrderDetailsError
        message={error?.message || "Failed to load order details"}
        onRetry={() => refetch()}
      />
    );
  }

  const totalQuantity = orderDetails.items.reduce(
    (sum: number, item) => sum + item.quantity,
    0,
  );
  const firstItem = orderDetails.items[0];

  const orderDate = formatToMDY(orderDetails.createdAt);

  // Generate timeline based on order status using OrderStatus enum
  const statusOrder = Object.values(OrderStatus);
  const currentStatusIndex = statusOrder.findIndex(
    (s) => s.toLowerCase() === orderDetails.status.toLowerCase(),
  );

  const timeline = statusOrder.map((statusValue, index) => ({
    status: formatStatusText(statusValue.toLowerCase()),
    date: index <= currentStatusIndex ? orderDate : "Pending",
    completed: index <= currentStatusIndex,
  }));

  const handleStatusUpdate = (newStatus: string, notes?: string) => {
    console.log("Updating status to:", newStatus, "Notes:", notes);
    setStatus(newStatus);
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
            View and manage order {orderDetails.reference}
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
                    <Hash className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Order Reference
                      </p>
                      <p className="font-mono font-medium">
                        {orderDetails.reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Order Date
                      </p>
                      <p className="font-medium">{orderDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Product</p>
                      <p className="font-medium">
                        {firstItem?.productName || "N/A"}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {firstItem?.offering?.template?.name || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Print Hub</p>
                      <p className="font-medium">
                        {orderDetails.hub.businessName}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {orderDetails.hub.city}, {orderDetails.hub.state}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-border border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Quantity</p>
                      <p className="text-2xl font-bold">{totalQuantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-sm">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(parseFloat(orderDetails.total))}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-border border-t pt-4">
                  <p className="text-muted-foreground mb-3 text-sm font-medium">
                    Order Items
                  </p>
                  <div className="space-y-2">
                    {orderDetails.items.map((item) => (
                      <div
                        key={item.id}
                        className="border-border flex items-center justify-between rounded-md border p-3"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-muted-foreground text-xs">
                            Quantity: {item.quantity} •{" "}
                            {formatCurrency(
                              parseFloat(item.price) / item.quantity,
                            )}{" "}
                            each
                          </p>
                        </div>
                        <p className="font-semibold">
                          {formatCurrency(parseFloat(item.price))}
                        </p>
                      </div>
                    ))}
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
                    <p className="font-medium">
                      {orderDetails.user.firstName} {orderDetails.user.lastName}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {orderDetails.user.email}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Customer ID: {orderDetails.user.id}
                    </p>
                  </div>
                </div>
                <div className="border-border border-t pt-4">
                  <p className="text-muted-foreground mb-1 text-sm">
                    Delivery Type
                  </p>
                  <p className="font-medium capitalize">
                    {orderDetails.deliveryType}
                  </p>
                  {orderDetails.deliveryFee && (
                    <p className="text-muted-foreground text-sm">
                      Delivery Fee:{" "}
                      {formatCurrency(parseFloat(orderDetails.deliveryFee))}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`mt-2 h-2 w-2 rounded-full ${item.completed ? "bg-primary" : "bg-muted"}`}
                      />
                      <div className="border-border last flex-1 border-b pb-4 last:pb-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-medium capitalize ${item.completed ? "text-foreground" : "text-muted-foreground"}`}
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
                    <SelectTrigger className="capitalize" disabled>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(OrderStatus).map((status) => (
                        <SelectItem
                          className="capitalize"
                          key={status}
                          value={status}
                        >
                          {formatStatusText(status?.toLowerCase())}
                        </SelectItem>
                      ))}
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

            <AssignedHubCard
              orderStatus={orderDetails.status}
              currentHub={orderDetails.hub}
              orderId={orderDetails.id}
              selectedHub={selectedHub}
              onSelectedHubChange={setSelectedHub}
              onRefetchOrder={refetch}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
