import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import {
  IVerifyEmailResponse,
  VerifyEmailReqBody,
} from "./use-verify-email.types";

const useVerifyResetPasswordOTP = () => {
  return useCustomMutation<IVerifyEmailResponse, VerifyEmailReqBody>({
    method: "post",
    endpoint: ENDPOINTS.AUTH_VERIFY_RESET_PASSWORD_OTP,
    message: "Otp verified successfully",
  });
};

export default useVerifyResetPasswordOTP;
