import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useCreateProduct = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_PRODUCT,
    showSuccessToast: false,
  });
};

export default useCreateProduct;
