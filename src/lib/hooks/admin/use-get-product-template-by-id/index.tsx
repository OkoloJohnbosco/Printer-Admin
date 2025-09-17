import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetProductTemplateById = (templateId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCT_TEMPLATE_BY_ID(templateId),
    queryKey: [QUERYKEYS.GET_PRODUCT_TEMPLATE_BY_ID, templateId],
    enabled: !!templateId,
  });
};

export default useGetProductTemplateById;
