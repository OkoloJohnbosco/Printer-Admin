"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  ModalProps,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { QUERYKEYS } from "@/lib/endpoints";
import useDeleteProduct from "@/lib/hooks/admin/use-delete-product";
import { Product } from "@/lib/hooks/admin/use-get-all-products";
import { useQueryClient } from "@tanstack/react-query";

function DeleteProductModal({
  isOpen,
  onClose,
  product,
}: ModalProps & {
  product: Product;
}) {
  const queryClient = useQueryClient();
  const deleteProduct = useDeleteProduct(product.id);
  const handleDeleteProduct = () => {
    deleteProduct.mutateAsync({}).then(() => {
      queryClient
        .invalidateQueries({
          queryKey: [QUERYKEYS.GET_ALL_PRODUCTS],
        })
        .then(() => {
          onClose();
        });
    });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent onEscapeKeyDown={() => null} className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong className="text-brand-primary">{product.name}</strong>{" "}
            product?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteProduct}
            isLoading={deleteProduct.isPending}
          >
            Delete Product
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProductModal;
