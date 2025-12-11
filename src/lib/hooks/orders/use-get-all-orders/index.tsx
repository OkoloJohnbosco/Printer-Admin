"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetAllOrdersParams,
  GetAllOrdersResponse,
} from "./use-get-all-orders.types";

const useGetAllOrders = (params: GetAllOrdersParams) => {
  return useQueryActionHook<GetAllOrdersResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_ORDERS(params),
    queryKey: [
      QUERYKEYS.GET_ALL_ORDERS,
      `${params.cursor}`,
      `${params.limit}`,
      `${params.status}`,
      `${params.hubId}`,
      `${params.startDate}`,
      `${params.endDate}`,
      `${params.search}`,
    ],
  });
};

export default useGetAllOrders;
