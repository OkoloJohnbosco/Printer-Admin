import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetAllHubs = ({
  page,
  limit,
  status,
}: {
  page: number;
  limit: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_HUBS(page, limit, status),
    queryKey: [QUERYKEYS.GET_ALL_HUBS, `${page}`, `${limit}`, `${status}`],
  });
};

export default useGetAllHubs;
