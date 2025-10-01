import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateProductSubCategory = (subCategoryId: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_PRODUCT_SUB_CATEGORY_BY_ID(subCategoryId),
    message: "Sub-Category updated successfully",
  });
};

export default useUpdateProductSubCategory;
