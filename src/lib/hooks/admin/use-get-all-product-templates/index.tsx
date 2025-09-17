import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetProductTemplates = (subCategoryId = "") => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PRODUCT_TEMPLATES(subCategoryId),
    queryKey: [QUERYKEYS.GET_ALL_PRODUCT_TEMPLATES, subCategoryId],
  });
};

export default useGetProductTemplates;
