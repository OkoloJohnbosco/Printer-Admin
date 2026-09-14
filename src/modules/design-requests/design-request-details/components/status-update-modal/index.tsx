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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiFileUploadField } from "@/components/ui/multi-file-upload-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DesignerRequest,
  DesignerRequestStatus,
} from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import useUpdateDesignerRequest from "@/lib/hooks/design-requests/use-update-designer-request";
import useMultiFileS3Upload from "@/lib/hooks/files/use-multi-file-s3-upload";
import { DELIVERABLE_MAX_FILES } from "@/lib/hooks/files/use-multi-file-s3-upload/use-multi-file-s3-upload.types";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

const STATUS_TRANSITIONS: Partial<
  Record<DesignerRequestStatus, DesignerRequestStatus[]>
> = {
  [DesignerRequestStatus.PENDING]: [
    DesignerRequestStatus.ACCEPTED,
    DesignerRequestStatus.REJECTED,
  ],
  [DesignerRequestStatus.IN_PROGRESS]: [DesignerRequestStatus.COMPLETED],
};

const TERMINAL_STATUSES = [
  DesignerRequestStatus.REJECTED,
  DesignerRequestStatus.ACCEPTED,
  DesignerRequestStatus.COMPLETED,
  DesignerRequestStatus.EXPIRED,
];

const STATUS_LABELS: Record<DesignerRequestStatus, string> = {
  [DesignerRequestStatus.PENDING]: "Pending",
  [DesignerRequestStatus.EXPIRED]: "Expired",
  [DesignerRequestStatus.REJECTED]: "Rejected",
  [DesignerRequestStatus.ACCEPTED]: "Accepted",
  [DesignerRequestStatus.COMPLETED]: "Completed",
  [DesignerRequestStatus.IN_PROGRESS]: "In Progress",
};

const DELIVERABLE_ACCEPT = ".jpeg,.jpg,.png,.pdf,.psd,.cdr,.zip,.rar";

interface StatusUpdateModalProps {
  designerRequest: DesignerRequest;
  onSuccess?: () => void;
  trigger?: ReactNode;
}

export function canUpdateStatus(status: DesignerRequestStatus): boolean {
  return !TERMINAL_STATUSES.includes(status);
}

export function StatusUpdateModal({
  designerRequest,
  onSuccess,
  trigger,
}: StatusUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const allowedStatuses = STATUS_TRANSITIONS[designerRequest.status] || [];
  const [status, setStatus] = useState<DesignerRequestStatus>(
    allowedStatuses[0] || designerRequest.status,
  );
  const [rejectionReason, setRejectionReason] = useState("");

  const updateDesignerRequest = useUpdateDesignerRequest(designerRequest.id);

  const {
    uploadedFiles,
    failedUploads,
    uploadingFileName,
    isUploading,
    maxFiles,
    fileCountLabel,
    canAddMore,
    addFiles,
    removeFile,
    clearFiles,
    getFileKeys,
  } = useMultiFileS3Upload({
    context: "DELIVERABLE",
    maxFiles: DELIVERABLE_MAX_FILES,
  });

  useEffect(() => {
    if (open) {
      setStatus(allowedStatuses[0] || designerRequest.status);
      setRejectionReason("");
      clearFiles();
    }
  }, [open, designerRequest.status, allowedStatuses, clearFiles]);

  const requiresDeliverables =
    status === DesignerRequestStatus.COMPLETED &&
    designerRequest.status === DesignerRequestStatus.IN_PROGRESS;

  const isValid = () => {
    if (status === DesignerRequestStatus.REJECTED) {
      return rejectionReason.trim().length > 0;
    }

    if (requiresDeliverables) {
      return uploadedFiles.length > 0 && failedUploads.length === 0;
    }

    return true;
  };

  const handleSubmit = () => {
    const payload: {
      status: DesignerRequestStatus;
      rejectionReason?: string;
      deliverables?: string[];
    } = { status };

    if (status === DesignerRequestStatus.REJECTED) {
      payload.rejectionReason = rejectionReason;
    }

    if (requiresDeliverables) {
      payload.deliverables = getFileKeys();
    }

    updateDesignerRequest.mutate(
      payload as Parameters<typeof updateDesignerRequest.mutate>[0],
      {
        onSuccess: () => {
          setOpen(false);
          setRejectionReason("");
          clearFiles();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="default_blue" fullWidth>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Update Status
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Update Request Status</AlertDialogTitle>
          <AlertDialogDescription>
            Change the status of this design request. The customer will be
            notified of any status changes.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <Select
              value={status}
              onValueChange={(value: DesignerRequestStatus) => setStatus(value)}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allowedStatuses.map((statusValue) => (
                  <SelectItem key={statusValue} value={statusValue}>
                    {STATUS_LABELS[statusValue]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {status === DesignerRequestStatus.REJECTED && (
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">
                Rejection Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="rejectionReason"
                placeholder="Please provide a reason for rejecting this request..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                className={
                  rejectionReason.trim().length === 0
                    ? "border-destructive"
                    : ""
                }
              />
              {rejectionReason.trim().length === 0 && (
                <p className="text-destructive flex items-center gap-1 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  Rejection reason is required
                </p>
              )}
            </div>
          )}

          {requiresDeliverables && (
            <MultiFileUploadField
              label="Upload Deliverables"
              description="Upload the completed design files. Each file is uploaded independently with its own presigned URL. Supported formats: JPEG, PNG, PDF, PSD, CorelDRAW, ZIP, RAR (max 1GB per file)."
              accept={DELIVERABLE_ACCEPT}
              required
              uploadedFiles={uploadedFiles}
              failedUploads={failedUploads}
              uploadingFileName={uploadingFileName}
              isUploading={isUploading}
              fileCountLabel={fileCountLabel}
              maxFiles={maxFiles}
              canAddMore={canAddMore}
              onFilesSelected={addFiles}
              onRemoveFile={removeFile}
              showEmptyError
            />
          )}

          {status !== designerRequest.status && (
            <div className="bg-muted/50 rounded-md p-3">
              <p className="text-sm">
                <span className="text-muted-foreground">Status change: </span>
                <span className="font-medium">
                  {STATUS_LABELS[designerRequest.status]}
                </span>
                <span className="text-muted-foreground"> → </span>
                <span className="font-medium">{STATUS_LABELS[status]}</span>
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={updateDesignerRequest.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !isValid() ||
              updateDesignerRequest.isPending ||
              isUploading ||
              status === designerRequest.status
            }
          >
            {updateDesignerRequest.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
