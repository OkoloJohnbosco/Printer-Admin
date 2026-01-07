import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../../api/use-mutationaction";

const useReviewPayoutRequest = (orderId: string) => {
  const queryClient = useQueryClient();
  return useCustomMutation<
    Record<string, unknown>,
    {
      status: "APPROVED" | "REJECTED";
      rejectionReason?: string;
    }
  >({
    method: "post",
    endpoint: ENDPOINTS.REVIEW_PAYOUT_REQUEST(orderId),
    message: "Payout request reviewed successfully",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_ALL_PAYOUTS],
      });
    },
  });
};

export default useReviewPayoutRequest;
