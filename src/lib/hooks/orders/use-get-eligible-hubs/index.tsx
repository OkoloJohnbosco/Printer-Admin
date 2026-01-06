"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { GetEligibleHubsResponse } from "./use-get-eligible-hubs.types";

const useGetEligibleHubs = (orderId: string) => {
  return useQueryActionHook<GetEligibleHubsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ELIGIBLE_HUBS(orderId),
    queryKey: [QUERYKEYS.GET_ELIGIBLE_HUBS, orderId],
    enabled: !!orderId,
  });
};

export default useGetEligibleHubs;
