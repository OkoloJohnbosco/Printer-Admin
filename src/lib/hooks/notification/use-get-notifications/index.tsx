import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  NotificationsResponse,
  UseGetNotificationsParams,
} from "./use-get-notifications.types";

const useGetNotifications = ({
  limit = 20,
  cursor,
}: UseGetNotificationsParams = {}) => {
  return useQueryActionHook<NotificationsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_NOTIFICATIONS(limit, cursor),
    queryKey: [QUERYKEYS.GET_NOTIFICATIONS, String(limit), cursor || "initial"],
  });
};

export default useGetNotifications;
