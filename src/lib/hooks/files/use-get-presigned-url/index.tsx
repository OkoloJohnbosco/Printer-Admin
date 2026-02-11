import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetPresignedUrlParams,
  PresignedUrlResponse,
} from "./use-get-presigned-url.types";

const useGetPresignedUrl = (
  params: GetPresignedUrlParams,
  enabled: boolean = true,
) => {
  return useQueryActionHook<PresignedUrlResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_PRESIGNED_URL(params),
    queryKey: [
      QUERYKEYS.GET_PRESIGNED_URL,
      params.context,
      params.contentType,
      `${params.fileSize}`,
    ],
    enabled,
  });
};

export default useGetPresignedUrl;

export * from "./use-get-presigned-url.types";
