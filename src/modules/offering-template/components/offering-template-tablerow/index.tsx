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
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import routes from "@/routes";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteOfferingTemplateModal from "../delete-offering-template";

export default function OfferingTemplateTableRow({
  template,
}: {
  template: ProductTemplate;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  const handleViewTemplate = () => {
    router.push(`${routes.TEMPLATES}/${template.id}`);
  };

  const handleEditTemplate = () => {
    // TODO: Navigate to edit template page or open edit modal
    console.log("Edit template:", template.id);
  };
  return (
    <>
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
              <DropdownMenuItem onClick={handleViewTemplate}>
                <Eye className="mr-2 h-4 w-4" />
                View Template
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleEditTemplate}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Offering Template
              </DropdownMenuItem>

              <DropdownMenuItem className="text-destructive" onClick={onOpen}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Offering Template
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <DeleteOfferingTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        template={template}
      />
    </>
  );
}
