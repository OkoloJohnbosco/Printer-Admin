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
import useUploadToS3 from "@/lib/hooks/files/use-upload-to-s3";
import {
  AlertCircle,
  CheckCircle2,
  FileUp,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

// Valid status transitions based on current status
const STATUS_TRANSITIONS: Partial<
  Record<DesignerRequestStatus, DesignerRequestStatus[]>
> = {
  [DesignerRequestStatus.PENDING]: [
    DesignerRequestStatus.ACCEPTED,
    DesignerRequestStatus.REJECTED,
  ],
  [DesignerRequestStatus.IN_PROGRESS]: [DesignerRequestStatus.COMPLETED],
};

// Terminal statuses that cannot be updated
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
  const [uploadedFiles, setUploadedFiles] = useState<
    { key: string; name: string }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateDesignerRequest = useUpdateDesignerRequest(designerRequest.id);

  const { upload, isUploading } = useUploadToS3({
    context: "DELIVERABLE",
    onSuccess: () => {},
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setStatus(allowedStatuses[0] || designerRequest.status);
      setRejectionReason("");
      setUploadedFiles([]);
    }
  }, [open, designerRequest.status, allowedStatuses]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const fileKey = await upload(file);
      if (fileKey) {
        setUploadedFiles((prev) => [
          ...prev,
          { key: fileKey, name: file.name },
        ]);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (key: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.key !== key));
  };

  const isValid = () => {
    if (status === DesignerRequestStatus.REJECTED) {
      return rejectionReason.trim().length > 0;
    }
    // Deliverable files required when completing an IN_PROGRESS request
    if (
      status === DesignerRequestStatus.COMPLETED &&
      designerRequest.status === DesignerRequestStatus.IN_PROGRESS
    ) {
      return uploadedFiles.length > 0;
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

    // Include uploaded deliverable file keys when completing an IN_PROGRESS request
    if (
      status === DesignerRequestStatus.COMPLETED &&
      designerRequest.status === DesignerRequestStatus.IN_PROGRESS
    ) {
      payload.deliverables = uploadedFiles.map((f) => f.key);
    }

    updateDesignerRequest.mutate(
      payload as Parameters<typeof updateDesignerRequest.mutate>[0],
      {
        onSuccess: () => {
          setOpen(false);
          setRejectionReason("");
          setUploadedFiles([]);
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
          {/* Status Selection */}
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

          {/* Rejection Reason - shown when REJECTED is selected */}
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

          {/* Deliverable File Uploads - shown when COMPLETED is selected and current status is IN_PROGRESS */}
          {status === DesignerRequestStatus.COMPLETED &&
            designerRequest.status === DesignerRequestStatus.IN_PROGRESS && (
              <div className="space-y-3">
                <Label>
                  Upload Deliverables{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <p className="text-muted-foreground text-xs">
                  Upload the completed design files. Supported formats: JPEG,
                  PNG, PDF, PSD, CorelDRAW, ZIP, RAR (max 1GB per file).
                </p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".jpeg,.jpg,.png,.pdf,.psd,.cdr,.zip,.rar"
                  className="hidden"
                  multiple
                />

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Select Files
                    </>
                  )}
                </Button>

                {uploadedFiles.length > 0 && (
                  <div className="border-border space-y-2 rounded-md border p-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.key}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileUp className="text-muted-foreground h-4 w-4 shrink-0" />
                          <span className="truncate text-sm">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive h-7 w-7 shrink-0"
                          onClick={() => handleRemoveFile(file.key)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedFiles.length === 0 && (
                  <p className="text-destructive flex items-center gap-1 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    Please upload at least one deliverable file
                  </p>
                )}
              </div>
            )}

          {/* Summary of changes */}
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
