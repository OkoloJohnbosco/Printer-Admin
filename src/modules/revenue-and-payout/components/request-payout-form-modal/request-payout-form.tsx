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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const requestMethodSchema = z.object({
  amount: z
    .string({ error: "Amount must be a number" })
    .min(1, "Amount must be greater than 0"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
});

type PaymentMethodFormValues = z.infer<typeof requestMethodSchema>;

export default function RequestPayoutForm({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(requestMethodSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "",
    },
  });

  function onSubmit(values: PaymentMethodFormValues) {
    console.log(values);
  }

  return (
    <div className="w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 rounded-lg border bg-white p-4">
            <p className="text-brand-gray-300">Available Balance</p>
            <Heading size="h4">₦300,485.75</Heading>
          </div>
          {/* Payment Method Type */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount to Withdraw</FormLabel>
                <div className="relative flex items-center">
                  <span className="absolute left-0 px-2 font-medium">₦</span>
                  <FormControl>
                    <Input
                      step="0.01"
                      placeholder="Enter amount"
                      className="pr-14 pl-6"
                      {...field}
                    />
                  </FormControl>
                  <span className="text-muted-foreground absolute right-1 bg-white px-2 text-sm">
                    Naira
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="access">
                        Access Bank ••••8742 (Default)
                      </SelectItem>
                      <SelectItem value="gtbank">GTBank ••••1298</SelectItem>
                      <SelectItem value="zenith">
                        Zenith Bank ••••5521
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Confirm Request</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
