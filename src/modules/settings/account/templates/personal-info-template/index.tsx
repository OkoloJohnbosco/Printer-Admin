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
import useUploadToS3 from "@/lib/hooks/files/use-upload-to-s3";
import useGetUserProfile from "@/lib/hooks/profile/use-get-user-profile";
import useUpdateProfile from "@/lib/hooks/profile/use-update-profile";
import getInitials from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(1, "First name is required"),
  lastName: z
    .string({ message: "Last name is required" })
    .min(1, "Last name is required"),
  email: z.string().email("Must be a valid email"),
  phone: z
    .string({ message: "Phone number is required" })
    .regex(
      /^(\+234|0)[0-9]{10}$/,
      "Phone number must be in format +2349012345678 or 09012345678",
    ),
});

function PersonalInfoTemplate() {
  const userProfile = useGetUserProfile();
  const user = userProfile.value?.data;
  const { mutateAsync, isPending } = useUpdateProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the reusable S3 upload hook
  const {
    upload: uploadAvatar,
    isUploading,
    fileKey: avatarKey,
    previewUrl: avatarPreview,
    reset: resetAvatar,
  } = useUploadToS3({
    context: "REFERENCE",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, form]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadAvatar(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    resetAvatar();
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      ...(avatarKey && { avatarKey }),
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid w-full gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:flex-row"
          >
            <div className="mx-auto space-y-2">
              <div className="relative w-fit">
                <Avatar className="h-32 w-32 rounded-full border-4 border-white shadow">
                  <AvatarImage
                    src={user?.avatar || avatarPreview || ""}
                    alt={user?.firstName || "user"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(
                      `${user?.firstName || ""} ${user?.lastName || ""}`,
                    )}
                  </AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                />
                <Button
                  size="icon"
                  type="button"
                  className="absolute right-0 bottom-0 rounded-full"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                >
                  <CameraIcon />
                </Button>
              </div>

              <Button
                size="sm"
                variant="ghost"
                type="button"
                className="text-destructive"
                onClick={handleRemovePhoto}
                disabled={!avatarPreview}
              >
                Remove Photo
              </Button>
            </div>

            <div className="w-full space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
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
                  name="lastName"
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
                        <Input
                          placeholder="Email"
                          type="email"
                          disabled
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. 08012345678"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending || isUploading}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PersonalInfoTemplate;
