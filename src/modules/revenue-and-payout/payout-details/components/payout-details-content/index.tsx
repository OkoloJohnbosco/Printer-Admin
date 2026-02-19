"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useGetHubById from "@/lib/hooks/admin/use-get-hub-by-id";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import useGetOrderDetails from "@/lib/hooks/orders/use-get-order-details";
import {
  Payout,
  PayoutStatus,
} from "@/lib/hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import {
  formatCurrency,
  formatStatusText,
  formatToFullYMD,
  getPayoutStatusBadgeVariant,
} from "@/lib/utils";
import ReferenceFilesCard from "@/modules/design-requests/design-request-details/components/reference-files-card";
import ReviewPayoutFormModal from "@/modules/revenue-and-payout/components/review-payout-form-modal";
import routes from "@/routes";
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  FileCheck,
  FileText,
  Hash,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface PayoutDetailsContentProps {
  payout: Payout;
}

export function PayoutDetailsContent({ payout }: PayoutDetailsContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orderDetails = useGetOrderDetails(payout.orderId);
  const hubDetails = useGetHubById(payout.hubId);

  const order = orderDetails.value?.data;
  const hub = hubDetails.value?.data;
  const orderLoading = orderDetails.isLoading && !orderDetails.value;
  const hubLoading = hubDetails.isLoading && !hubDetails.value;
  const orderError = orderDetails.isError;
  const hubError = hubDetails.isError;
  const canApprovePayout = payout.status === PayoutStatus.PENDING;

  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href={routes.REVENUE_AND_PAYOUT}>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground mb-4 -ml-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Revenue & Payout
              </Button>
            </Link>
            <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
              Payout details
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Payout {payout.reference}
            </p>
          </div>
          {canApprovePayout && (
            <Button
              variant="default"
              size="sm"
              onClick={onOpen}
              disabled={!canApprovePayout}
              className="shrink-0 gap-2"
            >
              <FileCheck className="h-4 w-4" />
              Review Payout
            </Button>
          )}
        </div>
        <ReviewPayoutFormModal
          isOpen={isOpen}
          onClose={onClose}
          payout={payout}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Payout information */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Payout information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Hash className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Reference</p>
                      <p className="font-mono font-medium">
                        {payout.reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Date</p>
                      <p className="font-medium">
                        {formatToFullYMD(payout.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Amount</p>
                      <p className="font-medium">
                        {formatCurrency(Number(payout.amount))}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Type</p>
                      <p className="font-medium capitalize">{payout.type}</p>
                    </div>
                  </div>
                </div>
                <div className="border-border flex items-center justify-between border-t pt-4">
                  <p className="text-muted-foreground text-sm">Status</p>
                  <Badge
                    variant={getPayoutStatusBadgeVariant(
                      payout.status as never,
                    )}
                  >
                    {formatStatusText(payout.status)}
                  </Badge>
                </div>
                {payout.rejectionReason && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                    <p className="text-muted-foreground text-xs font-medium">
                      Rejection reason
                    </p>
                    <p className="text-sm">{payout.rejectionReason}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order details */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Order details</CardTitle>
              </CardHeader>
              <CardContent>
                {orderLoading && (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                )}
                {orderError && (
                  <p className="text-muted-foreground text-sm">
                    Failed to load order details.{" "}
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      onClick={() => orderDetails.refetch()}
                    >
                      Try again
                    </Button>
                  </p>
                )}
                {order && !orderLoading && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Hash className="text-muted-foreground mt-1 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Order reference
                        </p>
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-primary font-mono font-medium hover:underline"
                        >
                          {order.reference}
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="text-muted-foreground mt-1 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm">Total</p>
                        <p className="font-medium">
                          {formatCurrency(parseFloat(order.total))}
                        </p>
                      </div>
                    </div>

                    {/* Order items */}
                    {order.items && order.items.length > 0 && (
                      <div className="border-border border-t pt-4">
                        <p className="text-muted-foreground mb-3 text-sm font-medium">
                          Order items
                        </p>
                        <div className="space-y-2">
                          {order.items.map((item) => {
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
                                            parseFloat(item.price) /
                                              item.quantity,
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
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Hub details */}
          <div className="space-y-6">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Hub details</CardTitle>
              </CardHeader>
              <CardContent>
                {hubLoading && (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                )}
                {hubError && (
                  <p className="text-muted-foreground text-sm">
                    Failed to load hub details.{" "}
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      onClick={() => hubDetails.refetch()}
                    >
                      Try again
                    </Button>
                  </p>
                )}
                {hub && !hubLoading && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="text-muted-foreground mt-1 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Business
                        </p>
                        <Link
                          href={`/print-hubs/${hub.id}`}
                          className="text-primary font-medium hover:underline"
                        >
                          {hub.businessName}
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-muted-foreground mt-1 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Location
                        </p>
                        <p className="font-medium">
                          {[hub.city, hub.state].filter(Boolean).join(", ") ||
                            "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Hash className="text-muted-foreground mt-1 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Business address
                        </p>
                        <p className="text-sm">{hub.businessAddress || "—"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
