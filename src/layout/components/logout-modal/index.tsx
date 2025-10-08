"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  ModalProps,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { QUERYKEYS } from "@/lib/endpoints";
import { logout } from "@/services/api/api.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function LogoutModal({ isOpen, onClose }: ModalProps) {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // The logout function will handle the redirect to /auth/login
      queryClient
        .invalidateQueries({
          queryKey: [QUERYKEYS.GET_USER_DATA],
        })
        .then(() => {
          onClose();
        });
    },
  });

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent onEscapeKeyDown={onClose} className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Log Out</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will sign you out of your account
            and remove your data from your cache.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-2">
          <AlertDialogAction onClick={onClose}>Cancel</AlertDialogAction>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutateAsync()}
            isLoading={logoutMutation.isPending}
          >
            Log out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutModal;
