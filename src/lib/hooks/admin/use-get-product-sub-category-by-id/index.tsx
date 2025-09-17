import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetProductSubCategoryById = (subCategoryId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCT_SUB_CATEGORY_BY_ID(subCategoryId),
    queryKey: [QUERYKEYS.GET_PRODUCT_SUB_CATEGORY_BY_ID, `${subCategoryId}`],
  });
};

export default useGetProductSubCategoryById;
