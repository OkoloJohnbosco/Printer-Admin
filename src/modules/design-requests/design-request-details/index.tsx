"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DesignerRequestStatus } from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import useGetDesignerRequestById from "@/lib/hooks/design-requests/use-get-designer-request-by-id";
import {
  formatStatusText,
  getDesignerRequestStatusBadgeVariant,
} from "@/lib/utils";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DesignRequestDetailsError } from "./components/design-request-details-error";
import { DesignRequestDetailsSkeleton } from "./components/design-request-details-skeleton";
import ReferenceFilesCard from "./components/reference-files-card";
import RequestInfoCard from "./components/request-info-card";
import SpecificationCard from "./components/specification-card";
import {
  canUpdateStatus,
  StatusUpdateModal,
} from "./components/status-update-modal";

export default function DesignRequestDetailPageTemplate({
  params,
}: {
  params: { id: string };
}) {
  const { isLoading, isError, error, refetch, value } =
    useGetDesignerRequestById(params.id);
  const designerRequest = value?.data;

  if (isLoading) {
    return <DesignRequestDetailsSkeleton />;
  }

  if (isError || !designerRequest) {
    return (
      <DesignRequestDetailsError
        message={error?.message || "Failed to load design request details"}
        onRetry={() => refetch()}
      />
    );
  }

  const customerName = `${designerRequest.user.firstName} ${designerRequest.user.lastName}`;

  return (
    <main className="page-fade-in w-full">
      <div className="mb-6">
        <Link href="/design-requests">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Design Requests
          </Button>
        </Link>
        <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
          Design Request Details
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Review and manage design request{" "}
          {(designerRequest.reference ?? designerRequest.id).slice(0, 12)}...
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <RequestInfoCard request={designerRequest} />

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Design Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {designerRequest.description}
              </p>
            </CardContent>
          </Card>

          <SpecificationCard request={designerRequest} />

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Name</span>
                  <span className="text-sm font-medium">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Email</span>
                  <span className="text-sm font-medium">
                    {designerRequest.user.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">User ID</span>
                  <span className="text-muted-foreground font-mono text-sm">
                    {designerRequest.userId.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <ReferenceFilesCard references={designerRequest.references} />

          <ReferenceFilesCard
            references={designerRequest.deliverables}
            title="Deliverable Files"
          />
        </div>

        <div className="space-y-6">
          {designerRequest.status === DesignerRequestStatus.PENDING && (
            <Card className="border-brand-alternative bg-brand-alternative/5">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-start gap-3">
                  <AlertCircle className="text-brand-alternative mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium">Action Required</p>
                    <p className="text-muted-foreground text-xs">
                      This request needs a designer assignment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-2 block text-sm">
                  Current Status
                </label>
                <Badge
                  variant={getDesignerRequestStatusBadgeVariant(
                    designerRequest.status,
                  )}
                  className="text-sm"
                >
                  {formatStatusText(designerRequest.status)}
                </Badge>
              </div>
              {canUpdateStatus(designerRequest.status) ? (
                <StatusUpdateModal
                  designerRequest={designerRequest}
                  onSuccess={() => refetch()}
                />
              ) : (
                <p className="text-muted-foreground text-xs">
                  This request has been{" "}
                  {designerRequest.status.toLowerCase().replace("_", " ")} and
                  can no longer be updated.
                </p>
              )}
            </CardContent>
          </Card>

          {designerRequest.rejectionReason && (
            <Card className="border-destructive/50 shadow-none">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{designerRequest.rejectionReason}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
