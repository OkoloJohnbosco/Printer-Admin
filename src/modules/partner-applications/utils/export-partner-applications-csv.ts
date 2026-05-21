import { ENDPOINTS } from "@/lib/endpoints";
import {
  GetAllPartnerApplicationsParams,
  GetAllPartnerApplicationsResponse,
  PartnerApplication,
} from "@/lib/hooks/admin/use-get-all-partner-applications/use-get-all-partner-applications.types";
import { ExportData, exportToCSV } from "@/lib/utils";
import { axiosBaseQuery } from "@/services/api/api.service";

const EXPORT_PAGE_SIZE = 100;
const baseUrl =
  process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "https://printa.fly.dev/";

export const mapPartnerApplicationsToCsvRows = (
  applications: PartnerApplication[],
): ExportData[] =>
  applications.map((application) => ({
    "Company Name": application.companyName,
    Email: application.email,
    "Business Type": application.businessType,
    "Applied Date": new Date(application.createdAt).toLocaleDateString(),
  }));

export const fetchAllPartnerApplicationsForExport = async (
  params: Omit<GetAllPartnerApplicationsParams, "cursor" | "limit">,
): Promise<PartnerApplication[]> => {
  const allApplications: PartnerApplication[] = [];
  let cursor: string | undefined;

  do {
    const endpoint = ENDPOINTS.GET_ALL_PARTNER_APPLICATIONS({
      ...params,
      limit: EXPORT_PAGE_SIZE,
      ...(cursor ? { cursor } : {}),
    });

    const response = await axiosBaseQuery({
      url: `${baseUrl}${endpoint}`,
      method: "get",
    });

    const result = response.data as GetAllPartnerApplicationsResponse;
    allApplications.push(...(result.data?.applications ?? []));
    cursor = result.data?.nextCursor ?? undefined;
  } while (cursor);

  return allApplications;
};

export const downloadPartnerApplicationsCsv = (
  applications: PartnerApplication[],
  filename = "partner-applications-export",
) => {
  const rows = mapPartnerApplicationsToCsvRows(applications);
  exportToCSV(rows, filename);
};
