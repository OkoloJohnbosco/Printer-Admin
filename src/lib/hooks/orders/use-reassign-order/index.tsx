import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useReassignOrder = (orderId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.REASSIGN_ORDER(orderId),
    message: "Order reassigned successfully",
  });
};

export default useReassignOrder;
