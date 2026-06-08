"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { QUERYKEYS } from "@/lib/endpoints";
import useDeliverOrder from "@/lib/hooks/orders/use-deliver-order";
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import useGetOrderDetails from "@/lib/hooks/orders/use-get-order-details";
import getInitials, {
  formatCurrency,
  formatStatusText,
  formatToMDY,
} from "@/lib/utils";
import ReferenceFilesCard from "@/modules/design-requests/design-request-details/components/reference-files-card";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Hash,
  Mail,
  MapPin,
  Package,
  PackageCheck,
  Phone,
} from "lucide-react";
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
  const queryClient = useQueryClient();
  const { isLoading, isError, error, refetch, value } = useGetOrderDetails(
    params.id,
  );
  const orderDetails = value?.data;
  const orderId = orderDetails?.id ?? "";
  const deliverOrder = useDeliverOrder(orderId);
  const [selectedHub, setSelectedHub] = useState("");
  const [isDeliverDialogOpen, setIsDeliverDialogOpen] = useState(false);
  // Initialize status from API data
  const [status, setStatus] = useState("");
  const isCompleted = status === OrderStatus.COMPLETED;
  const isDelivered = status === OrderStatus.DELIVERED;
  const isCompletedOrDelivered = isCompleted || isDelivered;

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
  const deliveryFee = parseFloat(orderDetails.deliveryFee) || 0;
  const orderTotal = parseFloat(orderDetails.total) || 0;
  const itemsSubtotal = orderDetails.items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0,
  );
  const serviceCharge = Math.max(0, orderTotal - itemsSubtotal - deliveryFee);

  const orderDate = formatToMDY(orderDetails.createdAt);

  const handleStatusUpdate = (newStatus: string) => {
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
          <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
            Order Details
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            View and manage order {orderDetails.reference}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
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
                        {firstItem?.offering?.product?.name || ""}
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
                  <div className="space-y-4">
                    {orderDetails.items.map((item) => {
                      const specEntries = item.specifications
                        ? Object.entries(item.specifications).filter(
                            ([, value]) => value != null && value !== "",
                          )
                        : [];
                      return (
                        <div
                          key={item.id}
                          className="border-border flex flex-col gap-4 rounded-md border p-3"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                  <p className="font-medium">
                                    {item.productName}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    Quantity: {item.quantity} •{" "}
                                    {formatCurrency(
                                      parseFloat(item.price) / item.quantity,
                                    )}{" "}
                                    each
                                  </p>
                                </div>
                                <p className="shrink-0 font-semibold">
                                  {formatCurrency(parseFloat(item.price))}
                                </p>
                              </div>
                              {specEntries.length > 0 && (
                                <>
                                  <Separator className="my-3" />
                                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                    {specEntries.map(([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex w-fit gap-2 rounded-full border bg-gray-50 px-2 py-1"
                                      >
                                        <dt className="text-muted-foreground shrink-0 font-medium capitalize">
                                          {key
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()}
                                          :
                                        </dt>
                                        <dd className="min-w-0 truncate font-medium">
                                          {String(value)}
                                        </dd>
                                      </div>
                                    ))}
                                  </dl>
                                </>
                              )}
                            </div>
                          </div>
                          {item.designFileUrl && (
                            <ReferenceFilesCard
                              references={[item.designFileUrl]}
                              title="Design file"
                            />
                          )}
                        </div>
                      );
                    })}
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
                  <Avatar className="h-10 w-10 shrink-0">
                    {orderDetails.user.avatarUrl && (
                      <AvatarImage
                        src={orderDetails.user.avatarUrl}
                        alt={`${orderDetails.user.firstName} ${orderDetails.user.lastName}`}
                      />
                    )}
                    <AvatarFallback>
                      {getInitials(
                        `${orderDetails.user.firstName} ${orderDetails.user.lastName}`,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">
                      {orderDetails.user.firstName} {orderDetails.user.lastName}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {orderDetails.user.email}
                    </p>
                  </div>
                </div>
                <div className="border-border space-y-4 border-t pt-4">
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                      Delivery Type:{" "}
                      <p className="font-medium text-black capitalize">
                        {orderDetails.deliveryType}
                      </p>
                    </p>

                    {orderDetails.deliveryFee && (
                      <p className="text-muted-foreground text-sm">
                        Delivery Fee:{" "}
                        <span className="font-medium text-black">
                          {formatCurrency(parseFloat(orderDetails.deliveryFee))}
                        </span>
                      </p>
                    )}
                  </div>

                  {orderDetails.deliveryAddress && (
                    <div className="space-y-2">
                      {orderDetails.deliveryAddress.recipientPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="text-muted-foreground h-4 w-4 shrink-0" />
                          <p className="text-muted-foreground text-sm">
                            {orderDetails.deliveryAddress.recipientPhone}
                          </p>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                        <div className="text-sm">
                          {orderDetails.deliveryAddress.locationName && (
                            <p className="font-medium">
                              {orderDetails.deliveryAddress.locationName}
                            </p>
                          )}
                          <p className="text-muted-foreground">
                            {orderDetails.deliveryAddress.locationAddress}
                            {orderDetails.deliveryAddress.city ||
                            orderDetails.deliveryAddress.state
                              ? `, ${[
                                  orderDetails.deliveryAddress.city,
                                  orderDetails.deliveryAddress.state,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Print Hub
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0 rounded-lg">
                    {orderDetails.hub.logoUrl && (
                      <AvatarImage
                        src={orderDetails.hub.logoUrl}
                        alt={orderDetails.hub.businessName}
                        className="object-cover"
                      />
                    )}
                    <AvatarFallback className="rounded-lg">
                      <Building2 className="text-muted-foreground h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {orderDetails.hub.businessName}
                    </p>
                  </div>
                </div>
                <div className="border-border space-y-2 border-t pt-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                    <p className="text-muted-foreground text-sm">
                      {orderDetails.hub.businessAddress}
                      {orderDetails.hub.city || orderDetails.hub.state
                        ? `, ${[orderDetails.hub.city, orderDetails.hub.state].filter(Boolean).join(", ")}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground h-4 w-4 shrink-0" />
                    <p className="text-muted-foreground truncate text-sm">
                      {orderDetails.hub.businessEmail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderDetails.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-muted-foreground text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 font-medium">
                      {formatCurrency(parseFloat(item.price))}
                    </span>
                  </div>
                ))}
                {deliveryFee > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground capitalize">
                      Delivery fee
                      {orderDetails.deliveryType
                        ? ` (${orderDetails.deliveryType})`
                        : ""}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(deliveryFee)}
                    </span>
                  </div>
                )}
                {serviceCharge > 0.01 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Service charge
                    </span>
                    <span className="font-medium">
                      {formatCurrency(serviceCharge)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between pt-1">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(orderTotal)}
                  </span>
                </div>
              </CardContent>
            </Card>

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
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={isCompletedOrDelivered}
                    >
                      Update Status
                    </Button>
                  }
                />
                <p className="text-muted-foreground text-xs">
                  {isCompletedOrDelivered
                    ? `This order has been ${orderDetails?.status?.toLowerCase()}`
                    : "Customer will receive an email notification"}
                </p>
              </CardContent>
            </Card>

            {isCompletedOrDelivered && (
              <Card className="@container/card border-green-200 bg-green-50/50 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PackageCheck className="h-5 w-5 text-green-600" />
                    Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isDelivered ? (
                    <p className="text-sm text-green-700">
                      This order has been delivered to the customer
                      successfully.
                    </p>
                  ) : (
                    <>
                      <p className="text-muted-foreground text-sm">
                        This order has been completed and is ready for delivery.
                        Mark it as delivered once the customer has received
                        their order.
                      </p>
                      <AlertDialog
                        open={isDeliverDialogOpen}
                        onOpenChange={setIsDeliverDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button className="w-full" size="lg">
                            <PackageCheck className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirm Delivery
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to mark order{" "}
                              <strong>{orderDetails.reference}</strong> as
                              delivered? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsDeliverDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                deliverOrder.mutateAsync({}).then(() => {
                                  queryClient.invalidateQueries({
                                    queryKey: [
                                      QUERYKEYS.GET_ORDER_BY_ID,
                                      params.id,
                                    ],
                                  });
                                  refetch();
                                  setIsDeliverDialogOpen(false);
                                });
                              }}
                              isLoading={deliverOrder.isPending}
                            >
                              Confirm Delivery
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

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
