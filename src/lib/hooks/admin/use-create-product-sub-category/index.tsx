import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useCreateProductSubCategory = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_PRODUCT_SUB_CATEGORY,
    message: "Sub-Category created successfully",
  });
};

export default useCreateProductSubCategory;
