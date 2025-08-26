import {
  AxiosBaseQueryProps,
  PrintaResponseType,
  ServerError,
} from "@/services/api/api.types";
import { UseQueryOptions } from "@tanstack/react-query";

export type ActionParams<T> = Partial<AxiosBaseQueryProps> &
  Partial<UseQueryOptions<PrintaResponseType<T>, ServerError>> & {
    endpoint: string;
  };
