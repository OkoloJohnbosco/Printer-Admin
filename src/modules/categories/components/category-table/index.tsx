"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryTableRow from "../category-tablerow";

interface SubCategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  subCategories: SubCategory[];
  expanded?: boolean;
}

export default function CategoryTable({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Products</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <CategoryTableRow key={category.id} category={category} />
        ))}
      </TableBody>
    </Table>
  );
}
