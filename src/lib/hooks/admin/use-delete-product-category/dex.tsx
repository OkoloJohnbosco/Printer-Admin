import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useDeleteProductCategory = (categoryId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_PRODUCT_CATEGORY_BY_ID(categoryId),
    message: "Category deleted successfully",
  });
};

export default useDeleteProductCategory;
