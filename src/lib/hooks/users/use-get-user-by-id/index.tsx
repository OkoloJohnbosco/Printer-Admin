"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import { GetUserByIdResponse } from "./use-get-user-by-id.types";

const useGetUserById = (userId: string) => {
  return useQueryActionHook<GetUserByIdResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_BY_ID(userId),
    queryKey: [QUERYKEYS.GET_USER_BY_ID, userId],
    enabled: !!userId,
  });
};

export default useGetUserById;
