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
import useDeleteProductSubCategory from "@/lib/hooks/admin/use-delete-product-sub-category";
import { ProductSubCategory } from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import { useQueryClient } from "@tanstack/react-query";

function DeleteSubCategoryModal({
  isOpen,
  onClose,
  subCategory,
}: ModalProps & {
  subCategory: ProductSubCategory;
}) {
  const queryClient = useQueryClient();
  const deleteSubCategory = useDeleteProductSubCategory(subCategory.id);

  const handleDeleteSubCategory = () => {
    deleteSubCategory
      .mutateAsync({})
      .then(() => {
        queryClient
          .invalidateQueries({
            queryKey: [
              QUERYKEYS.GET_ALL_PRODUCT_SUB_CATEGORIES,
              subCategory.productCategoryId,
            ],
          })
          .then(() => {
            onClose();
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent onEscapeKeyDown={() => null} className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Sub-Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this sub-category?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteSubCategory}
            isLoading={deleteSubCategory.isPending}
          >
            Delete Sub-Category
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteSubCategoryModal;
