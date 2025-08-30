import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateVerificationStatus = (hubId: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_VERIFICATION_STATUS(hubId),
  });
};

export default useUpdateVerificationStatus;
