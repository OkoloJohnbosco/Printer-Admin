import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetProductCategoryById = ({ categoryId }: { categoryId: string }) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCT_CATEGORY_BY_ID(categoryId),
    queryKey: [QUERYKEYS.GET_PRODUCT_CATEGORY_BY_ID, `${categoryId}`],
  });
};

export default useGetProductCategoryById;
