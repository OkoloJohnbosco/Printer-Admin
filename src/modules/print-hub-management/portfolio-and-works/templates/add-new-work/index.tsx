"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  ModalProps,
} from "@/components/ui/alert-dialog";
import Heading from "@/components/ui/heading";
import AddNewWorkForm from "./add-new-work-form";

export default function AddnewWorkFormModal({ isOpen, onClose }: ModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-full bg-brand-gray-500 max-h-[88vh] pb-0 overflow-auto pt-0 scroll-smooth space-y-4 border-0 px-0 shadow-none sm:max-w-3xl">
        <AlertDialogHeader className="space-y-4 bg-brand-gray-500 sticky top-0 z-10 pt-3 text-left border-b ">
          <AlertDialogTitle className="sr-only">Coming Soon</AlertDialogTitle>
          <Heading size="h6" className="px-4">
            Add new Work
          </Heading>
          <AlertDialogDescription className="sr-only">
            Add new Work
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddNewWorkForm onClose={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
