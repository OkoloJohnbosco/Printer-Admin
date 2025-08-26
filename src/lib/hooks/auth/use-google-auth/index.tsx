import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "@/lib/hooks/api/use-queryaction.tsx";
import { GoogleAuthResponse } from "./use-google-auth.types";

const useGoogleAuth = (callBackURL: string) => {
  return useQueryActionHook<GoogleAuthResponse>({
    method: "get",
    enabled: false,
    endpoint: ENDPOINTS.GOOGLE_AUTH(callBackURL),
    queryKey: [QUERYKEYS.GOOGLE_AUTH, callBackURL],
  });
};

export default useGoogleAuth;
