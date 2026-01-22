export interface GetOrderStatsParams {
  startDate?: string;
  endDate?: string;
}

export interface GetOrderStatsResponse {
  data: OrderStatsData;
  status: boolean;
}

export interface OrderStatsData {
  total: number;
  pending: number;
  rejected: number;
  completed: number;
}
