"use client";

import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { SystemConfigCatalogResponse } from "./use-get-system-config-catalog.types";

const useGetSystemConfigCatalog = () => {
  return useQueryActionHook<SystemConfigCatalogResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_SYSTEM_CONFIG_CATALOG,
    queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG_CATALOG],
  });
};

export default useGetSystemConfigCatalog;
