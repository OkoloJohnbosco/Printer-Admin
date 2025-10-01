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
import useDeleteProductCategory from "@/lib/hooks/admin/use-delete-product-category/dex";
import { useQueryClient } from "@tanstack/react-query";

function DeleteCategoryModal({
  isOpen,
  onClose,
  categoryId,
}: ModalProps & {
  categoryId: string;
}) {
  const queryClient = useQueryClient();
  const deleteCategory = useDeleteProductCategory(categoryId);
  const handleDeleteCategory = () => {
    deleteCategory.mutateAsync({}).then(() => {
      queryClient
        .invalidateQueries({
          queryKey: [QUERYKEYS.GET_ALL_PRODUCT_CATEGORIES],
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
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this category?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteCategory}
            isLoading={deleteCategory.isPending}
          >
            Delete Category
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategoryModal;
