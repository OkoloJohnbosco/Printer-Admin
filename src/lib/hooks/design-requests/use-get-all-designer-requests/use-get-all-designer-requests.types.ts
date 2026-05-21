export interface GetAllDesignerRequestsParams {
  cursor?: string;
  limit?: number;
  status?: DesignerRequestStatus;
}

export enum DesignerRequestStatus {
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
}

export interface GetAllDesignerRequestsResponse {
  data: Data;
  status: boolean;
}

export interface Data {
  nextCursor: string | null;
  designerRequests: DesignerRequest[];
}

export interface DesignerRequest {
  id: string;
  reference?: string;
  userId: string;
  status: DesignerRequestStatus;
  type: string;
  description: string;
  price: string;
  preferences: Preferences;
  paymentReference: string;
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  references: string[];
  deliverables: string[];
}

export interface Preferences {
  style: string;
  colors: string[];
  deliverables: string[];
  instructions: string;
}

export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
}
