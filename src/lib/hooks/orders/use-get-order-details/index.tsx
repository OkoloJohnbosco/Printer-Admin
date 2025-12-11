"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { GetOrderDetailsResponse } from "./use-get-order-details.types";

const useGetOrderDetails = (orderId: string) => {
  return useQueryActionHook<GetOrderDetailsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ORDER_BY_ID(orderId),
    queryKey: [QUERYKEYS.GET_ORDER_BY_ID, orderId],
  });
};

export default useGetOrderDetails;
