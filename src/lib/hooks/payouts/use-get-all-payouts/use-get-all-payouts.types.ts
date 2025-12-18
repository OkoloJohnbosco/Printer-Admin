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
  hubId: string;
  orderId: string;
  amount: string;
  status: string;
  type: string;
  reference: string;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  metadata: object | null;
  order: Order;
  hub: Hub;
}

export interface Order {
  reference: string;
}

export interface Hub {
  businessName: string;
}
