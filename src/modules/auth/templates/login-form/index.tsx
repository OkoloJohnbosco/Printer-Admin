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
import useAuthLogin from "@/lib/hooks/auth/use-auth-login";
import routes from "@/routes";
import { setUserSession } from "@/services/api/api.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email("Must be a valid email"),
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

export default function LoginForm() {
  const router = useRouter();
  const authLogin = useAuthLogin();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    authLogin
      .mutateAsync(data)
      .then((res) => {
        setUserSession(res?.data?.data);
        router.push(routes.DASHBOARD);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex h-fit items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  <div className="flex items-center justify-between gap-1 pt-1.5 text-xs">
                    <div className="flex items-center gap-3">
                      <Checkbox id="terms" />
                      <Label
                        htmlFor="terms"
                        className="text-brand-placeholder text-xs font-light"
                      >
                        Keep me logged in
                      </Label>
                    </div>
                    <Link
                      href={routes.FORGOT_PASSWORD}
                      className={`text-brand-primary`}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FormItem>
              )}
            />
            <div className="space-y-6 pt-4">
              <Button
                size="lg"
                type="submit"
                fullWidth
                isLoading={authLogin.isPending}
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
