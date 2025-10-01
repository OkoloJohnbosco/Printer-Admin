"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductCategory } from "@/lib/hooks/admin/use-get-product-categories";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  MoreVertical,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";
import CreateEditCategoryModal from "../create-edit-category-modal";
import CreateEditSubCategoryModal from "../create-edit-sub-category-modal";
import DeleteCategoryModal from "../delete-category-modal";
import SubCategoryTable from "../sub-category-table";

export default function CategoryTableRow({
  category,
}: {
  category: ProductCategory;
}) {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isOpenEditingCategory,
    onOpen: onOpenEditingCategory,
    onClose: onCloseEditingCategory,
  } = useDisclosure();
  const {
    isOpen: isOpenDeletingCategory,
    onOpen: onOpenDeletingCategory,
    onClose: onCloseDeletingCategory,
  } = useDisclosure();
  const {
    isOpen: isOpenCreatingSubCategory,
    onOpen: onOpenCreatingSubCategory,
    onClose: onCloseCreatingSubCategory,
  } = useDisclosure();

  return (
    <React.Fragment key={category.id}>
      <TableRow className="hover:bg-muted/50">
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onToggle}
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
        <TableCell className="font-medium">{category.name}</TableCell>
        <TableCell className="text-muted-foreground">{category.id}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onOpenEditingCategory}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Category
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenCreatingSubCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Sub-Category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onOpenDeletingCategory}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isOpen && (
        <SubCategoryTable key={category.id} categoryId={category.id} />
      )}
      <CreateEditCategoryModal
        isOpen={isOpenEditingCategory}
        onClose={onCloseEditingCategory}
        category={category}
      />
      <CreateEditSubCategoryModal
        isOpen={isOpenCreatingSubCategory}
        onClose={onCloseCreatingSubCategory}
        categoryId={category.id}
      />
      <DeleteCategoryModal
        isOpen={isOpenDeletingCategory}
        onClose={onCloseDeletingCategory}
        categoryId={category.id}
      />
    </React.Fragment>
  );
}
