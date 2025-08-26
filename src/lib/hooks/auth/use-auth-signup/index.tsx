import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import { ISignupReqBody } from "./use-auth-signup.types";

const useAuthSignup = () => {
  return useCustomMutation<Record<string, unknown>, ISignupReqBody>({
    method: "post",
    endpoint: ENDPOINTS.AUTH_SIGNUP,
  });
};

export default useAuthSignup;
