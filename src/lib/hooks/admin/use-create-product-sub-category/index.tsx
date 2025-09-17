import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useCreateProductSubCategory = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_PRODUCT_SUB_CATEGORY,
  });
};

export default useCreateProductSubCategory;
