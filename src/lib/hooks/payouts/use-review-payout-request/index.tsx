import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useReviewPayoutRequest = (orderId: string) => {
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
  });
};

export default useReviewPayoutRequest;
