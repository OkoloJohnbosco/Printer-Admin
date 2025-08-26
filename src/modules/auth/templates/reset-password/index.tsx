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
import useResetPassword from "@/lib/hooks/auth/use-reset-password";
import routes from "@/routes";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z
  .object({
    newPassword: z
      .string({
        error: "New Password is required",
      })
      .min(8, { message: "New Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "New Password must contain at least one uppercase letter",
      })
      .regex(/\d/, {
        message: "New Password must contain at least one number",
      })
      .regex(/[!@#$%^&*]/, {
        message: "New Password must contain at least one special character",
      }),
    confirmNewPassword: z.string({
      error: "Confirm New Password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  });

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams?.get("token") as string;

  const resetPassword = useResetPassword();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    resetPassword
      .mutateAsync({
        password: data.newPassword,
        resetToken,
      })
      .then(() => {
        router.push(routes.LOGIN);
      })
      .catch(console.error);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-9">
        <div className="space-y-4">
          <div className="space-y-2">
            <Heading
              size="h5"
              className="font-[family-name:var(--font-work-sans-heading)] font-medium"
            >
              Reset password?
            </Heading>
            <p className="brand-gray-60 text-sm">Kindly input a new Password</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-gray-800 text-nm font-light">
                    Enter New Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-gray-800 text-nm font-light">
                    Confirm Password
                  </FormLabel>

                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button type="submit" fullWidth size="lg">
                Proceed
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
