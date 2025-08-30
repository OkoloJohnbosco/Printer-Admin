import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetHubById = ({ hubId }: { hubId: string }) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_HUB_BY_ID(hubId),
    queryKey: [QUERYKEYS.GET_HUB_BY_ID, `${hubId}`],
  });
};

export default useGetHubById;
