export interface GetDashboardStatsParams {
  startDate?: string;
  endDate?: string;
}

export interface GetDashboardStatsResponse {
  data: DashboardStatsData;
  status: boolean;
}

export interface DashboardStatsData {
  totalIncome: number;
  totalOrders: number;
  totalCustomers: number;
  rejectedOrders: number;
}
