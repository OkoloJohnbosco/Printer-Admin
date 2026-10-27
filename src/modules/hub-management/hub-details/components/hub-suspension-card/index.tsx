"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { HubStatus, PrintHub } from "@/lib/hooks/admin/use-get-all-hubs";
import useUpdateHubSuspension from "@/lib/hooks/admin/use-update-hub-suspension";

const suspendSchema = z.object({
  reason: z.string().min(1, "Please provide a reason for suspension"),
});

type SuspendFormValues = z.infer<typeof suspendSchema>;

export default function HubSuspensionCard({
  hub,
  adminHubId,
}: {
  hub: PrintHub;
  /** Id from the hub details route — used for admin `/admin/hubs/:id/*` APIs (not `hub.userId`). */
  adminHubId: string;
}) {
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isUnsuspendModalOpen, setIsUnsuspendModalOpen] = useState(false);
  const updateHubSuspension = useUpdateHubSuspension(adminHubId);
  const isSuspended = hub.status === HubStatus.SUSPENDED;

  const form = useForm<SuspendFormValues>({
    resolver: zodResolver(suspendSchema),
    defaultValues: { reason: "" },
  });

  const handleSuspend = (values: SuspendFormValues) => {
    updateHubSuspension
      .mutateAsync({ suspended: true, reason: values.reason })
      .then(() => {
        setIsSuspendModalOpen(false);
        form.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnsuspend = () => {
    updateHubSuspension
      .mutateAsync({ suspended: false })
      .then(() => {
        setIsUnsuspendModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Suspension</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Current State</span>
          <Badge variant={isSuspended ? "rejected" : "approved"}>
            {isSuspended ? "Suspended" : "Active"}
          </Badge>
        </div>

        {isSuspended && hub.metadata.suspension.reason && (
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
            <p className="text-muted-foreground text-xs font-medium">
              Suspension reason
            </p>
            <p className="text-sm">{hub.metadata.suspension.reason}</p>
          </div>
        )}

        {isSuspended ? (
          <Button
            fullWidth
            variant="outline"
            onClick={() => setIsUnsuspendModalOpen(true)}
          >
            Unsuspend Hub
          </Button>
        ) : hub.status === HubStatus.APPROVED ? (
          <Button
            fullWidth
            variant="destructive"
            onClick={() => setIsSuspendModalOpen(true)}
          >
            Suspend Hub
          </Button>
        ) : (
          <p className="text-muted-foreground text-xs">
            Only approved hubs can be suspended.
          </p>
        )}
      </CardContent>

      {/* Suspend dialog (reason required) */}
      <AlertDialog
        open={isSuspendModalOpen}
        onOpenChange={(open) => {
          setIsSuspendModalOpen(open);
          if (!open) form.reset();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend Hub</AlertDialogTitle>
            <AlertDialogDescription>
              Suspending {hub.businessName} will make it unavailable to
              customers while keeping its data and offerings intact. This
              requires a reason.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSuspend)}>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain why this hub is being suspended..."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel
                  type="button"
                  disabled={updateHubSuspension.isPending}
                >
                  Cancel
                </AlertDialogCancel>
                <Button
                  type="submit"
                  variant="destructive"
                  isLoading={updateHubSuspension.isPending}
                >
                  Suspend Hub
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unsuspend confirmation */}
      <AlertDialog
        open={isUnsuspendModalOpen}
        onOpenChange={setIsUnsuspendModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsuspend Hub</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore {hub.businessName}&apos;s visibility to
              customers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={updateHubSuspension.isPending}>
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleUnsuspend}
              isLoading={updateHubSuspension.isPending}
            >
              Unsuspend Hub
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
