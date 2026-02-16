"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Product } from "@/lib/hooks/admin/use-get-all-products";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import routes from "@/routes";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteProductModal from "../delete-product";

export default function ProductTableRow({ product }: { product: Product }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`${routes.PRODUCTS}/${product.id}`);
  };

  const handleEditProduct = () => {
    router.push(`${routes.PRODUCTS}/${product.id}/edit`);
  };

  return (
    <>
      <TableRow className="hover:bg-muted/50">
        <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell className="text-muted-foreground max-w-[300px] truncate">
          {product.description || "--"}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {Object.keys(product?.specifications || {}).length}
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewProduct}>
                <Eye className="mr-2 h-4 w-4" />
                View Product
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleEditProduct}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </DropdownMenuItem>

              <DropdownMenuItem className="text-destructive" onClick={onOpen}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <DeleteProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
}
