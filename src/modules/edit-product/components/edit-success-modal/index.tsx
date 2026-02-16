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

interface EditSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAnother: () => void;
  productName: string;
  productId: string;
}

function EditSuccessModal({
  isOpen,
  onClose,
  onCreateAnother,
  productName,
  productId,
}: EditSuccessModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-md" onEscapeKeyDown={onClose}>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <AlertDialogTitle>Product Updated Successfully!</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Your product &quot;{productName}&quot; has been updated and changes
            are now live for all print hubs.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h4 className="mb-2 font-medium text-green-800">
              What&apos;s next?
            </h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>&bull; Print hubs can now use the updated product</li>
              <li>
                &bull; View the updated product details or continue editing
              </li>
              <li>&bull; Create a new product based on this one</li>
            </ul>
          </div>
        </div>

        <AlertDialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onCreateAnother}
            className="flex-1"
          >
            <Link href={routes.PRODUCTS_NEW}>Create New Product</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href={`${routes.PRODUCTS}/${productId}`} replace>
              View Product
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EditSuccessModal;
