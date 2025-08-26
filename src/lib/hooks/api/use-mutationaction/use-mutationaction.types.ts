import {
  AxiosBaseQueryProps,
  PrintaResponseType,
  ServerError,
} from "@/services/api/api.types";
import { UseMutationOptions } from "@tanstack/react-query";

export type MutationConfig<
  TData extends object,
  TVariables extends object | undefined,
> = Partial<
  UseMutationOptions<PrintaResponseType<TData>, ServerError, TVariables>
> &
  Partial<AxiosBaseQueryProps<TVariables>> & {
    endpoint: string;
  };

export type MutationBody<T> = T extends Record<string, unknown> ? T : never;
