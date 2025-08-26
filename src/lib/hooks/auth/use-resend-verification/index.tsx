import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import { IResendVerificationReqBody } from "./use-resend-verification.types";

const useResendVerification = () => {
  return useCustomMutation<Record<string, unknown>, IResendVerificationReqBody>(
    {
      method: "post",
      endpoint: ENDPOINTS.AUTH_RESEND_VERIFICATION,
    },
  );
};

export default useResendVerification;
