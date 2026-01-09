"use client";

import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetUserById from "@/lib/hooks/users/use-get-user-by-id";
import { Calendar, Mail, Phone, Shield, User } from "lucide-react";
import { toast } from "sonner";
import UserActionsSidebar from "./components/user-actions-sidebar";
import UserDetailsSkeleton from "./components/user-details-skeleton";

export default function UserDetailsPageTemplate({
  params,
}: {
  params: { id: string };
}) {
  const getUserById = useGetUserById(params.id);
  const apiUser = getUserById.value?.data;

  // Loading state
  if (getUserById.isLoading) {
    return <UserDetailsSkeleton />;
  }

  if (!apiUser) {
    return (
      <div className="page-fade-in w-full">
        <main>
          <BackButton text="Back to Users" href="/users" />
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">User Not Found</h1>
            <p className="text-muted-foreground">
              The requested user could not be found.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Use API data where available, fall back to mock data for other fields
  const user = {
    ...apiUser,
    // Override with API data
    firstName: apiUser?.firstName || "",
    lastName: apiUser?.lastName || "",
    email: apiUser?.email || "",
    role: apiUser?.role || "USER",
    createdAt: apiUser?.createdAt || "",
  };

  const handlePasswordReset = async () => {
    toast.success("Password reset email sent successfully");
  };

  const handleProfileUpdate = async () => {
    toast.success("Profile updated successfully");
  };

  const handleRoleChange = async (role: "USER" | "ADMIN" | "HUB_OWNER") => {
    toast.success(`Role updated to ${role} successfully`);
  };

  return (
    <div className="page-fade-in w-full">
      <main>
        <BackButton text="Back to Users" href="/users" />
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                User ID: {params.id.slice(0, 8)}...
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={
                  user.role === "ADMIN"
                    ? "info"
                    : user.role === "HUB_OWNER"
                      ? "secondary"
                      : "outline"
                }
              >
                {user.role}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Action Sidebar - Shown first on mobile */}
          <div className="order-first space-y-6 lg:order-last">
            <UserActionsSidebar
              userId={params.id}
              userName={`${user.firstName} ${user.lastName}`}
              currentStatus={"ACTIVE"}
              currentRole={user.role as "USER" | "ADMIN" | "HUB_OWNER"}
              currentProfile={{
                email: user.email,
                phone: "",
                firstName: user.firstName,
                lastName: user.lastName,
              }}
              onStatusUpdate={() => {}}
              onPasswordReset={handlePasswordReset}
              onProfileUpdate={handleProfileUpdate}
              onRoleChange={handleRoleChange}
            />
          </div>

          <div className="space-y-6 lg:col-span-2">
            {/* User Information */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <User className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-sm">Full Name</p>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-sm">Email</p>
                      <p className="truncate font-medium" title={user.email}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-sm">Phone</p>
                      <p className="font-medium">N/A</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-sm">Role</p>
                      <p className="font-medium">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-sm">Join Date</p>
                      <p className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders */}
            {/* <UserOrdersCard orders={user.orders} /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
