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
  applications: PartnerApplication[];
}

export interface PartnerApplication {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  businessType: string;
  createdAt: string;
}
