export interface GetHubStatsParams {
  startDate?: string;
  endDate?: string;
}

export interface GetHubStatsResponse {
  data: HubStatsData;
  status: boolean;
}

export interface HubStatsData {
  total: number;
  active: number;
  pending: number;
  rejected: number;
}
