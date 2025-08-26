import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import {
  IValidateResetTokenReqBody,
  IValidateResetTokenResponse,
} from "./use-validate-reset-token.types";

const useValidateResetToken = () => {
  return useCustomMutation<
    IValidateResetTokenResponse,
    IValidateResetTokenReqBody
  >({
    method: "post",
    endpoint: ENDPOINTS.AUTH_VALIDATE_RESET_TOKEN,
  });
};

export default useValidateResetToken;
