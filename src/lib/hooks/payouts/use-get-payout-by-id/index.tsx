"use client";

import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { isPayoutReference } from "@/lib/resource-reference";
import useQueryActionHook from "../../api/use-queryaction";
import { GetPayoutByIdResponse } from "./use-get-payout-by-id.types";

const useGetPayoutById = (payoutIdOrReference: string) => {
  const isReference = isPayoutReference(payoutIdOrReference);

  return useQueryActionHook<GetPayoutByIdResponse>({
    method: "get",
    endpoint: isReference
      ? ENDPOINTS.GET_PAYOUT_BY_REFERENCE(payoutIdOrReference)
      : ENDPOINTS.GET_PAYOUT_BY_ID(payoutIdOrReference),
    queryKey: [QUERYKEYS.GET_PAYOUT_BY_ID, payoutIdOrReference],
    enabled: !!payoutIdOrReference,
  });
};

export default useGetPayoutById;
