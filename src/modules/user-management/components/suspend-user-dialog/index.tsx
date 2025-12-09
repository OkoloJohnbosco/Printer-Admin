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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SuspendUserDialogProps {
  userId: string;
  userName: string;
  currentStatus: "ACTIVE" | "SUSPENDED";
  onStatusUpdate: (status: "ACTIVE" | "SUSPENDED") => void;
  trigger?: React.ReactNode;
}

export function SuspendUserDialog({
  userName,
  currentStatus,
  onStatusUpdate,
  trigger,
}: SuspendUserDialogProps) {
  const isSuspended = currentStatus === "SUSPENDED";

  const handleConfirm = () => {
    const newStatus = isSuspended ? "ACTIVE" : "SUSPENDED";
    onStatusUpdate(newStatus);
    toast.success(
      `User ${isSuspended ? "reactivated" : "suspended"} successfully`,
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant={isSuspended ? "default" : "destructive"} size="sm">
            {isSuspended ? "Reactivate" : "Suspend"} Account
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isSuspended ? "Reactivate" : "Suspend"} User Account
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isSuspended
              ? `Are you sure you want to reactivate ${userName}'s account? They will regain full access to the platform.`
              : `Are you sure you want to suspend ${userName}'s account? They will lose access to the platform until reactivated.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              isSuspended ? "" : "bg-destructive hover:bg-destructive/90"
            }
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
