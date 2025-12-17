export interface GetAllPayoutsParams {
  cursor: string;
  limit: number;
  orderId?: string;
  hubId?: string;
  status?: PayoutStatus;
  type?: PayoutType;
}

export enum PayoutStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PROCESSED = "PROCESSED",
  FAILED = "FAILED",
}

export enum PayoutType {
  INITIAL = "INITIAL",
  FINAL = "FINAL",
}

export interface GetAllPayoutsResponse {
  data: Data;
  status: boolean;
}

export interface Data {
  nextCursor: string | null;
  payouts: Payout[];
}

export interface Payout {
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
