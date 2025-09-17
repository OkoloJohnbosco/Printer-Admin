import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useCreateProductTemplate = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_PRODUCT_TEMPLATE,
  });
};

export default useCreateProductTemplate;
