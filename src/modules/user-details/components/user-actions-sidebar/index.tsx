import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangeRoleDialog } from "@/modules/user-management/components/change-role-dialog";
import { ResetPasswordDialog } from "@/modules/user-management/components/reset-password-dialog";
import { SuspendUserDialog } from "@/modules/user-management/components/suspend-user-dialog";
import { UpdateProfileDialog } from "@/modules/user-management/components/update-profile-dialog";

interface UserActionsSidebarProps {
  userId: string;
  userName: string;
  currentStatus: "ACTIVE" | "SUSPENDED";
  currentRole: "USER" | "ADMIN" | "HUB_OWNER";
  currentProfile: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
  onStatusUpdate: (status: "ACTIVE" | "SUSPENDED") => void;
  onPasswordReset: () => void;
  onProfileUpdate: () => void;
  onRoleChange: (role: "USER" | "ADMIN" | "HUB_OWNER") => void;
}

export default function UserActionsSidebar({
  userId,
  userName,
  currentStatus,
  currentRole,
  currentProfile,
  onStatusUpdate,
  onPasswordReset,
  onProfileUpdate,
  onRoleChange,
}: UserActionsSidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="@container/card shadow-none">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SuspendUserDialog
            userId={userId}
            userName={userName}
            currentStatus={currentStatus}
            onStatusUpdate={onStatusUpdate}
            trigger={
              <Button
                className="w-full"
                variant={
                  currentStatus === "SUSPENDED" ? "default_blue" : "destructive"
                }
              >
                {currentStatus === "SUSPENDED"
                  ? "Reactivate Account"
                  : "Suspend Account"}
              </Button>
            }
          />

          <ResetPasswordDialog
            userId={userId}
            userName={userName}
            onReset={onPasswordReset}
            trigger={
              <Button className="w-full" variant="outline">
                Reset Password
              </Button>
            }
          />

          <UpdateProfileDialog
            userId={userId}
            currentProfile={currentProfile}
            onUpdate={onProfileUpdate}
            trigger={
              <Button className="w-full" variant="outline">
                Update Profile
              </Button>
            }
          />

          <ChangeRoleDialog
            userId={userId}
            userName={userName}
            currentRole={currentRole}
            onRoleChange={onRoleChange}
            trigger={
              <Button className="w-full" variant="outline">
                Change Role
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
