import TableSkeletonRowLoader, {
  EmptyTable,
} from "@/components/ui/table-row-skeleton";
import useGetProductSubCategories from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import React from "react";
import SubCategoryTableRow from "../sub-category-tablerow";

function SubCategoryTable({ categoryId }: { categoryId: string }) {
  const getProductSubCategories = useGetProductSubCategories(categoryId);
  const isLoading =
    getProductSubCategories.isLoading && !getProductSubCategories?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={5} noBody />;

    if (getProductSubCategories?.value?.data?.length === 0)
      return <EmptyTable length={5} />;

    return (
      <React.Fragment key={categoryId}>
        {getProductSubCategories?.value?.data?.map((subCategory) => (
          <SubCategoryTableRow key={subCategory.id} subCategory={subCategory} />
        ))}
      </React.Fragment>
    );
  };

  return <>{renderTableBody()}</>;
}

export default SubCategoryTable;
