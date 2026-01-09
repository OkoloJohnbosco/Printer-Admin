"use client";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";
import {
  GetAllUsersParams,
  GetAllUsersResponse,
} from "./use-get-all-users.types";

const useGetAllUsers = (params: GetAllUsersParams) => {
  return useQueryActionHook<GetAllUsersResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_USERS(params),
    queryKey: [
      QUERYKEYS.GET_ALL_USERS,
      `${params.cursor}`,
      `${params.limit}`,
      `${params.role}`,
      `${params.startDate}`,
      `${params.endDate}`,
      `${params.search}`,
    ],
  });
};

export default useGetAllUsers;
