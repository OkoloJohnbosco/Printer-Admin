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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateProfileDialogProps {
  userId: string;
  currentProfile: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
  onUpdate: (data: { email?: string; phone?: string }) => void;
  trigger?: React.ReactNode;
}

export function UpdateProfileDialog({
  currentProfile,
  onUpdate,
  trigger,
}: UpdateProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(currentProfile.email);
  const [phone, setPhone] = useState(currentProfile.phone);

  const handleSubmit = () => {
    const updates: { email?: string; phone?: string } = {};
    if (email !== currentProfile.email) updates.email = email;
    if (phone !== currentProfile.phone) updates.phone = phone;

    if (Object.keys(updates).length === 0) {
      toast.info("No changes to update");
      return;
    }

    onUpdate(updates);
    toast.success("Profile updated successfully");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Update Profile
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update User Profile</AlertDialogTitle>
          <AlertDialogDescription>
            Update limited profile fields for {currentProfile.firstName}{" "}
            {currentProfile.lastName}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Profile</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
