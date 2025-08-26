import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import { IForgotPasswordReqBody } from "./use-forgot-password.types";

const useForgotPassword = () => {
  return useCustomMutation<Record<string, unknown>, IForgotPasswordReqBody>({
    method: "post",
    endpoint: ENDPOINTS.AUTH_FORGOT_PASSWORD,
  });
};

export default useForgotPassword;
