import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

export interface ProductCategoryResponse {
  data: ProductCategory[];
}
export interface ProductCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
}

const useGetProductCategories = () => {
  return useQueryActionHook<ProductCategoryResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PRODUCT_CATEGORIES,
    queryKey: [QUERYKEYS.GET_ALL_PRODUCT_CATEGORIES],
  });
};

export default useGetProductCategories;
