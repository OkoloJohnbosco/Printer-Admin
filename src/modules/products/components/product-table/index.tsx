"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader, {
  EmptyTable,
} from "@/components/ui/table-row-skeleton";
import useGetAllProducts from "@/lib/hooks/admin/use-get-all-products";
import ProductTableRow from "../product-tablerow";

export default function ProductTable({ categoryId }: { categoryId?: string }) {
  const getProducts = useGetAllProducts(categoryId);
  const isLoading = getProducts.isLoading && !getProducts?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={4} noOfRows={8} />;

    if (getProducts?.value?.data?.length === 0)
      return <EmptyTable length={4} message="No products found" />;

    return (
      <TableBody className="page-fade-in">
        {getProducts?.value?.data?.map((product) => (
          <ProductTableRow key={product.id} product={product} />
        ))}
      </TableBody>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Specifications</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <>{renderTableBody()}</>
    </Table>
  );
}
