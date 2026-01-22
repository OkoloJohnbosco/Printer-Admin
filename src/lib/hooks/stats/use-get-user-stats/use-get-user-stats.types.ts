export interface GetUserStatsParams {
  startDate?: string;
  endDate?: string;
}

export interface GetUserStatsResponse {
  data: UserStatsData;
  status: boolean;
}

export interface UserStatsData {
  total: number;
  admins: number;
  vendors: number;
  customers: number;
}
