import { PrintHub } from "../../admin/use-get-all-hubs";

export interface GetEligibleHubsResponse {
  data: EligibleHub[];
  status: boolean;
}

export interface EligibleHub extends PrintHub {
  distance?: number;
  isAvailable?: boolean;
}
