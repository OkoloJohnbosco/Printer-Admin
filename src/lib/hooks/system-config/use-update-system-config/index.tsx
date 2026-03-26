import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateSystemConfig = (configId: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_SYSTEM_CONFIG(configId),
    message: "System config updated successfully",
  });
};

export default useUpdateSystemConfig;
