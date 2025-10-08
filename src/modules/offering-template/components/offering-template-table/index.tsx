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
import useGetProductTemplates from "@/lib/hooks/admin/use-get-all-product-templates";
import OfferingTemplateTableRow from "../offering-template-tablerow";

export default function OfferingTemplateTable({
  subCategoryId,
}: {
  subCategoryId?: string;
}) {
  const getProductTemplates = useGetProductTemplates(subCategoryId);
  const isLoading =
    getProductTemplates.isLoading && !getProductTemplates?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={5} noOfRows={8} />;

    if (getProductTemplates?.value?.data?.length === 0)
      return <EmptyTable length={5} />;

    return (
      <TableBody className="page-fade-in">
        {getProductTemplates?.value?.data?.map((template) => (
          <OfferingTemplateTableRow key={template.id} template={template} />
        ))}
      </TableBody>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Template Name</TableHead>
          <TableHead> Sub-Category</TableHead>
          <TableHead>MOQ</TableHead>
          <TableHead>Specifications</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <>{renderTableBody()}</>
    </Table>
  );
}
