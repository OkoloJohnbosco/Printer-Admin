import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

export interface ProductSubCategoryResponse {
  data: ProductSubCategory[];
}
export interface ProductSubCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  productCategoryId: string;
}

const useGetProductSubCategories = (categoryId = "") => {
  return useQueryActionHook<ProductSubCategoryResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PRODUCT_SUB_CATEGORIES(categoryId),
    queryKey: [QUERYKEYS.GET_ALL_PRODUCT_SUB_CATEGORIES, categoryId],
  });
};

export default useGetProductSubCategories;
