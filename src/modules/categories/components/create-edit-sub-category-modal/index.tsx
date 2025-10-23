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
import useCreateProductSubCategory from "@/lib/hooks/admin/use-create-product-sub-category";
import { ProductSubCategory } from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import useUpdateProductSubCategory from "@/lib/hooks/admin/use-update-product-sub-category";
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

export default function CreateEditSubCategoryModal({
  isOpen,
  onClose,
  subCategory,
  categoryId,
}: ModalProps & { subCategory?: ProductSubCategory; categoryId: string }) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: subCategory?.name ?? "",
      description: subCategory?.description ?? "",
    },
  });

  const createSubCategory = useCreateProductSubCategory();
  const updateSubCategory = useUpdateProductSubCategory(subCategory?.id ?? "");
  const toggleSubCategory = subCategory ? updateSubCategory : createSubCategory;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toggleSubCategory
      .mutateAsync({
        name: data.name,
        categoryId,
      })
      .then(() => {
        queryClient
          .invalidateQueries({
            queryKey: [QUERYKEYS.GET_ALL_PRODUCT_SUB_CATEGORIES, categoryId],
          })
          .then(() => {
            form.reset();
            onClose();
          });
      });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {subCategory ? "Edit Sub-Category" : "Create New Sub-Category"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {subCategory
              ? "Update the sub-category details below."
              : "Add a new sub-category to organize your products."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-Category Name </FormLabel>
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
                  <FormLabel>Sub-Category Description</FormLabel>
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
            <AlertDialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={toggleSubCategory.isPending}>
                {subCategory ? "Update" : "Create"} Sub-Category
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
