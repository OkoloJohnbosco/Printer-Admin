export interface GetDesignerRequestStatsParams {
  startDate?: string;
  endDate?: string;
}

export interface GetDesignerRequestStatsResponse {
  data: DesignerRequestStatsData;
  status: boolean;
}

export interface DesignerRequestStatsData {
  total: number;
  [key: string]: number;
}
