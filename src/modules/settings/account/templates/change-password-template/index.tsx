"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z
  .object({
    currentPassword: z
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

function ChangePasswordTemplate() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 max-w-xl w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your current password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your new password"
                      {...field}
                    />
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ChangePasswordTemplate;
