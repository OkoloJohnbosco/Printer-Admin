"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import { isDesignerRequestReference } from "@/lib/resource-reference";
import useQueryActionHook from "../../api/use-queryaction";
import { GetDesignerRequestByIdResponse } from "./use-get-designer-request-by-id.types";

const useGetDesignerRequestById = (requestIdOrReference: string) => {
  const isReference = isDesignerRequestReference(requestIdOrReference);

  return useQueryActionHook<GetDesignerRequestByIdResponse>({
    method: "get",
    endpoint: isReference
      ? ENDPOINTS.GET_DESIGNER_REQUEST_BY_REFERENCE(requestIdOrReference)
      : ENDPOINTS.GET_DESIGNER_REQUEST_BY_ID(requestIdOrReference),
    queryKey: [QUERYKEYS.GET_DESIGNER_REQUEST_BY_ID, requestIdOrReference],
    enabled: !!requestIdOrReference,
  });
};

export default useGetDesignerRequestById;
