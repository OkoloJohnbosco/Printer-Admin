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
import RequestPayoutForm from "./request-payout-form";
import SucessfulPayout from "./successful-payout";

export default function RequestPayoutFormModal({
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-brand-gray-500 max-h-[88vh] w-full space-y-0 overflow-auto scroll-smooth border-0 px-0 pt-0 pb-0 shadow-none sm:max-w-lg">
        <AlertDialogHeader className="bg-brand-gray-500 sticky top-0 z-10 space-y-4 rounded-lg border-b pt-3 text-left">
          <AlertDialogTitle className="sr-only">
            Request Payout
          </AlertDialogTitle>
          <Heading size="h6" className="px-4">
            Request Payout
          </Heading>
          <AlertDialogDescription className="sr-only">
            Request Payout
          </AlertDialogDescription>
        </AlertDialogHeader>
        <RequestPayoutForm onCancel={onClose} />
        <SucessfulPayout />
      </AlertDialogContent>
    </AlertDialog>
  );
}
