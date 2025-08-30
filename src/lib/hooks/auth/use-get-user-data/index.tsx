import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "@/lib/hooks/api/use-queryaction";

const useGetUserData = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_DATA,
    queryKey: [QUERYKEYS.GET_USER_DATA],
  });
};

export default useGetUserData;
