"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useAuthSignup from "@/lib/hooks/auth/use-auth-signup";
import Link from "next/link";

const FormSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(1, "First name is required"),
  lastName: z
    .string({ error: "Last name is required" })
    .min(1, "Last name is required"),
  email: z.string().email("Must be a valid email"),
  phone: z
    .string()
    .regex(
      /^(?:\+234|0)[789][01]\d{8}$/,
      "Invalid Nigerian phone number. Use +234XXXXXXXXXX or 0XXXXXXXXXX format.",
    ),
  isVendor: z.enum(["customer", "printer", "both"], {
    error: "You need to select a user type.",
  }),
  password: z
    .string({
      error: "Password is required",
    })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*]/, {
      message: "Password must contain at least one special character",
    }),
});

export default function SignUpForm() {
  const authSignup = useAuthSignup();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      isVendor: "customer",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    authSignup.mutateAsync({
      ...data,
      isVendor: data.isVendor === "customer",
    });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="isVendor"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-brand-gray-800 text-nm font-light">
                    Please select your preferable choice.
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-3"
                    >
                      <FormItem className="flex items-center gap-1">
                        <FormControl>
                          <RadioGroupItem value="customer" />
                        </FormControl>
                        <FormLabel className="font-normal">Customer</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1">
                        <FormControl>
                          <RadioGroupItem value="printer" />
                        </FormControl>
                        <FormLabel className="font-normal">Printer</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1">
                        <FormControl>
                          <RadioGroupItem value="both" />
                        </FormControl>
                        <FormLabel className="font-normal">Both</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-gray-800 text-nm font-light">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-gray-800 text-nm font-light">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-gray-800 text-nm font-light">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-gray-800 text-nm font-light">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center gap-1">
                      <div className="flex h-full items-center rounded-lg bg-white px-4">
                        <p className="text-sm font-[500] text-black">+234</p>
                      </div>
                      <Input placeholder="Enter your phone number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-gray-800 text-nm font-light">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="flex items-center gap-1 pt-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Checkbox id="terms" />
                      <Label
                        htmlFor="terms"
                        className="text-brand-placeholder text-xs font-light"
                      >
                        I agree to
                      </Label>
                    </div>
                    <Link href={"#"} className={`text-brand-primary`}>
                      Terms and Conditions
                    </Link>
                  </div>
                </FormItem>
              )}
            />
            <div className="space-y-6 pt-6">
              <Button size="lg" type="submit" fullWidth>
                Create an Account
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
