"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  ModalProps,
} from "@/components/ui/alert-dialog";
import Heading from "@/components/ui/heading";
import useReviewPayoutRequest from "@/lib/hooks/payouts/use-review-payout-request";
import ReviewPayoutForm from "./review-payout-form";
import SucessfulPayout from "./successful-payout";

export default function ReviewPayoutFormModal({
  isOpen,
  onClose,
  orderId = "",
}: ModalProps & { orderId?: string }) {
  const reviewPayoutRequest = useReviewPayoutRequest(orderId);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-brand-gray-500 max-h-[88vh] w-full space-y-0 overflow-auto scroll-smooth border-0 px-0 pt-0 pb-0 shadow-none sm:max-w-lg">
        <AlertDialogHeader className="bg-brand-gray-500 sticky top-0 z-10 space-y-4 rounded-lg border-b pt-3 text-left">
          <AlertDialogTitle className="sr-only">Review Payout</AlertDialogTitle>
          <Heading size="h6" className="px-4 pb-2">
            Review Payout
          </Heading>
        </AlertDialogHeader>
        {reviewPayoutRequest.isSuccess ? (
          <SucessfulPayout />
        ) : (
          <ReviewPayoutForm
            onCancel={onClose}
            reviewPayoutRequest={reviewPayoutRequest}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
