"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  ModalProps,
} from "@/components/ui/alert-dialog";
import Heading from "@/components/ui/heading";
import BusinessInfoVerificationForm from "./business-info-verifcation-form";

export default function BusinessInfoVerificationFormModal({
  isOpen,
}: ModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-full bg-brand-gray-500 max-h-[80vh] pb-0 overflow-auto pt-0 scroll-smooth space-y-4 border-0 px-0 shadow-none sm:max-w-2xl">
        <AlertDialogHeader className="space-y-4 bg-brand-gray-500 sticky top-0 z-10 pt-3 text-left border-b rounded-lg">
          <AlertDialogTitle className="sr-only">Coming Soon</AlertDialogTitle>
          <Heading size="h6" className="px-4">
            Business Information Verification
          </Heading>
          <AlertDialogDescription className="sr-only">
            Business information verification
          </AlertDialogDescription>
        </AlertDialogHeader>
        <BusinessInfoVerificationForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
