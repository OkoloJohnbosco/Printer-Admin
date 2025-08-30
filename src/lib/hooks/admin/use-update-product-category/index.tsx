import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateProductCategory = (categoryId: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_PRODUCT_CATEGORY_BY_ID(categoryId),
  });
};

export default useUpdateProductCategory;
