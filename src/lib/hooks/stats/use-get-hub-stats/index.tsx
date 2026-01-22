"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetHubStatsParams,
  GetHubStatsResponse,
} from "./use-get-hub-stats.types";

const useGetHubStats = (params: GetHubStatsParams) => {
  return useQueryActionHook<GetHubStatsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_HUB_STATS(params),
    queryKey: [
      QUERYKEYS.GET_HUB_STATS,
      `${params.startDate}`,
      `${params.endDate}`,
    ],
  });
};

export default useGetHubStats;
