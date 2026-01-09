import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../../api/use-mutationaction";
import { MarkNotificationReadResponse } from "./use-mark-notification-read.types";

const useMarkNotificationRead = (notificationId: string) => {
  const queryClient = useQueryClient();

  return useCustomMutation<MarkNotificationReadResponse>({
    method: "patch",
    endpoint: ENDPOINTS.MARK_NOTIFICATION_AS_READ(notificationId),
    showSuccessToast: false,
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

export default useMarkNotificationRead;
