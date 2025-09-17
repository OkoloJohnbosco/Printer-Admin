import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateProductTemplate = (templateId: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_PRODUCT_TEMPLATE_BY_ID(templateId),
  });
};

export default useUpdateProductTemplate;
