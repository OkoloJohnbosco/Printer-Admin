"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetDeliveryPriceConfig = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_DELIVERY_PRICE_CONFIG,
    queryKey: [QUERYKEYS.GET_DELIVERY_PRICE_CONFIG],
  });
};

export default useGetDeliveryPriceConfig;
