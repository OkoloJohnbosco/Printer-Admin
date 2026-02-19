import { Payout } from "../use-get-all-payouts/use-get-all-payouts.types";

export interface GetPayoutByIdResponse {
  data: Payout;
  status: boolean;
}
