"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "@/components/ui/toast";
import { QUERYKEYS } from "@/lib/endpoints";
import useReviewDocument from "@/lib/hooks/admin/use-review-document";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, FileIcon, FileText, ImageIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import DocumentReviewSheet, {
  DocumentForReview,
} from "../document-review-sheet";

export interface Document {
  id: string;
  name: string;
  type: "image" | "pdf" | "doc";
  url: string;
  uploadedAt: string;
  status: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
}

interface DocumentViewerProps {
  documents: Document[];
}

export default function DocumentViewer({ documents }: DocumentViewerProps) {
  const params = useParams();
  const hubId = params.hubId as string;
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentForReview | null>(null);
  const [reviewAction, setReviewAction] = useState<"APPROVED" | "REJECTED">(
    "APPROVED",
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const reviewedDocumentIdsRef = useRef<Set<string>>(new Set());
  const queryClient = useQueryClient();

  // Create hook instance for the current selected document
  const reviewDocument = useReviewDocument(selectedDocument?.id || "");

  const getDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />;
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "doc":
        return <FileIcon className="h-5 w-5" />;
      default:
        return <FileIcon className="h-5 w-5" />;
    }
  };

  const getDocumentTypeColor = (type: Document["type"]) => {
    switch (type) {
      case "image":
        return "bg-blue-100 text-blue-700";
      case "pdf":
        return "bg-red-100 text-red-700";
      case "doc":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument({
      id: document.id,
      name: document.name,
      type: document.type,
      url: document.url,
      status: document.status,
    });
    setReviewAction("APPROVED");
    setRejectionReason("");
  };

  const handleCloseSheet = () => {
    setSelectedDocument(null);
    setReviewAction("APPROVED");
    setRejectionReason("");
  };

  const handleSubmitReview = async () => {
    if (!selectedDocument) return;

    // Validate rejection reason if action is REJECTED
    if (reviewAction === "REJECTED" && !rejectionReason.trim()) {
      toast.error({
        description: "Please provide a reason for rejection",
      });
      return;
    }

    // Prevent duplicate API calls
    if (reviewedDocumentIdsRef.current.has(selectedDocument.id)) {
      return;
    }

    reviewedDocumentIdsRef.current.add(selectedDocument.id);

    reviewDocument
      .mutateAsync({
        status: reviewAction,
        rejectionReason: reviewAction === "REJECTED" ? rejectionReason : "",
      })
      .then(() => {
        queryClient
          .invalidateQueries({
            queryKey: [QUERYKEYS.GET_HUB_BY_ID, hubId],
          })
          .then(() => {
            toast.success({
              description: `Document ${selectedDocument.name} ${reviewAction.toLowerCase()} successfully`,
            });
            handleCloseSheet();
          });
      })
      .catch((error) => {
        console.error(
          `Failed to ${reviewAction.toLowerCase()} document:`,
          error,
        );
        reviewedDocumentIdsRef.current.delete(selectedDocument.id);
        toast.error({
          description: `Failed to ${reviewAction.toLowerCase()} document`,
        });
      });
  };

  const approvedDocuments = documents.filter(
    (doc) => doc.status === "APPROVED",
  );

  const getStatusBadgeStyle = (status: Document["status"]) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "PENDING_REVIEW":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Verification Documents</h3>
          <Badge variant="outline">
            {approvedDocuments.length}/{documents.length} Approved
          </Badge>
        </div>

        <div className="grid gap-3">
          {documents.map((document) => {
            const isApproved = document.status === "APPROVED";
            return (
              <Card
                key={document.id}
                className={`transition-colors ${isApproved ? "border-green-200 bg-green-50" : ""}`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${getDocumentTypeColor(document.type)}`}
                    >
                      {getDocumentIcon(document.type)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-700">{document.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Uploaded:{" "}
                        {new Date(document.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusBadgeStyle(document.status)}>
                      {document.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDocument(document)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {approvedDocuments.length < documents.length && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> You must approve all {documents.length}{" "}
              documents before you can update the hub status.
            </p>
          </div>
        )}
      </div>

      {/* Document Review Sheet */}
      <DocumentReviewSheet
        document={selectedDocument}
        isOpen={!!selectedDocument}
        onClose={handleCloseSheet}
        reviewAction={reviewAction}
        onReviewActionChange={setReviewAction}
        rejectionReason={rejectionReason}
        onRejectionReasonChange={setRejectionReason}
        onSubmit={handleSubmitReview}
        isLoading={reviewDocument.isPending}
      />
    </>
  );
}
