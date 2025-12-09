"use client";

import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userDetails } from "@/lib/constants";
import {
  Activity,
  Calendar,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ChangeRoleDialog } from "../components/change-role-dialog";
import { ResetPasswordDialog } from "../components/reset-password-dialog";
import { SuspendUserDialog } from "../components/suspend-user-dialog";
import { UpdateProfileDialog } from "../components/update-profile-dialog";

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
  const userData = userDetails[params.id as keyof typeof userDetails];
  const [localStatus, setLocalStatus] = useState<"ACTIVE" | "SUSPENDED">(
    userData?.status || "ACTIVE",
  );

  if (!userData) {
    return (
      <div className="page-fade-in w-full">
        <main>
          <BackButton text="Back to Users" />
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

  const user = userData;

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground">
                User ID: {params.id.slice(0, 8)}...
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={user.status === "ACTIVE" ? "info" : "destructive"}
              >
                {user.status}
              </Badge>
              <Badge variant={user.verified ? "info" : "secondary"}>
                {user.verified ? "Verified" : "Unverified"}
              </Badge>
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

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* User Information */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Full Name</p>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Role</p>
                      <p className="font-medium">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Join Date</p>
                      <p className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
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
                      <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div>
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
                      <CreditCard className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                          Wallet Balance
                        </p>
                        <p className="text-2xl font-bold">
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
                        <div className="bg-brand-alternative mt-2 h-2 w-2 rounded-full" />
                        <div className="border-border flex-1 border-b pb-4 last:border-b-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-muted-foreground text-sm">
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
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {user.orders && user.orders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono">
                            {order.id.slice(0, 8)}...
                          </TableCell>
                          <TableCell>{order.productName}</TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            ${order.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState
                    icon={ShoppingBag}
                    title="No Orders Yet"
                    description="This user hasn't placed any orders. Orders will appear here once they make a purchase."
                    className="border-0 py-12"
                  />
                )}
              </CardContent>
            </Card>

            {/* Login History */}
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Login History & Security</CardTitle>
              </CardHeader>
              <CardContent>
                {user.loginHistory && user.loginHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.loginHistory.slice(0, 10).map((login) => (
                        <TableRow key={login.id}>
                          <TableCell>
                            {new Date(login.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell className="font-mono">
                            {login.ipAddress}
                          </TableCell>
                          <TableCell>{login.device}</TableCell>
                          <TableCell>{login.location || "Unknown"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                login.status === "SUCCESS"
                                  ? "info"
                                  : "destructive"
                              }
                            >
                              {login.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState
                    icon={Shield}
                    title="No Login History"
                    description="No login attempts have been recorded for this user yet."
                    className="border-0 py-12"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <SuspendUserDialog
                  userId={params.id}
                  userName={`${user.firstName} ${user.lastName}`}
                  currentStatus={localStatus}
                  onStatusUpdate={handleStatusUpdate}
                  trigger={
                    <Button
                      className="w-full"
                      variant={
                        localStatus === "SUSPENDED"
                          ? "default_blue"
                          : "destructive"
                      }
                    >
                      {localStatus === "SUSPENDED"
                        ? "Reactivate Account"
                        : "Suspend Account"}
                    </Button>
                  }
                />

                <ResetPasswordDialog
                  userId={params.id}
                  userName={`${user.firstName} ${user.lastName}`}
                  onReset={handlePasswordReset}
                  trigger={
                    <Button className="w-full" variant="outline">
                      Reset Password
                    </Button>
                  }
                />

                <UpdateProfileDialog
                  userId={params.id}
                  currentProfile={{
                    email: user.email,
                    phone: user.phone,
                    firstName: user.firstName,
                    lastName: user.lastName,
                  }}
                  onUpdate={handleProfileUpdate}
                  trigger={
                    <Button className="w-full" variant="outline">
                      Update Profile
                    </Button>
                  }
                />

                <ChangeRoleDialog
                  userId={params.id}
                  userName={`${user.firstName} ${user.lastName}`}
                  currentRole={user.role}
                  onRoleChange={handleRoleChange}
                  trigger={
                    <Button className="w-full" variant="outline">
                      Change Role
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  All actions performed on this user account are logged for
                  audit purposes. View full audit log in the system logs.
                </p>
                <Button className="mt-4 w-full" variant="outline" size="sm">
                  View Audit Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
