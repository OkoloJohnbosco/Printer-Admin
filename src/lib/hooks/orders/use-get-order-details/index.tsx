"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { isOrderReference } from "@/lib/resource-reference";
import useQueryActionHook from "../../api/use-queryaction";
import { GetOrderDetailsResponse } from "./use-get-order-details.types";

const useGetOrderDetails = (orderIdOrReference: string) => {
  const isReference = isOrderReference(orderIdOrReference);

  return useQueryActionHook<GetOrderDetailsResponse>({
    method: "get",
    endpoint: isReference
      ? ENDPOINTS.GET_ORDER_BY_REFERENCE(orderIdOrReference)
      : ENDPOINTS.GET_ORDER_BY_ID(orderIdOrReference),
    queryKey: [QUERYKEYS.GET_ORDER_BY_ID, orderIdOrReference],
    enabled: !!orderIdOrReference,
  });
};

export default useGetOrderDetails;
