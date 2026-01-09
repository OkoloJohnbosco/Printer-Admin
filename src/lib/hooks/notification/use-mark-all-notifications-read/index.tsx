import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../../api/use-mutationaction";
import { MarkAllNotificationsReadResponse } from "./use-mark-all-notifications-read.types";

const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useCustomMutation<MarkAllNotificationsReadResponse>({
    method: "post",
    endpoint: ENDPOINTS.MARK_ALL_NOTIFICATIONS_AS_READ,
    message: "All notifications marked as read",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_UNREAD_NOTIFICATION_COUNT],
      });
    },
  });
};

export default useMarkAllNotificationsRead;
