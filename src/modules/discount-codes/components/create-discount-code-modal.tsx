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
import { QUERYKEYS } from "@/lib/endpoints";
import useCreateDiscountCode from "@/lib/hooks/admin/discount-codes/use-create-discount-code";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format, startOfDay } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z
  .object({
    code: z.string().min(1, "Discount code is required"),
    type: z.enum(["PERCENTAGE", "FIXED"], {
      message: "Discount type is required",
    }),
    value: z
      .number({ message: "Value is required" })
      .positive("Value must be positive"),
    minimumSubtotal: z
      .number()
      .nonnegative("Minimum subtotal must be non-negative")
      .optional(),
    maxDiscountAmount: z.number().positive().optional(),
    expiresAt: z.string().optional(),
    maxUses: z.number().int().positive().optional(),
    maxUsesPerCustomer: z.number().int().positive().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "PERCENTAGE") {
        return data.value <= 100;
      }
      return true;
    },
    {
      message: "Percentage value cannot exceed 100",
      path: ["value"],
    },
  );

type CreateDiscountCodeFormValues = z.infer<typeof FormSchema>;

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

export default function CreateDiscountCodeModal({
  isOpen,
  onClose,
}: ModalProps) {
  const form = useForm<CreateDiscountCodeFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
      type: "PERCENTAGE",
      value: 10,
      minimumSubtotal: 0,
      maxUsesPerCustomer: 1,
    },
  });

  const queryClient = useQueryClient();
  const createDiscountCode = useCreateDiscountCode();

  const discountType = form.watch("type");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  function onSubmit(data: CreateDiscountCodeFormValues) {
    const payload = {
      ...data,
      minimumSubtotal:
        data.minimumSubtotal && data.minimumSubtotal > 0
          ? data.minimumSubtotal
          : undefined,
      maxDiscountAmount: data.maxDiscountAmount || undefined,
      expiresAt: data.expiresAt || undefined,
      maxUses: data.maxUses || undefined,
      maxUsesPerCustomer: data.maxUsesPerCustomer || undefined,
    };

    createDiscountCode
      .mutateAsync(payload)
      .then(() => {
        queryClient
          .invalidateQueries({
            queryKey: [QUERYKEYS.GET_ALL_DISCOUNT_CODES],
          })
          .then(() => {
            form.reset();
            onClose();
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-2xl"
      >
        <SheetHeader className="shrink-0 border-b px-6 py-5 text-left">
          <SheetTitle className="text-xl">Create New Discount Code</SheetTitle>
          <SheetDescription>
            Create a new discount code for customers. Pricing terms cannot be
            edited after creation.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">
              <section className="bg-muted/20 space-y-4 rounded-lg border p-4">
                <div>
                  <h3 className="text-sm font-semibold">Code & pricing</h3>
                  <p className="text-muted-foreground text-xs">
                    Core discount settings applied at checkout.
                  </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Discount Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="PRINTALAUNCH"
                            className="font-mono uppercase"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.toUpperCase())
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Automatically normalized to uppercase
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PERCENTAGE">
                              Percentage
                            </SelectItem>
                            <SelectItem value="FIXED">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {discountType === "PERCENTAGE"
                            ? "Percentage"
                            : "Amount (₦)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={
                              discountType === "PERCENTAGE" ? "10" : "5000"
                            }
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          {discountType === "PERCENTAGE"
                            ? "Max 100%"
                            : "Fixed amount in Naira"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {discountType === "PERCENTAGE" && (
                    <FormField
                      control={form.control}
                      name="maxDiscountAmount"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Max Discount Amount (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="5000"
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
                            Cap for percentage discounts
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </section>

              <section className="space-y-4 rounded-lg border p-4">
                <div>
                  <h3 className="text-sm font-semibold">Eligibility</h3>
                  <p className="text-muted-foreground text-xs">
                    Optional rules for when the code can be used.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="minimumSubtotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Subtotal (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10000"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(parseOptionalNumber(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum order subtotal required to use this code
                      </FormDescription>
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
                                idPrefix="discount-expires"
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
                        <FormDescription>Global usage limit</FormDescription>
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
              <Button type="submit" isLoading={createDiscountCode.isPending}>
                Create Discount Code
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
