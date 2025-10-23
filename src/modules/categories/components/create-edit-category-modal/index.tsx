"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  ModalProps,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QUERYKEYS } from "@/lib/endpoints";
import useCreateProductCategories from "@/lib/hooks/admin/use-create-product-categories";
import { ProductCategory } from "@/lib/hooks/admin/use-get-product-categories";
import useUpdateProductCategory from "@/lib/hooks/admin/use-update-product-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  name: z
    .string({ error: "Category name is required" })
    .min(1, "Category name is required"),
  description: z
    .string({ error: "Category description is required" })
    .min(1, "Category description is required"),
});

export default function CreateEditCategoryModal({
  isOpen,
  onClose,
  category,
}: ModalProps & { category?: ProductCategory }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
    },
  });
  const queryClient = useQueryClient();

  const createCategory = useCreateProductCategories();
  const updateCategory = useUpdateProductCategory(category?.id ?? "");
  const toggleCategory = category ? updateCategory : createCategory;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toggleCategory
      .mutateAsync(data)
      .then(() => {
        queryClient
          .invalidateQueries({
            queryKey: [QUERYKEYS.GET_ALL_PRODUCT_CATEGORIES],
          })
          .then(() => {
            form.reset();
            onClose();
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {category ? "Edit Category" : "Create New Category"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {category
              ? "Update the category details below."
              : "Add a new category to organize your products."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Apparel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this category..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={toggleCategory.isPending}>
                {category ? "Update" : "Create"} Category
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
