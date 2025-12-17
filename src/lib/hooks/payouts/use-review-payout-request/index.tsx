import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useReviewPayoutRequest = (orderId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.REVIEW_PAYOUT_REQUEST(orderId),
    message: "Payout request reviewed successfully",
  });
};

export default useReviewPayoutRequest;
