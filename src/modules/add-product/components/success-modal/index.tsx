"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import routes from "@/routes";
import { Check } from "lucide-react";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAnother: () => void;
  productName: string;
}

function SuccessModal({
  isOpen,
  onClose,
  onCreateAnother,
  productName,
}: SuccessModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-md" onEscapeKeyDown={onClose}>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <AlertDialogTitle>Product Created Successfully!</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Your product &quot;{productName}&quot; has been created and is now
            available for print hubs to use.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h4 className="mb-2 font-medium text-green-800">
              What&apos;s next?
            </h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>
                &bull; Print hubs can now use this product to create offerings
              </li>
              <li>
                &bull; You can view and manage all products in the Products page
              </li>
              <li>&bull; Edit or duplicate this product anytime if needed</li>
            </ul>
          </div>
        </div>

        <AlertDialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onCreateAnother}
            className="flex-1"
          >
            Create Another Product
          </Button>
          <Button asChild className="flex-1">
            <Link href={routes.PRODUCTS}>View All Products</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SuccessModal;
