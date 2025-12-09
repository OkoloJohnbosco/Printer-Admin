import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useDeleteSystemConfig = (configId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_SYSTEM_CONFIG(configId),
    message: "System config deleted successfully",
  });
};

export default useDeleteSystemConfig;
