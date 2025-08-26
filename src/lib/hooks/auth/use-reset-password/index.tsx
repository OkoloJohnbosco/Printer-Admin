import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import { ResetPasswordReqBody } from "./use-reset-password.types";

const useResetPassword = () => {
  return useCustomMutation<Record<string, unknown>, ResetPasswordReqBody>({
    method: "post",
    endpoint: ENDPOINTS.AUTH_RESET_PASSWORD,
  });
};

export default useResetPassword;
