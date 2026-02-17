export interface GetAllOrdersParams {
  cursor: string;
  limit: number;
  status?: OrderStatus;
  hubId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export enum OrderStatus {
  PENDING = "PENDING",
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  FAILED = "FAILED",
  DELIVERED = "DELIVERED",
}

export interface GetAllOrdersResponse {
  data: Data;
  status: boolean;
}

export interface Data {
  nextCursor: string | null;
  orders: Order[];
}

export interface Order {
  id: string;
  total: string;
  status: string;
  reference: string;
  createdAt: string;
  itemCount: number;
  productionTime: string;
  hubName: string;
  customerName: string;
}
