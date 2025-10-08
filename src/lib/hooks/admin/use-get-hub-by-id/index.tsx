import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { PrintHub } from "../use-get-all-hubs";

export interface UseGetHubByIdResponse {
  data: PrintHub;
  status: boolean;
}

const useGetHubById = (hubId: string) => {
  return useQueryActionHook<UseGetHubByIdResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_HUB_BY_ID(hubId),
    queryKey: [QUERYKEYS.GET_HUB_BY_ID, `${hubId}`],
  });
};

export default useGetHubById;
