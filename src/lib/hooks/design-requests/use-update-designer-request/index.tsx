"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../../api/use-mutationaction";
import { DesignerRequestStatus } from "../use-get-all-designer-requests/use-get-all-designer-requests.types";

const useUpdateDesignerRequest = (requestId: string) => {
  const queryClient = useQueryClient();
  return useCustomMutation<
    Record<string, unknown>,
    {
      status: DesignerRequestStatus;
      deliverables?: string[];
      rejectionReason?: string;
    }
  >({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_DESIGNER_REQUEST(requestId),
    message: "Designer request updated successfully",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_ALL_DESIGNER_REQUESTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_DESIGNER_REQUEST_BY_ID],
      });
    },
  });
};

export default useUpdateDesignerRequest;
