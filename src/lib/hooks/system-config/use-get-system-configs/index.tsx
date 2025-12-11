"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { SystemConfigResponse } from "./use-get-system-configs.types";

const useGetSystemConfigs = () => {
  return useQueryActionHook<SystemConfigResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_SYSTEM_CONFIG,
    queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG],
  });
};

export default useGetSystemConfigs;
