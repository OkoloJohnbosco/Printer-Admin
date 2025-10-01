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
import useForgotPassword from "@/lib/hooks/auth/use-forgot-password";
import useCreateQueryString from "@/lib/hooks/common/use-create-path-query";
import routes from "@/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email("Must be a valid email"),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { createQueryString } = useCreateQueryString();
  const forgotPassword = useForgotPassword();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const email = form.watch("email");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    forgotPassword
      .mutateAsync(data)
      .then(() => {
        router.push(
          routes.FORGET_PASSWORD_VERIFY_EMAIL +
            "?" +
            createQueryString("email", email),
        );
      })
      .catch(console.error);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Heading
              size="h5"
              className="font-[family-name:var(--font-work-sans-heading)] font-medium"
            >
              Forgot password?
            </Heading>
            <p className="brand-gray-60 text-sm">
              Kindly input the email/phone number you registered with to reset
              password
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email / phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              fullWidth
              // isLoading={forgotPassword.isPending}
            >
              Next
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm">
            Remember your password?{" "}
            <Link
              href={routes.LOGIN}
              className="text-brand-black-500 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
