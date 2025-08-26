import { QueryFunction, QueryKey } from "@tanstack/react-query";
import {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
} from "axios";

export type CustomMethod = "get" | "put" | "delete" | "post" | "patch";

export interface AxiosBaseQueryProps<T = object> {
  method?: Method;
  url: string;
  body?: Record<string, unknown>;
  headers?: AxiosRequestHeaders;
  endpoint?: string;
  queryKey?: string | string[] | number[];
  showSuccessToast?: boolean;
  showFailureToast?: boolean;
  message?: string;
  queryFn?: QueryFunction<PrintaResponseType<T>, QueryKey>;
  extraConfig?: AxiosRequestConfig;
}

export type PrintaResponseType<T = object> = AxiosResponse<
  {
    data: { message: string };
  } & T
>;

export interface RequestResponse<T = Record<string, unknown>> {
  queryFn?: QueryFunction<PrintaResponseType<T>, QueryKey>;
}

export interface ServerError {
  message: string;
  name: string;
  response: {
    data: {
      error: string;
      status: boolean;
    };
  };
}
