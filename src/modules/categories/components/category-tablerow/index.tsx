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
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import React from "react";
import CreateEditCategoryModal from "../create-edit-category-modal";
import DeleteCategoryModal from "../delete-category-modal";

export default function CategoryTableRow({
  category,
}: {
  category: ProductCategory;
}) {
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

  return (
    <React.Fragment key={category.id}>
      <TableRow className="hover:bg-muted/50">
        <TableCell className="font-medium">{category.name}</TableCell>
        <TableCell className="text-muted-foreground">
          {category?.description ?? "--"}
        </TableCell>
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
      <CreateEditCategoryModal
        isOpen={isOpenEditingCategory}
        onClose={onCloseEditingCategory}
        category={category}
      />
      <DeleteCategoryModal
        isOpen={isOpenDeletingCategory}
        onClose={onCloseDeletingCategory}
        categoryId={category.id}
      />
    </React.Fragment>
  );
}
