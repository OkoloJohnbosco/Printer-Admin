"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  first_name: z
    .string({ error: "First name is required" })
    .min(1, "First name is required"),
  last_name: z
    .string({ error: "Last name is required" })
    .min(1, "Last name is required"),
  email: z.string().email("Must be a valid email"),
  phone: z
    .string()
    .regex(
      /^(?:\+234|0)[789][01]\d{8}$/,
      "Invalid Nigerian phone number. Use +234XXXXXXXXXX or 0XXXXXXXXXX format."
    ),
  bio: z.string({ error: "Bio is required" }).min(1, "Bio is required"),
});

function PersonalInfoTemplate() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-6"
          >
            <div className="space-y-2 mx-auto">
              <div className="relative w-fit">
                <Avatar className="h-32 border-4 border-white shadow  w-32 rounded-full">
                  <AvatarImage src="/profile.png" alt="user name" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="rounded-full absolute bottom-0 right-0"
                >
                  <CameraIcon />
                </Button>
              </div>

              <Button size="sm" variant="ghost" className="text-destructive">
                Remove Photo
              </Button>
            </div>

            <div className="space-y-4 w-full">
              <div className="grid gap-4 sm:grid-cols-2 grid-cols-1">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type me about yourself"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PersonalInfoTemplate;
