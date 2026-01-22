"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetUserStatsParams,
  GetUserStatsResponse,
} from "./use-get-user-stats.types";

const useGetUserStats = (params: GetUserStatsParams) => {
  return useQueryActionHook<GetUserStatsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_STATS(params),
    queryKey: [
      QUERYKEYS.GET_USER_STATS,
      `${params.startDate}`,
      `${params.endDate}`,
    ],
  });
};

export default useGetUserStats;
