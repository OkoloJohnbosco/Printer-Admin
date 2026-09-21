import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

export interface DiscountCode {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: string;
  minimumSubtotal: string;
  maxDiscountAmount: string | null;
  expiresAt: string | null;
  maxUses: number | null;
  maxUsesPerCustomer: number;
  status: "ACTIVE" | "INACTIVE";
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllDiscountCodesResponse {
  data: DiscountCode[];
  success: boolean;
}

const useGetAllDiscountCodes = (status?: "ACTIVE" | "INACTIVE") => {
  return useQueryActionHook<GetAllDiscountCodesResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_DISCOUNT_CODES(status),
    queryKey: [QUERYKEYS.GET_ALL_DISCOUNT_CODES, status],
  });
};

export default useGetAllDiscountCodes;
