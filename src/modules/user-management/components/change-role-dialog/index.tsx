"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface ChangeRoleDialogProps {
  userId: string;
  userName: string;
  currentRole: "USER" | "ADMIN" | "HUB_OWNER";
  onRoleChange: (role: "USER" | "ADMIN" | "HUB_OWNER") => void;
  trigger?: React.ReactNode;
}

export function ChangeRoleDialog({
  userName,
  currentRole,
  onRoleChange,
  trigger,
}: ChangeRoleDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    "USER" | "ADMIN" | "HUB_OWNER"
  >(currentRole);
  const handleSubmit = () => {
    if (selectedRole === currentRole) {
      toast.info("No change in role");
      return;
    }

    onRoleChange(selectedRole);
    toast.success(`Role updated to ${selectedRole} successfully`);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Change Role
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change User Role</AlertDialogTitle>
          <AlertDialogDescription>
            Update the role for {userName}. This will change their permissions
            on the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setSelectedRole(value as "USER" | "ADMIN" | "HUB_OWNER")
              }
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="HUB_OWNER">Hub Owner</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-muted rounded-md p-3 text-sm">
            <p className="font-medium">Role Descriptions:</p>
            <ul className="text-muted-foreground mt-2 space-y-1">
              <li>
                <strong>User:</strong> Standard platform access
              </li>
              <li>
                <strong>Hub Owner:</strong> Can manage print hub operations
              </li>
              <li>
                <strong>Admin:</strong> Full platform administration access
              </li>
            </ul>
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Change Role</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
