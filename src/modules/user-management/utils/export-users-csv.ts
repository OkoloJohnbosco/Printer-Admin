import { ENDPOINTS } from "@/lib/endpoints";
import {
  GetAllUsersParams,
  GetAllUsersResponse,
  User,
} from "@/lib/hooks/users/use-get-all-users/use-get-all-users.types";
import { ExportData, exportToCSV, formatStatusText } from "@/lib/utils";
import { axiosBaseQuery } from "@/services/api/api.service";

const EXPORT_PAGE_SIZE = 100;
const baseUrl =
  process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "https://printa.fly.dev/";

export const mapUsersToCsvRows = (users: User[]): ExportData[] =>
  users.map((user) => ({
    User: `${user.firstName} ${user.lastName}`.trim(),
    Email: user.email,
    Role: formatStatusText(user.role),
    "Join Date": new Date(user.createdAt).toLocaleDateString(),
  }));

export const fetchAllUsersForExport = async (
  params: Omit<GetAllUsersParams, "cursor" | "limit">,
): Promise<User[]> => {
  const allUsers: User[] = [];
  let cursor: string | undefined;

  do {
    const endpoint = ENDPOINTS.GET_ALL_USERS({
      ...params,
      limit: EXPORT_PAGE_SIZE,
      ...(cursor ? { cursor } : {}),
    });

    const response = await axiosBaseQuery({
      url: `${baseUrl}${endpoint}`,
      method: "get",
    });

    const result = response.data as GetAllUsersResponse;
    allUsers.push(...(result.data?.users ?? []));
    cursor = result.data?.nextCursor ?? undefined;
  } while (cursor);

  return allUsers;
};

export const downloadUsersCsv = (users: User[], filename = "users-export") => {
  const rows = mapUsersToCsvRows(users);
  exportToCSV(rows, filename);
};
