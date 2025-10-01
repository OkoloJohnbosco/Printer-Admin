import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useDeleteProductSubCategory = (subCategoryId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_PRODUCT_SUB_CATEGORY_BY_ID(subCategoryId),
    message: "Sub-Category deleted successfully",
  });
};

export default useDeleteProductSubCategory;
