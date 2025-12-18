"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orders } from "@/lib/constants";
import { QUERYKEYS } from "@/lib/endpoints";
import { PrintHub } from "@/lib/hooks/admin/use-get-all-hubs";
import useUpdateVerificationStatus from "@/lib/hooks/admin/use-update-verification-status";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, MapPin } from "lucide-react";
import { useState } from "react";
import DocumentViewer, { Document } from "../../components/document-viewer";
import HubDetailsStats from "../../components/hub-details-stats";

export default function HubDetailsSection({ hub }: { hub: PrintHub }) {
  const [status, setStatus] = useState(hub.status);
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
    approvedDocuments.length === hubDocuments.length && hubDocuments.length > 0;

  const statusColors: Record<string, string> = {
    PENDING: "bg-primary/10 text-primary",
    APPROVED: "border-transparent text-brand-green-700! bg-brand-green-150!",
    REJECTED: "bg-primary/20 text-primary",
  };
  const updateVerificationStatus = useUpdateVerificationStatus(hub.userId);

  const handleStatusUpdate = () => {
    updateVerificationStatus
      .mutateAsync({
        status,
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.GET_HUB_BY_ID, hub.userId],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6 space-y-4">
          <BackButton text="Back to Print Hubs" />
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{hub.businessName}</h1>
              <p className="text-muted-foreground">{hub.businessAddress}</p>
            </div>
          </div>
        </div>

        <HubDetailsStats />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Document Verification Section */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentViewer documents={hubDocuments} />
              </CardContent>
            </Card>

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

                <div className="border-border border-t pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Capacity
                    </span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className={`h-full ${12 > 80 ? "bg-destructive" : "bg-green-700"}`}
                      style={{ width: `${12}%` }}
                    />
                  </div>
                  {12 > 80 && (
                    <p className="text-destructive mt-2 text-xs">
                      High capacity - consider load balancing
                    </p>
                  )}
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
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
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
                    Current Status
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
                  onClick={handleStatusUpdate}
                  fullWidth
                  variant="default_blue"
                  isLoading={updateVerificationStatus.isPending}
                  disabled={!allDocumentsApproved}
                >
                  {!allDocumentsApproved
                    ? `Approve Documents First (${approvedDocuments.length}/${hubDocuments.length} Approved)`
                    : "Update Status"}
                </Button>
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
