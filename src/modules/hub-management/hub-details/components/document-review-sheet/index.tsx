"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ExternalLink, FileIcon, XCircle } from "lucide-react";
import Image from "next/image";

export interface DocumentForReview {
  id: string;
  name: string;
  type: "image" | "pdf" | "doc";
  url: string;
  status?: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
}

interface DocumentReviewSheetProps {
  document: DocumentForReview | null;
  isOpen: boolean;
  onClose: () => void;
  reviewAction: "APPROVED" | "REJECTED";
  onReviewActionChange: (action: "APPROVED" | "REJECTED") => void;
  rejectionReason: string;
  onRejectionReasonChange: (reason: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function DocumentReviewSheet({
  document,
  isOpen,
  onClose,
  reviewAction,
  onReviewActionChange,
  rejectionReason,
  onRejectionReasonChange,
  onSubmit,
  isLoading,
}: DocumentReviewSheetProps) {
  const renderDocumentPreview = () => {
    if (!document) return null;

    switch (document.type) {
      case "image":
        return (
          <div className="relative flex h-[400px] w-full justify-center">
            <Image
              src={document.url ?? ""}
              fill
              alt={document.name}
              className="max-h-[400px] max-w-full rounded-lg object-contain"
            />
          </div>
        );
      case "pdf":
        return (
          <div className="h-[500px] w-full">
            <iframe
              src={document.url}
              className="h-full w-full rounded-lg"
              title={document.name}
            />
          </div>
        );
      case "doc":
        return (
          <div className="flex h-[300px] flex-col items-center justify-center space-y-4">
            <FileIcon className="text-muted-foreground h-16 w-16" />
            <p className="text-muted-foreground text-center">
              Document preview not available. Click the external link icon above
              to view the document.
            </p>
            <Button asChild variant="outline">
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Document
              </a>
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const isAlreadyReviewed =
    document?.status === "APPROVED" || document?.status === "REJECTED";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="min-h-screen w-full overflow-y-auto px-3 pt-6 sm:max-w-6xl"
      >
        <SheetHeader className="px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <SheetTitle>{document?.name}</SheetTitle>
                <SheetDescription>
                  {isAlreadyReviewed
                    ? "View document details"
                    : "Review and take action on this document"}
                </SheetDescription>
              </div>
              {isAlreadyReviewed && (
                <Badge
                  variant={
                    document?.status === "APPROVED" ? "default" : "destructive"
                  }
                  className={
                    document?.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {document?.status}
                </Badge>
              )}
            </div>
            <Button variant="outline" size="icon">
              <a href={document?.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-4 flex-1 space-y-6">
          {/* Document Preview */}
          <div className="rounded-lg border p-2">
            {document && renderDocumentPreview()}
          </div>

          {isAlreadyReviewed ? (
            /* Document Already Reviewed Status */
            <div
              className={`rounded-lg border p-6 ${
                document?.status === "APPROVED"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start gap-4">
                {document?.status === "APPROVED" ? (
                  <CheckCircle2 className="mt-1 h-8 w-8 flex-shrink-0 text-green-600" />
                ) : (
                  <XCircle className="mt-1 h-8 w-8 flex-shrink-0 text-red-600" />
                )}
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      document?.status === "APPROVED"
                        ? "text-green-900"
                        : "text-red-900"
                    }`}
                  >
                    Document Already{" "}
                    {document?.status === "APPROVED" ? "Approved" : "Rejected"}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      document?.status === "APPROVED"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    This document has been reviewed and marked as{" "}
                    {document?.status?.toLowerCase()}. No further action is
                    required.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Action Selection - Only show for PENDING_REVIEW documents */
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Select Action</Label>
                <p className="text-muted-foreground text-sm">
                  Choose whether to approve or reject this document
                </p>
              </div>

              <RadioGroup
                value={reviewAction}
                onValueChange={(value) =>
                  onReviewActionChange(value as "APPROVED" | "REJECTED")
                }
                className="flex gap-3"
              >
                <div className="flex w-full items-center space-x-4 rounded-lg border border-green-200 bg-green-50 p-4 py-6">
                  <RadioGroupItem value="APPROVED" id="approve" />
                  <Label
                    htmlFor="approve"
                    className="flex-1 cursor-pointer font-medium"
                  >
                    <div>
                      <p className="text-green-700">Approve Document</p>
                      <p className="text-muted-foreground text-sm font-normal">
                        This document meets all requirements
                      </p>
                    </div>
                  </Label>
                </div>

                <div className="flex w-full items-center space-x-4 rounded-lg border border-red-200 bg-red-50 p-4 py-6">
                  <RadioGroupItem value="REJECTED" id="reject" />
                  <Label
                    htmlFor="reject"
                    className="flex-1 cursor-pointer font-medium"
                  >
                    <div>
                      <p className="text-red-700">Reject Document</p>
                      <p className="text-muted-foreground text-sm font-normal">
                        This document requires changes or is invalid
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Rejection Reason Textarea */}
              {reviewAction === "REJECTED" && (
                <div className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-4">
                  <Label htmlFor="rejection-reason" className="text-red-900">
                    Rejection Reason <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Please provide a detailed reason for rejecting this document..."
                    value={rejectionReason}
                    onChange={(e) => onRejectionReasonChange(e.target.value)}
                    rows={4}
                    className="resize-none border-red-200 bg-white"
                  />
                  <p className="text-xs text-red-700">
                    This reason will be sent to the print hub owner
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <SheetFooter className="sticky bottom-0 mt-6 flex flex-row! gap-3 border-t bg-white pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {isAlreadyReviewed ? "Close" : "Cancel"}
          </Button>
          {!isAlreadyReviewed && (
            <Button
              onClick={onSubmit}
              disabled={isLoading || !document}
              isLoading={isLoading}
              variant={reviewAction === "APPROVED" ? "default" : "destructive"}
            >
              {reviewAction === "APPROVED"
                ? "Approve Document"
                : "Reject Document"}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
