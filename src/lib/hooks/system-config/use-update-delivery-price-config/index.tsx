import { ENDPOINTS } from "@/lib/endpoints";
import useCustomMutation from "../../api/use-mutationaction";

const useUpdateDeliveryPriceConfig = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_DELIVERY_PRICE_CONFIG,
    message: "Delivery price config updated successfully",
  });
};

export default useUpdateDeliveryPriceConfig;
