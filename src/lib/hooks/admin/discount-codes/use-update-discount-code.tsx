import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

export interface UpdateDiscountCodePayload {
  status?: "ACTIVE" | "INACTIVE";
  expiresAt?: string;
  maxUses?: number;
  maxUsesPerCustomer?: number;
}

const useUpdateDiscountCode = (id: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_DISCOUNT_CODE(id),
    message: "Discount code updated successfully",
  });
};

export default useUpdateDiscountCode;
