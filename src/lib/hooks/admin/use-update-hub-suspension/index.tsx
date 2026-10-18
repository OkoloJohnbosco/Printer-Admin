import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateHubSuspension = (hubId: string) => {
  const queryClient = useQueryClient();
  return useCustomMutation<
    Record<string, unknown>,
    {
      suspended: boolean;
      reason?: string;
    }
  >({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_HUB_SUSPENSION(hubId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_HUB_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_ALL_HUBS],
      });
    },
  });
};

export default useUpdateHubSuspension;
