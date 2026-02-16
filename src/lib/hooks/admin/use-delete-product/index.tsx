import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useDeleteProduct = (productId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_PRODUCT_BY_ID(productId),
  });
};

export default useDeleteProduct;
