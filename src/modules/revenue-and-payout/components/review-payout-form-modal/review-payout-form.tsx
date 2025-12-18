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
import useReviewPayoutRequest from "@/lib/hooks/payouts/use-review-payout-request";

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
}: {
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

  return (
    <div className="w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 rounded-lg border bg-white p-4">
            <p className="text-brand-gray-300">Payout Amount</p>
            <Heading size="h4">₦300,485.75</Heading>
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
