export interface GetAllPartnerApplicationsParams {
  cursor?: string;
  limit?: number;
  search?: string;
}

export interface GetAllPartnerApplicationsResponse {
  data: PartnerApplicationsData;
  status: boolean;
}

export interface PartnerApplicationsData {
  nextCursor: string | null;
  data: PartnerApplication[];
}

export enum PartnerApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface PartnerApplication {
  id: string;
  email: string;
  companyName: string;
  status: PartnerApplicationStatus;
  createdAt: string;
  updatedAt: string;
}
