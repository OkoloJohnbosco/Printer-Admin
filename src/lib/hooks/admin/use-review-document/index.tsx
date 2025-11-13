import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useReviewDocument = (documentId: string) => {
  return useCustomMutation<
    Record<string, unknown>,
    {
      status: string;
      rejectionReason: string;
    }
  >({
    method: "post",
    endpoint: ENDPOINTS.REVIEW_HUB_DOCUMENT(documentId),
    showSuccessToast: false,
  });
};

export default useReviewDocument;
