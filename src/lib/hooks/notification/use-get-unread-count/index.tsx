import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { UnreadCountResponse } from "./use-get-unread-count.types";

const useGetUnreadNotificationCount = () => {
  return useQueryActionHook<UnreadCountResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_UNREAD_NOTIFICATION_COUNT,
    queryKey: [QUERYKEYS.GET_UNREAD_NOTIFICATION_COUNT],
  });
};

export default useGetUnreadNotificationCount;
