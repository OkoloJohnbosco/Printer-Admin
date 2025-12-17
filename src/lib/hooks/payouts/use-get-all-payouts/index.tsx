"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetAllPayoutsParams,
  GetAllPayoutsResponse,
} from "./use-get-all-payouts.types";
const useGetAllPayouts = (params: GetAllPayoutsParams) => {
  return useQueryActionHook<GetAllPayoutsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PAYOUTS(params),
    queryKey: [
      QUERYKEYS.GET_ALL_PAYOUTS,
      `${params.cursor}`,
      `${params.limit}`,
      `${params.status}`,
      `${params.hubId}`,
      `${params.orderId}`,
      `${params.type}`,
    ],
  });
};

export default useGetAllPayouts;
