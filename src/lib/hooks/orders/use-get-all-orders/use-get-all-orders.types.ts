export interface GetAllOrdersParams {
  cursor: string;
  limit: number;
  status?:
    | "PENDING"
    | "QUEUED"
    | "PROCESSING"
    | "COMPLETED"
    | "REJECTED"
    | "FAILED";
  hubId?: string;
  startDate?: string;
  endDate?: string;
}
