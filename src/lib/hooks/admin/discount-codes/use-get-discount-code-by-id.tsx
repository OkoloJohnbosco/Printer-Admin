import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { DiscountCode } from "./use-get-all-discount-codes";

export interface GetDiscountCodeByIdResponse {
  data: DiscountCode;
  success: boolean;
}

const useGetDiscountCodeById = (id: string) => {
  return useQueryActionHook<GetDiscountCodeByIdResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_DISCOUNT_CODE_BY_ID(id),
    queryKey: [QUERYKEYS.GET_DISCOUNT_CODE_BY_ID, id],
    enabled: !!id,
  });
};

export default useGetDiscountCodeById;
