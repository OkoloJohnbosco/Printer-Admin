import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import { ChangePasswordReqBody } from "./use-change-password.types";

const useChangePassword = () => {
  return useCustomMutation<Record<string, unknown>, ChangePasswordReqBody>({
    method: "patch",
    endpoint: ENDPOINTS.AUTH_CHANGE_PASSWORD,
    message: "Password changed successfully",
  });
};

export default useChangePassword;
