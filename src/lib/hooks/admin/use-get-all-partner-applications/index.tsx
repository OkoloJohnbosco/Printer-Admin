"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetAllPartnerApplicationsParams,
  GetAllPartnerApplicationsResponse,
} from "./use-get-all-partner-applications.types";

const useGetAllPartnerApplications = (
  params: GetAllPartnerApplicationsParams,
) => {
  return useQueryActionHook<GetAllPartnerApplicationsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PARTNER_APPLICATIONS(params),
    queryKey: [
      QUERYKEYS.GET_ALL_PARTNER_APPLICATIONS,
      `${params.cursor}`,
      `${params.limit}`,
      `${params.search}`,
    ],
  });
};

export default useGetAllPartnerApplications;
