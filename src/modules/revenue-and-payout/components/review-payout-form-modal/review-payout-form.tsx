"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Payout } from "@/lib/hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import useReviewPayoutRequest from "@/lib/hooks/payouts/use-review-payout-request";
import { formatCurrency } from "@/lib/utils";

const reviewPayoutSchema = z
  .object({
    status: z.enum(["APPROVED", "REJECTED"], {
      message: "Please select an action",
    }),
    rejectionReason: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.status === "REJECTED") {
        return data.rejectionReason && data.rejectionReason.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please provide a reason for rejection",
      path: ["rejectionReason"],
    },
  );

type ReviewPayoutFormValues = z.infer<typeof reviewPayoutSchema>;

export default function ReviewPayoutForm({
  onCancel,
  reviewPayoutRequest,
  payout,
}: {
  payout: Payout;
  reviewPayoutRequest: ReturnType<typeof useReviewPayoutRequest>;
  onCancel: () => void;
}) {
  const form = useForm<ReviewPayoutFormValues>({
    resolver: zodResolver(reviewPayoutSchema),
    defaultValues: {
      status: undefined,
      rejectionReason: "",
    },
  });

  const selectedStatus = form.watch("status");

  function onSubmit(values: ReviewPayoutFormValues) {
    reviewPayoutRequest
      .mutateAsync({
        status: values.status,
        rejectionReason:
          values.status === "REJECTED" ? values.rejectionReason : undefined,
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const isInitialPayout = payout.type === "INITIAL";

  return (
    <div className="w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Payout Details */}
          <div className="space-y-4 rounded-lg border bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Hub Name</p>
                <p className="font-medium">
                  {payout.hub?.businessName || "N/A"}
                </p>
              </div>
              <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                {isInitialPayout ? "Initial Payout" : "Final Payout"}
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-muted-foreground text-sm">Payout Amount</p>
              <Heading size="h4">
                {formatCurrency(Number(payout.amount))}
              </Heading>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Order Reference</p>
                <p className="font-mono text-sm">
                  {payout.order?.reference || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">
                  Payout Reference
                </p>
                <p className="font-mono text-sm">{payout.reference}</p>
              </div>
            </div>
          </div>

          {/* Action/Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APPROVED">Approve Payout</SelectItem>
                      <SelectItem value="REJECTED">Reject Payout</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rejection Reason - Only shown when REJECTED is selected */}
          {selectedStatus === "REJECTED" && (
            <FormField
              control={form.control}
              name="rejectionReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Rejection</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide a reason for rejecting this payout request..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={reviewPayoutRequest.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={reviewPayoutRequest.isPending}
              variant={
                selectedStatus === "REJECTED" ? "destructive" : "default"
              }
            >
              {selectedStatus === "REJECTED"
                ? "Reject Payout"
                : "Approve Payout"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
