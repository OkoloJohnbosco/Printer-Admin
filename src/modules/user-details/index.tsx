"use client";

import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { userDetails } from "@/lib/constants";
import useGetUserById from "@/lib/hooks/users/use-get-user-by-id";
import {
  Activity,
  Calendar,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import UserActionsSidebar from "./components/user-actions-sidebar";
import UserDetailsSkeleton from "./components/user-details-skeleton";
import UserOrdersCard from "./components/user-orders-card";

// Type guards for optional properties
type UserWithAddress = (typeof userDetails)[keyof typeof userDetails] & {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

type UserWithWallet = (typeof userDetails)[keyof typeof userDetails] & {
  wallet: {
    balance: number;
    currency: string;
  };
};

export default function UserDetailsPageTemplate({
  params,
}: {
  params: { id: string };
}) {
  const mockUserData = userDetails[params.id as keyof typeof userDetails];
  const getUserById = useGetUserById(params.id);
  const apiUser = getUserById.value?.data;

  const [localStatus, setLocalStatus] = useState<"ACTIVE" | "SUSPENDED">(
    mockUserData?.status || "ACTIVE",
  );

  // Loading state
  if (getUserById.isLoading) {
    return <UserDetailsSkeleton />;
  }

  if (!apiUser && !mockUserData) {
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
    ...mockUserData,
    // Override with API data
    firstName: apiUser?.firstName || mockUserData?.firstName || "",
    lastName: apiUser?.lastName || mockUserData?.lastName || "",
    email: apiUser?.email || mockUserData?.email || "",
    role: apiUser?.role || mockUserData?.role || "USER",
    createdAt: apiUser?.createdAt || mockUserData?.createdAt || "",
  };

  const handleStatusUpdate = async (status: "ACTIVE" | "SUSPENDED") => {
    setLocalStatus(status);
    toast.success(
      `User ${status === "ACTIVE" ? "reactivated" : "suspended"} successfully`,
    );
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

  // Type-safe checks for optional properties
  const hasAddress = "address" in user && user.address;
  const hasWallet = "wallet" in user && user.wallet;

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
              currentStatus={localStatus}
              currentRole={user.role as "USER" | "ADMIN" | "HUB_OWNER"}
              currentProfile={{
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
              }}
              onStatusUpdate={handleStatusUpdate}
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
                      <p className="font-medium">{user.phone ?? "N/A"}</p>
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
                  <div className="flex items-start gap-3">
                    <Activity className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-sm">
                        Last Login
                      </p>
                      <p className="font-medium">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : "Never"}
                      </p>
                    </div>
                  </div>
                </div>

                {hasAddress && (
                  <div className="border-border border-t pt-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-muted-foreground mb-1 text-sm">
                          Address
                        </p>
                        <p className="text-sm">
                          {(user as UserWithAddress).address.street}
                          <br />
                          {(user as UserWithAddress).address.city},{" "}
                          {(user as UserWithAddress).address.state}{" "}
                          {(user as UserWithAddress).address.zipCode}
                          <br />
                          {(user as UserWithAddress).address.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {hasWallet && (
                  <div className="border-border border-t pt-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-muted-foreground mb-1 text-sm">
                          Wallet Balance
                        </p>
                        <p className="text-xl font-bold sm:text-2xl">
                          {(user as UserWithWallet).wallet.currency}{" "}
                          {(user as UserWithWallet).wallet.balance.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity History */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                {user.activityHistory && user.activityHistory.length > 0 ? (
                  <div className="space-y-4">
                    {user.activityHistory.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="bg-brand-alternative mt-2 h-2 w-2 shrink-0 rounded-full" />
                        <div className="border-border min-w-0 flex-1 border-b pb-4 last:border-b-0">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {activity.description}
                          </p>
                          {activity.ipAddress && (
                            <p className="text-muted-foreground text-xs">
                              IP: {activity.ipAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={FileText}
                    title="No Activity Yet"
                    description="This user hasn't performed any actions yet. Activity will appear here once they start using the platform."
                    className="border-0 py-12"
                  />
                )}
              </CardContent>
            </Card>

            {/* Orders */}
            <UserOrdersCard orders={user.orders} />
          </div>
        </div>
      </main>
    </div>
  );
}
