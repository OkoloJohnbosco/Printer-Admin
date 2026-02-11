import { PRINTA_APP_KEY } from "@/lib/constants";
import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "@/lib/hooks/api/use-queryaction";
import { getCookie } from "cookies-next";

export interface UserResponse {
  data: User;
}
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "ADMIN" | "USER" | "VENDOR";
  createdAt: string;
  updatedAt: string;
  avatar: string;
}

const useGetUserProfile = () => {
  // Check if token exists
  const token = getCookie(PRINTA_APP_KEY.TOKEN);

  return useQueryActionHook<UserResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_DATA,
    queryKey: [QUERYKEYS.GET_USER_DATA, `${token}`],
  });
};

export default useGetUserProfile;
