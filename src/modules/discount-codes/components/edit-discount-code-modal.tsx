"use client";

import { TimeSelect } from "@/components/common/time-select";
import { ModalProps } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import toast from "@/components/ui/toast";
import { QUERYKEYS } from "@/lib/endpoints";
import { DiscountCode } from "@/lib/hooks/admin/discount-codes/use-get-all-discount-codes";
import useUpdateDiscountCode from "@/lib/hooks/admin/discount-codes/use-update-discount-code";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format, startOfDay } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "Status is required",
  }),
  expiresAt: z.string().optional(),
  maxUses: z.number().int().positive().optional(),
  maxUsesPerCustomer: z.number().int().positive().optional(),
});

type EditDiscountCodeFormValues = z.infer<typeof FormSchema>;

function parseOptionalNumber(value: string): number | undefined {
  if (value === "") return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function parseExpiresAt(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function getDefaultValues(
  discountCode: DiscountCode,
): EditDiscountCodeFormValues {
  return {
    status: discountCode.status,
    expiresAt: discountCode.expiresAt
      ? format(new Date(discountCode.expiresAt), "yyyy-MM-dd'T'HH:mm")
      : undefined,
    maxUses: discountCode.maxUses || undefined,
    maxUsesPerCustomer: discountCode.maxUsesPerCustomer || 1,
  };
}

export default function EditDiscountCodeModal({
  isOpen,
  onClose,
  discountCode,
}: ModalProps & { discountCode: DiscountCode }) {
  const form = useForm<EditDiscountCodeFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(discountCode),
  });

  const queryClient = useQueryClient();
  const updateDiscountCode = useUpdateDiscountCode(discountCode.id);

  useEffect(() => {
    if (isOpen) {
      form.reset(getDefaultValues(discountCode));
    }
  }, [isOpen, discountCode, form]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset(getDefaultValues(discountCode));
      onClose();
    }
  };

  function onSubmit(data: EditDiscountCodeFormValues) {
    const payload = {
      status: data.status,
      expiresAt: data.expiresAt || undefined,
      maxUses: data.maxUses || undefined,
      maxUsesPerCustomer: data.maxUsesPerCustomer || undefined,
    };

    updateDiscountCode
      .mutateAsync(payload)
      .then(() => {
        queryClient
          .invalidateQueries({
            queryKey: [QUERYKEYS.GET_ALL_DISCOUNT_CODES],
          })
          .then(() => {
            onClose();
          });
      })
      .catch((error: unknown) => {
        const errorMessage =
          error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data &&
          typeof error.response.data.message === "string"
            ? error.response.data.message
            : "Failed to update discount code";

        if (errorMessage.toLowerCase().includes("usage")) {
          toast.error({
            description: errorMessage,
          });
        } else {
          console.error(error);
        }
      });
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-2xl"
      >
        <SheetHeader className="shrink-0 border-b px-6 py-5 text-left">
          <SheetTitle className="text-xl">
            Edit Discount Code: {discountCode.code}
          </SheetTitle>
          <SheetDescription>
            Update lifecycle and usage limits. Pricing terms cannot be edited
            after creation.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">
              <section className="bg-muted/20 space-y-3 rounded-lg border p-4">
                <div>
                  <h3 className="text-sm font-semibold">
                    Discount details (read-only)
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Code and pricing set at creation.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground">Type:</span>{" "}
                    <span className="font-medium">{discountCode.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Value:</span>{" "}
                    <span className="font-medium">
                      {discountCode.type === "PERCENTAGE"
                        ? `${discountCode.value}%`
                        : `₦${Number(discountCode.value).toLocaleString()}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Min. subtotal:
                    </span>{" "}
                    <span className="font-medium">
                      ₦{Number(discountCode.minimumSubtotal).toLocaleString()}
                    </span>
                  </div>
                  {discountCode.maxDiscountAmount ? (
                    <div>
                      <span className="text-muted-foreground">
                        Max discount:
                      </span>{" "}
                      <span className="font-medium">
                        ₦
                        {Number(
                          discountCode.maxDiscountAmount,
                        ).toLocaleString()}
                      </span>
                    </div>
                  ) : null}
                  <div>
                    <span className="text-muted-foreground">
                      Current usage:
                    </span>{" "}
                    <span className="font-medium">
                      {discountCode.usageCount}
                    </span>
                  </div>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border p-4">
                <div>
                  <h3 className="text-sm font-semibold">Lifecycle</h3>
                  <p className="text-muted-foreground text-xs">
                    Control whether the code is active and when it expires.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => {
                    const expiresAtDate = parseExpiresAt(field.value);

                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expiry Date (Optional)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 font-normal",
                                  !expiresAtDate && "text-muted-foreground",
                                )}
                                contentClassName="text-left! justify-start!"
                              >
                                <Calendar1Icon className="mr-2 h-4 w-4" />
                                {expiresAtDate
                                  ? format(expiresAtDate, "PPP p")
                                  : "Pick expiry date and time"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={expiresAtDate}
                              defaultMonth={expiresAtDate}
                              onSelect={(date) => {
                                if (!date) {
                                  field.onChange(undefined);
                                  return;
                                }
                                const next = expiresAtDate
                                  ? new Date(expiresAtDate)
                                  : new Date();
                                next.setFullYear(
                                  date.getFullYear(),
                                  date.getMonth(),
                                  date.getDate(),
                                );
                                if (!expiresAtDate) {
                                  next.setHours(23, 59, 0, 0);
                                }
                                field.onChange(
                                  format(next, "yyyy-MM-dd'T'HH:mm"),
                                );
                              }}
                              disabled={(date) => date < startOfDay(new Date())}
                              className="rounded-lg border shadow-sm"
                            />
                          </PopoverContent>
                        </Popover>
                        {expiresAtDate ? (
                          <div className="flex flex-wrap items-end gap-3">
                            <div className="space-y-1.5">
                              <p className="text-muted-foreground text-xs font-medium">
                                Expiry time
                              </p>
                              <TimeSelect
                                idPrefix="discount-edit-expires"
                                value={{
                                  hours: expiresAtDate.getHours(),
                                  minutes: expiresAtDate.getMinutes(),
                                }}
                                onChange={({ hours, minutes }) => {
                                  const next = new Date(expiresAtDate);
                                  next.setHours(hours, minutes, 0, 0);
                                  field.onChange(
                                    format(next, "yyyy-MM-dd'T'HH:mm"),
                                  );
                                }}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground h-10 px-2"
                              onClick={() => field.onChange(undefined)}
                            >
                              Clear
                            </Button>
                          </div>
                        ) : null}
                        <FormDescription>
                          Leave empty for no expiration
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </section>

              <section className="space-y-4 rounded-lg border p-4">
                <div>
                  <h3 className="text-sm font-semibold">Usage limits</h3>
                  <p className="text-muted-foreground text-xs">
                    Control how often this code can be redeemed.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="maxUses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Total Uses (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                parseOptionalNumber(e.target.value),
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Cannot be lower than current usage
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxUsesPerCustomer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Uses Per Customer (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                parseOptionalNumber(e.target.value),
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>Per-customer limit</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
            </div>

            <SheetFooter className="bg-background shrink-0 flex-row justify-end gap-2 border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={updateDiscountCode.isPending}>
                Update Discount Code
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
