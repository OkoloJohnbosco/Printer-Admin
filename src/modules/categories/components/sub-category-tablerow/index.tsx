"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductSubCategory } from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import CreateEditSubCategoryModal from "../create-edit-sub-category-modal";
import DeleteSubCategoryModal from "../delete-sub-category-modal";

export default function SubCategoryTableRow({
  subCategory,
}: {
  subCategory: ProductSubCategory;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDeletingSubCategory,
    onOpen: onOpenDeletingSubCategory,
    onClose: onCloseDeletingSubCategory,
  } = useDisclosure();

  return (
    <TableRow key={subCategory.id} className="bg-muted/30 page-fade-in">
      <TableCell className="pl-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-px w-4" />
          <span className="text-sm">{subCategory.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {subCategory?.description ?? "--"}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onOpen}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Sub-Category
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onOpenDeletingSubCategory}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Sub-Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <CreateEditSubCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        subCategory={subCategory}
        categoryId={subCategory.productCategoryId}
      />
      <DeleteSubCategoryModal
        isOpen={isOpenDeletingSubCategory}
        onClose={onCloseDeletingSubCategory}
        subCategory={subCategory}
      />
    </TableRow>
  );
}
