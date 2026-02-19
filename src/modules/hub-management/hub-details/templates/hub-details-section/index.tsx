"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BackButton from "@/components/ui/back-button";
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
import { QUERYKEYS } from "@/lib/endpoints";
import { HubStatus, PrintHub } from "@/lib/hooks/admin/use-get-all-hubs";
import useUpdateVerificationStatus from "@/lib/hooks/admin/use-update-verification-status";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, MapPin } from "lucide-react";
import { useState } from "react";
import DocumentViewer, { Document } from "../../components/document-viewer";
import HubDetailsStats from "../../components/hub-details-stats";
import HubOrdersTable from "../../components/hub-orders-table";

export default function HubDetailsSection({ hub }: { hub: PrintHub }) {
  const [status, setStatus] = useState(hub.status);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Map hub documents to DocumentViewer format
  const getDocumentType = (url: string): "image" | "pdf" | "doc" => {
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return "image";
    }
    if (extension === "pdf") {
      return "pdf";
    }
    return "doc";
  };

  const getDocumentName = (type: string): string => {
    const typeMap: Record<string, string> = {
      BUSINESS_LICENSE: "Business License",
      BUSINESS_REGISTRATION: "Business Registration Certificate",
      TAX_IDENTIFICATION_NUMBER_CERTIFICATE: "Tax Clearance Certificate",
      BUSINESS_PROOF_OF_ADDRESS: "Proof of Address",
      BUSINESS_REGISTRATION_CERTIFICATE: "Registration Certificate",
    };
    return typeMap[type] || type.replace(/_/g, " ");
  };

  const hubDocuments: Document[] =
    hub.documents?.map((doc) => ({
      id: doc.id,
      name: getDocumentName(doc.type),
      type: getDocumentType(doc.url),
      url: doc.url,
      uploadedAt: doc.createdAt,
      status: doc.status as "PENDING_REVIEW" | "APPROVED" | "REJECTED",
    })) || [];

  const approvedDocuments = hubDocuments.filter(
    (doc) => doc.status === "APPROVED",
  );
  const allDocumentsApproved =
    (approvedDocuments.length === hubDocuments.length &&
      hubDocuments.length > 0) ||
    hub.status === HubStatus.APPROVED;

  const updateVerificationStatus = useUpdateVerificationStatus(hub.userId);

  const isStatusUnchanged = status === hub.status;

  const handleStatusUpdate = () => {
    updateVerificationStatus
      .mutateAsync({
        status,
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.GET_HUB_BY_ID, hub.userId],
        });
        setIsConfirmModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatStatus = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6 space-y-4">
          <BackButton text="Back to Print Hubs" />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
                {hub.businessName}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {hub.businessAddress}
              </p>
            </div>
          </div>
        </div>

        <HubDetailsStats />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Document Verification Section */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentViewer documents={hubDocuments} />
              </CardContent>
            </Card>

            <HubOrdersTable hubId={hub.id} />

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Hub Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">Address</p>
                    <p className="font-medium">{hub.businessAddress}</p>
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
                        {hub.businessEmail}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Email
                      </span>
                      <span className="text-sm font-medium">
                        {hub.businessEmail}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Phone
                      </span>
                      <span className="text-sm font-medium">{hub.userId}</span>
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
                    variant={
                      hub?.status?.toLowerCase() as
                        | "approved"
                        | "rejected"
                        | "pending"
                    }
                  >
                    {hub.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!allDocumentsApproved && (
                  <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        Document Approval Required
                      </p>
                      <p className="text-sm text-amber-700">
                        You must approve all {hubDocuments.length} verification
                        documents before updating the hub status.
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-muted-foreground mb-2 block text-sm">
                    Current Hub Status
                  </label>
                  <Select
                    value={status}
                    onValueChange={setStatus}
                    disabled={!allDocumentsApproved}
                  >
                    <SelectTrigger
                      className={!allDocumentsApproved ? "opacity-50" : ""}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => setIsConfirmModalOpen(true)}
                  fullWidth
                  variant="default_blue"
                  disabled={!allDocumentsApproved || isStatusUnchanged}
                >
                  {!allDocumentsApproved
                    ? `Approve Documents First (${approvedDocuments.length}/${hubDocuments.length} Approved)`
                    : isStatusUnchanged
                      ? "No Changes to Update"
                      : "Update Hub Status"}
                </Button>
              </CardContent>
            </Card>

            <AlertDialog
              open={isConfirmModalOpen}
              onOpenChange={setIsConfirmModalOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to change the hub status from{" "}
                    <span className="font-semibold">
                      {formatStatus(hub.status)}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">
                      {formatStatus(status)}
                    </span>
                    ? This action will affect the hub&apos;s operational state.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    disabled={updateVerificationStatus.isPending}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault();
                      handleStatusUpdate();
                    }}
                    disabled={updateVerificationStatus.isPending}
                  >
                    {updateVerificationStatus.isPending
                      ? "Updating..."
                      : "Confirm Update"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </main>
    </div>
  );
}
