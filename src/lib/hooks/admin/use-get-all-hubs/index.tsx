import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetAllHubs = ({
  limit,
  cursor,
  status,
}: {
  limit: number;
  cursor: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
}) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_HUBS(cursor, limit, status),
    queryKey: [QUERYKEYS.GET_ALL_HUBS, `${cursor}`, `${limit}`, `${status}`],
  });
};

export default useGetAllHubs;
