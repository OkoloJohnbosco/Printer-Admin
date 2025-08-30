import { axiosBaseQuery } from "@/services/api/api.service";
import { PrintaResponseType, ServerError } from "@/services/api/api.types";
import { useQuery } from "@tanstack/react-query";
import { ActionParams } from "./use-queryaction.types";

export function getQueryAction<T>(payload: ActionParams<T>) {
  const { endpoint, method, body, headers } = payload;

  const baseUrl =
    process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "https://printa.fly.dev/";
  const url = `${baseUrl}${endpoint}`;
  return {
    queryFn: () => {
      return axiosBaseQuery({
        url,
        method,
        body,
        headers,
      });
    },
    ...payload,
  };
}

function useQueryActionHook<T>(data: ActionParams<T>) {
  const { queryFn, queryKey, endpoint, ...others } = getQueryAction({
    ...data,
  });

  // Ensure queryKey is an array
  const finalQueryKey = Array.isArray(queryKey)
    ? queryKey
    : [queryKey || endpoint];

  const queryResult = useQuery<PrintaResponseType<T>, ServerError>({
    queryFn,
    queryKey: finalQueryKey,
    retry: false,
    refetchOnWindowFocus: false,
    ...others,
  });

  return {
    ...queryResult,
    value: queryResult.data?.data,
  };
}

export default useQueryActionHook;
