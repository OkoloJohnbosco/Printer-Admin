"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

const useGetSystemConfigs = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SYSTEM_CONFIG,
    queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG],
  });
};

export default useGetSystemConfigs;
