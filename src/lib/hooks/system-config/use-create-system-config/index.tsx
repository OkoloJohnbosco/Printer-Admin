import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useCreateSystemConfig = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_SYSTEM_CONFIG,
    message: "System config created successfully",
  });
};

export default useCreateSystemConfig;
