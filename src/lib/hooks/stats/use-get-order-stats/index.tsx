"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetOrderStatsParams,
  GetOrderStatsResponse,
} from "./use-get-order-stats.types";

const useGetOrderStats = (params: GetOrderStatsParams) => {
  return useQueryActionHook<GetOrderStatsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ORDER_STATS(params),
    queryKey: [
      QUERYKEYS.GET_ORDER_STATS,
      `${params.startDate}`,
      `${params.endDate}`,
    ],
  });
};

export default useGetOrderStats;
