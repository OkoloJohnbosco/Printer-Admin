"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetAllDesignerRequestsParams,
  GetAllDesignerRequestsResponse,
} from "./use-get-all-designer-requests.types";

const useGetAllDesignerRequests = (params: GetAllDesignerRequestsParams) => {
  return useQueryActionHook<GetAllDesignerRequestsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_DESIGNER_REQUESTS(params),
    queryKey: [
      QUERYKEYS.GET_ALL_DESIGNER_REQUESTS,
      `${params.cursor}`,
      `${params.limit}`,
      `${params.status}`,
    ],
  });
};

export default useGetAllDesignerRequests;
