"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetDashboardStatsParams,
  GetDashboardStatsResponse,
} from "./use-get-dashboard-stats.types";

const useGetDashboardStats = (params: GetDashboardStatsParams) => {
  return useQueryActionHook<GetDashboardStatsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_DASHBOARD_STATS(params),
    queryKey: [
      QUERYKEYS.GET_DASHBOARD_STATS,
      `${params.startDate}`,
      `${params.endDate}`,
    ],
  });
};

export default useGetDashboardStats;
