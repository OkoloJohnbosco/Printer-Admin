"use client";

import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetDesignerRequestStatsParams,
  GetDesignerRequestStatsResponse,
} from "./use-get-designer-request-stats.types";

const useGetDesignerRequestStats = (params: GetDesignerRequestStatsParams) => {
  return useQueryActionHook<GetDesignerRequestStatsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_DESIGNER_REQUEST_STATS(params),
    queryKey: [
      QUERYKEYS.GET_DESIGNER_REQUEST_STATS,
      `${params.startDate}`,
      `${params.endDate}`,
    ],
  });
};

export default useGetDesignerRequestStats;
