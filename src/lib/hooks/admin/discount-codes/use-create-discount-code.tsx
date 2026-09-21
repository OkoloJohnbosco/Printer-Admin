import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

export interface CreateDiscountCodePayload {
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minimumSubtotal?: number;
  maxDiscountAmount?: number;
  expiresAt?: string;
  maxUses?: number;
  maxUsesPerCustomer?: number;
}

const useCreateDiscountCode = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_DISCOUNT_CODE,
    message: "Discount code created successfully",
  });
};

export default useCreateDiscountCode;
