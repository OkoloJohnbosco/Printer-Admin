import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "@/lib/hooks/api/use-queryaction";

export interface UserResponse {
  data: User;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const useGetUserData = () => {
  return useQueryActionHook<UserResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_DATA,
    queryKey: [QUERYKEYS.GET_USER_DATA],
  });
};

export default useGetUserData;
