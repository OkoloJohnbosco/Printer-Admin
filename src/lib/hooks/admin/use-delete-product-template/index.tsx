import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useDeleteProductTemplate = (templateId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_PRODUCT_TEMPLATE_BY_ID(templateId),
  });
};

export default useDeleteProductTemplate;
