import { axiosBaseQuery } from "@/services/api/api.service";
import {
  AxiosBaseQueryProps,
  PrintaResponseType,
  ServerError,
} from "@/services/api/api.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { MutationBody, MutationConfig } from "./use-mutationaction.types";

const formatError = (data: { status: boolean; error: string }): string => {
  if (!data) return "Server error";

  return data?.error;
};

function createMutation<
  TData extends object,
  TVariables extends object | undefined,
>(config: Partial<AxiosBaseQueryProps<TVariables>>) {
  const { endpoint, method, headers, extraConfig = {} } = config;
  const baseUrl =
    process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "https://printa.fly.dev/";
  const url = `${baseUrl}${endpoint}`;

  return {
    mutationFn: (body: MutationBody<TVariables>) =>
      axiosBaseQuery({ url, method, body, headers, extraConfig }) as Promise<
        PrintaResponseType<TData>
      >,
    ...config,
  };
}

/* --------------- Main Hook ---------------- */
function useCustomMutation<
  TData extends object = Record<string, unknown>,
  TVariables extends object | undefined = Record<string, unknown>,
>(mutationConfig: MutationConfig<TData, TVariables>) {
  const {
    mutationFn,
    endpoint,
    showSuccessToast = true,
    showFailureToast = true,
    message,
    ...rest
  } = createMutation<TData, TVariables>(mutationConfig);

  const mutation = useMutation<
    PrintaResponseType<TData>,
    ServerError,
    MutationBody<TVariables>
  >({
    mutationFn,
    mutationKey: [endpoint],

    onError: (err) => {
      if (showFailureToast) {
        toast.error(formatError(err.response?.data));
      }
      mutation.reset();
    },

    onSettled: (data, error) => {
      if (error) {
        mutation.reset();
        return;
      }
      if (showSuccessToast || message) {
        toast.success(
          // @ts-expect-error Fix leter
          message ?? data?.data?.data?.message ?? "Response received",
        );
      }
    },

    retry: false,
    ...rest,
  });

  return {
    ...mutation,
    value: mutation.data?.data,
  };
}

export default useCustomMutation;
