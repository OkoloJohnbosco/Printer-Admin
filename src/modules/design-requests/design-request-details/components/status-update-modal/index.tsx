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
import { Checkbox } from "@/components/ui/checkbox";
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
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

// Statuses that admin can update to (excluding PENDING and EXPIRED)
const ALLOWED_STATUSES = [
  DesignerRequestStatus.IN_PROGRESS,
  DesignerRequestStatus.COMPLETED,
  DesignerRequestStatus.ACCEPTED,
  DesignerRequestStatus.REJECTED,
] as const;

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

export function StatusUpdateModal({
  designerRequest,
  onSuccess,
  trigger,
}: StatusUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<DesignerRequestStatus>(
    designerRequest.status,
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>(
    [],
  );

  const updateDesignerRequest = useUpdateDesignerRequest(designerRequest.id);

  // Get available deliverables from preferences
  const availableDeliverables = designerRequest.preferences?.deliverables || [];

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setStatus(designerRequest.status);
      setRejectionReason("");
      setSelectedDeliverables([]);
    }
  }, [open, designerRequest.status]);

  const handleDeliverableToggle = (deliverable: string) => {
    setSelectedDeliverables((prev) =>
      prev.includes(deliverable)
        ? prev.filter((d) => d !== deliverable)
        : [...prev, deliverable],
    );
  };

  const handleSelectAllDeliverables = () => {
    if (selectedDeliverables.length === availableDeliverables.length) {
      setSelectedDeliverables([]);
    } else {
      setSelectedDeliverables([...availableDeliverables]);
    }
  };

  const isValid = () => {
    if (status === DesignerRequestStatus.REJECTED) {
      return rejectionReason.trim().length > 0;
    }
    if (status === DesignerRequestStatus.ACCEPTED) {
      return selectedDeliverables.length > 0;
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

    if (status === DesignerRequestStatus.ACCEPTED) {
      payload.deliverables = selectedDeliverables;
    }

    updateDesignerRequest.mutate(
      payload as Parameters<typeof updateDesignerRequest.mutate>[0],
      {
        onSuccess: () => {
          setOpen(false);
          setRejectionReason("");
          setSelectedDeliverables([]);
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
                {ALLOWED_STATUSES.map((statusValue) => (
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

          {/* Deliverables Selection - shown when ACCEPTED is selected */}
          {status === DesignerRequestStatus.ACCEPTED && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>
                  Select Deliverables{" "}
                  <span className="text-destructive">*</span>
                </Label>
                {availableDeliverables.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={handleSelectAllDeliverables}
                    className="h-auto p-0 text-xs"
                  >
                    {selectedDeliverables.length ===
                    availableDeliverables.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                )}
              </div>

              {availableDeliverables.length > 0 ? (
                <div className="border-border space-y-2 rounded-md border p-3">
                  {availableDeliverables.map((deliverable) => (
                    <div
                      key={deliverable}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={deliverable}
                        checked={selectedDeliverables.includes(deliverable)}
                        onCheckedChange={() =>
                          handleDeliverableToggle(deliverable)
                        }
                      />
                      <Label
                        htmlFor={deliverable}
                        className="cursor-pointer text-sm font-normal capitalize"
                      >
                        {deliverable}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted rounded-md p-3">
                  <p className="text-muted-foreground text-sm">
                    No deliverables specified in this request.
                  </p>
                </div>
              )}

              {selectedDeliverables.length === 0 &&
                availableDeliverables.length > 0 && (
                  <p className="text-destructive flex items-center gap-1 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    Please select at least one deliverable
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
