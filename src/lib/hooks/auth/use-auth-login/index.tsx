import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import { ILoginReqBody, ILoginResponse } from "./use-auth-login.types";

const useAuthLogin = () => {
  return useCustomMutation<ILoginResponse, ILoginReqBody>({
    method: "post",
    endpoint: ENDPOINTS.AUTH_LOGIN,
  });
};

export default useAuthLogin;
