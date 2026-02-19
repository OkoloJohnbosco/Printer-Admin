"use client";

import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { GetPayoutByIdResponse } from "./use-get-payout-by-id.types";

const useGetPayoutById = (payoutId: string) => {
  return useQueryActionHook<GetPayoutByIdResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_PAYOUT_BY_ID(payoutId),
    queryKey: [QUERYKEYS.GET_PAYOUT_BY_ID, payoutId],
  });
};

export default useGetPayoutById;
