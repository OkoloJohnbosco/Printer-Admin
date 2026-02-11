import { DesignerRequestStatus } from "../use-get-all-designer-requests/use-get-all-designer-requests.types";

export interface UpdateDesignerRequestBody {
  status: DesignerRequestStatus;
  deliverables?: string[];
  rejectionReason?: string;
}

export interface UpdateDesignerRequestResponse {
  data: {
    message: string;
  };
  status: boolean;
}
