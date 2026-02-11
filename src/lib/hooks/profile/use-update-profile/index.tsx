import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useCustomMutation from "@/lib/hooks/api/use-mutationaction";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateProfileReqBody } from "./use-update-profile.types";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useCustomMutation<Record<string, unknown>, UpdateProfileReqBody>({
    method: "patch",
    endpoint: ENDPOINTS.UPDATE_USER_PROFILE,
    message: "Profile updated successfully",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_USER_DATA],
      });
    },
  });
};

export default useUpdateProfile;
