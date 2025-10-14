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
import useDeleteProductTemplate from "@/lib/hooks/admin/use-delete-product-template";
import { ProductTemplate } from "@/lib/hooks/admin/use-get-all-product-templates";
import { useQueryClient } from "@tanstack/react-query";

function DeleteOfferingTemplateModal({
  isOpen,
  onClose,
  template,
}: ModalProps & {
  template: ProductTemplate;
}) {
  const queryClient = useQueryClient();
  const deleteCategory = useDeleteProductTemplate(template.id);
  const handleDeleteCategory = () => {
    deleteCategory.mutateAsync({}).then(() => {
      queryClient
        .invalidateQueries({
          queryKey: [
            QUERYKEYS.GET_ALL_PRODUCT_TEMPLATES,
            template.subCategoryId,
          ],
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
          <AlertDialogTitle>Delete Offering Template</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong className="text-brand-primary">{template.name}</strong>{" "}
            offering template?
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
            Delete Offering Template
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteOfferingTemplateModal;
