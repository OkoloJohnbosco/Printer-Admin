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

interface ResetPasswordDialogProps {
  userId: string;
  userName: string;
  onReset: () => void;
  trigger?: React.ReactNode;
}

export function ResetPasswordDialog({
  userName,
  onReset,
  trigger,
}: ResetPasswordDialogProps) {
  const handleConfirm = () => {
    onReset();
    toast.success("Password reset email sent successfully");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Reset Password
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset User Password</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to send a password reset email to {userName}?
            They will receive an email with instructions to reset their
            password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Send Reset Email
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
