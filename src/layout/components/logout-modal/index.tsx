"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  ModalProps,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function LogoutModal({ isOpen, onClose }: ModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent onEscapeKeyDown={onClose} className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Log Out</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will sign you out of your account
            and remove your data from your cache.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-2">
          <AlertDialogAction onClick={onClose}>Cancel</AlertDialogAction>
          <Button variant="outline">Log out</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutModal;
