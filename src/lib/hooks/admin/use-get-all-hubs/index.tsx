import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

export interface UseGetAllHubsResponse {
  data: HubsData;
  status: boolean;
}

export interface HubsData {
  nextCursor: string;
  hubs: PrintHub[];
}

export interface PrintHub {
  id: string;
  userId: string;
  status: string;
  city: string;
  state: string;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  createdAt: string;
  updatedAt: string;
  documents: Document[];
}

export interface Document {
  id: string;
  hubId: string;
  type: string;
  status: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

const useGetAllHubs = ({
  limit,
  cursor,
  status,
}: {
  limit: number;
  cursor: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
}) => {
  return useQueryActionHook<UseGetAllHubsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_HUBS(cursor, limit, status),
    queryKey: [QUERYKEYS.GET_ALL_HUBS, `${cursor}`, `${limit}`, `${status}`],
  });
};

export default useGetAllHubs;
