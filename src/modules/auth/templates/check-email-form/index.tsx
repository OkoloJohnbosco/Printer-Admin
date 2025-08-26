"use client";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/ui/countdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import useForgotPassword from "@/lib/hooks/auth/use-forgot-password";
import useVerifyResetPasswordOTP from "@/lib/hooks/auth/use-verify-reset-password-otp";
import { cn, delay } from "@/lib/utils";
import routes from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Wrong code, check and retry",
  }),
});

export default function CheckEmailForm() {
  const resendVerification = useForgotPassword();
  const verifyResetPasswordOTP = useVerifyResetPasswordOTP();
  const [canResendEmail, setCanResendEmail] = useState(false);
  const [counterNumber, setCount] = useState(1);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") as string;
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyResetPasswordOTP
      .mutateAsync({
        email,
        otp: data.pin,
      })
      .then((res) => {
        if (res.data.data.resetToken) {
          router.push(
            `${routes.RESET_PASSWORD}?email=${email}&token=${res.data.data.resetToken}`,
          );
        } else {
          form.setError("pin", {
            type: "manual",
            message: "Invalid code. Please try again.",
          });
        }
      })
      .catch(console.error);
  }

  const resendEmail = () => {
    resendVerification
      .mutateAsync({
        email,
      })
      .then(() => {
        setCount((prev) => (prev += 1));
        delay(100).then(() => {
          setCanResendEmail(false);
          form.setValue("pin", "");
        });
      })
      .catch(console.error);
  };

  const triggerSubmit = form.handleSubmit(onSubmit);
  return (
    <>
      <div className="w-full max-w-md space-y-2">
        <Heading size="h6">Enter Reset Code</Heading>
        <div className="text-foundation-black-400 text-sm">
          <p>Kindly input the reset code sent to your email</p>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      className="rounded-none bg-white"
                      containerClassName="justify-center space-x-2"
                      pattern={REGEXP_ONLY_DIGITS}
                      disabled={verifyResetPasswordOTP.isPending}
                      onComplete={() => {
                        triggerSubmit();
                      }}
                      {...field}
                    >
                      <InputOTPSlot
                        className="size-12 rounded-sm border bg-white shadow-none"
                        index={0}
                      />
                      <InputOTPSlot
                        className="size-12 rounded-sm border bg-white shadow-none"
                        index={1}
                      />
                      <InputOTPSlot
                        className="size-12 rounded-sm border bg-white shadow-none"
                        index={2}
                      />
                      <InputOTPSlot
                        className="size-12 rounded-sm border bg-white shadow-none"
                        index={3}
                      />
                      <InputOTPSlot
                        className="size-12 rounded-sm border bg-white shadow-none"
                        index={4}
                      />
                      <InputOTPSlot
                        className="size-12 rounded-sm border bg-white shadow-none"
                        index={5}
                      />
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="mt-5 text-center" />
                </FormItem>
              )}
            />

            <div className="text-foundation-black-400 flex items-center justify-center gap-1 space-y-3 text-center text-sm">
              <p className="m-0 p-0">
                We sent you a code. Resend code in{" "}
                <CountdownTimer
                  restartTrigger={counterNumber}
                  onExpire={() => setCanResendEmail(true)}
                />
              </p>
              <Button
                variant="secondary"
                size="icon"
                className="size-4 rounded-full font-light"
                disabled={!canResendEmail || resendVerification.isPending}
                onClick={resendEmail}
              >
                <RefreshCcw
                  className={cn(
                    resendVerification.isPending ? "animate-spin" : "",
                    "size-3",
                  )}
                />
              </Button>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              // isLoading={validateResetToken.isPending || verifyEmail.isPending}
            >
              Next
            </Button>
          </form>
        </Form>
        <div className="pt-5 text-center">
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
    </>
  );
}
