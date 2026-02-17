import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useDeliverOrder = (orderId: string) => {
  return useCustomMutation({
    method: "patch",
    endpoint: ENDPOINTS.DELIVER_ORDER(orderId),
    message: "Order marked as delivered",
  });
};

export default useDeliverOrder;
