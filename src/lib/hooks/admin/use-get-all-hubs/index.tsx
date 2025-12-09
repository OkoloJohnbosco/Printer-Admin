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
  status: HubStatus;
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export enum HubStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ACTION_REQUIRED = "ACTION_REQUIRED",
}
const useGetAllHubs = ({
  limit,
  cursor,
  status,
  search,
  location,
}: {
  limit: number;
  cursor: string;
  status?: HubStatus;
  search?: string;
  location?: string;
}) => {
  return useQueryActionHook<UseGetAllHubsResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_HUBS(cursor, limit, status, search, location),
    queryKey: [
      QUERYKEYS.GET_ALL_HUBS,
      `${cursor}`,
      `${limit}`,
      `${status}`,
      `${search}`,
      `${location}`,
    ],
  });
};

export default useGetAllHubs;
