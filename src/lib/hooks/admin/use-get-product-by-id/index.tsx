import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { Product } from "../use-get-all-products";

export interface ProductByIdResponse {
  data: Product;
  success: boolean;
}

const useGetProductById = (productId: string) => {
  return useQueryActionHook<ProductByIdResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCT_BY_ID(productId),
    queryKey: [QUERYKEYS.GET_PRODUCT_BY_ID, productId],
    enabled: !!productId,
  });
};

export default useGetProductById;
