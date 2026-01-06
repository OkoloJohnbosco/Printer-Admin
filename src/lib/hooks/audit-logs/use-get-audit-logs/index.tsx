"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetAuditLogsParams,
  GetAuditLogsResponse,
} from "./use-get-audit-logs.types";

const useGetAuditLogs = (params: GetAuditLogsParams) => {
  return useQueryActionHook<GetAuditLogsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_AUDIT_LOGS(params),
    queryKey: [
      QUERYKEYS.GET_AUDIT_LOGS,
      `${params.cursor}`,
      `${params.limit}`,
      `${params.actorId}`,
      `${params.action}`,
      `${params.startDate}`,
      `${params.endDate}`,
    ],
  });
};

export default useGetAuditLogs;
