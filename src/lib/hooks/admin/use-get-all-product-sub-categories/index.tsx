import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetProductSubCategories = (categoryId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PRODUCT_SUB_CATEGORIES(categoryId),
    queryKey: [QUERYKEYS.GET_ALL_PRODUCT_SUB_CATEGORIES],
  });
};

export default useGetProductSubCategories;
