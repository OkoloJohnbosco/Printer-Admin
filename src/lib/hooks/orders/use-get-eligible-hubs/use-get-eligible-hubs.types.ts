export interface GetEligibleHubsResponse {
  data: EligibleHub[];
  status: boolean;
}

export interface EligibleHub {
  id: string;
  businessName: string;
  businessAddress: string;
}
