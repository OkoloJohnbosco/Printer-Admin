"use client";

import type React from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import { formatStatusText } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface StatusUpdateDialogProps {
  currentStatus: string;
  onStatusUpdate: (newStatus: string, notes?: string) => void;
  trigger?: React.ReactNode;
}

export function StatusUpdateDialog({
  currentStatus,
  onStatusUpdate,
  trigger,
}: StatusUpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onStatusUpdate(status, notes);
    setOpen(false);
    setNotes("");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Update Status
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Update Status</AlertDialogTitle>
          <AlertDialogDescription>
            Change the status and add optional notes. Customer will be notified
            via email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="capitalize" id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(OrderStatus).map((status) => (
                  <SelectItem
                    className="capitalize"
                    key={status}
                    value={status}
                  >
                    {formatStatusText(status?.toLowerCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update & Notify</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
