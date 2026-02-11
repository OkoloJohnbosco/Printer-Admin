"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { GetDesignerRequestByIdResponse } from "./use-get-designer-request-by-id.types";

const useGetDesignerRequestById = (requestId: string) => {
  return useQueryActionHook<GetDesignerRequestByIdResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_DESIGNER_REQUEST_BY_ID(requestId),
    queryKey: [QUERYKEYS.GET_DESIGNER_REQUEST_BY_ID, `${requestId}`],
    enabled: !!requestId,
  });
};

export default useGetDesignerRequestById;
