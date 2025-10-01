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
import useGetProductCategories from "@/lib/hooks/admin/use-get-product-categories";
import CategoryTableRow from "../category-tablerow";

export default function CategoryTable() {
  const getProductCategories = useGetProductCategories();
  const isLoading =
    getProductCategories.isLoading && !getProductCategories?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={4} />;

    if (getProductCategories?.value?.data?.length === 0)
      return <EmptyTable length={5} />;

    return (
      <TableBody className="page-fade-in">
        {getProductCategories?.value?.data?.map((category) => (
          <CategoryTableRow key={category.id} category={category} />
        ))}
      </TableBody>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <>{renderTableBody()}</>
    </Table>
  );
}
