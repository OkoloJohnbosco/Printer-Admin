import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetProductCategories = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PRODUCT_CATEGORIES,
    queryKey: [QUERYKEYS.GET_ALL_PRODUCT_CATEGORIES],
  });
};

export default useGetProductCategories;
