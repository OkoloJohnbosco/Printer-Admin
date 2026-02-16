import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateProduct = (productId: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_PRODUCT_BY_ID(productId),
    showSuccessToast: false,
  });
};

export default useUpdateProduct;
