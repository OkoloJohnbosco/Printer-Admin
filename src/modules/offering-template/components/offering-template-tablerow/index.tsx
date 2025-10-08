"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductTemplate } from "@/lib/hooks/admin/use-get-all-product-templates";
import { Edit, MoreVertical, Trash2 } from "lucide-react";

export default function OfferingTemplateTableRow({
  template,
}: {
  template: ProductTemplate;
}) {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{template.name}</TableCell>
      <TableCell className="text-muted-foreground">
        {template.subCategoryId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {template.specifications?.moq}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {Object.keys(template?.specifications)?.length}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Offering Template
            </DropdownMenuItem>

            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Offering Template
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
