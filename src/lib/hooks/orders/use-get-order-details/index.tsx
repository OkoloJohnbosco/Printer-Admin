"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetOrderDetails = (orderId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ORDER_BY_ID(orderId),
    queryKey: [QUERYKEYS.GET_ORDER_BY_ID, orderId],
  });
};

export default useGetOrderDetails;
