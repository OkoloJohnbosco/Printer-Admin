import { ENDPOINTS } from "@/lib/endpoints";
import {
  GetAllPayoutsParams,
  GetAllPayoutsResponse,
  Payout,
  PayoutType,
} from "@/lib/hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import {
  ExportData,
  exportToCSV,
  formatCurrency,
  formatStatusText,
  formatTime,
  formatToFullYMD,
} from "@/lib/utils";
import { axiosBaseQuery } from "@/services/api/api.service";

const EXPORT_PAGE_SIZE = 100;
const baseUrl =
  process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "https://printa.fly.dev/";

export const mapPayoutsToCsvRows = (payouts: Payout[]): ExportData[] =>
  payouts.map((payout) => ({
    "Date and time": `${formatToFullYMD(payout.createdAt)} - ${formatTime(payout.createdAt)}`,
    Hub: payout.hub.businessName,
    Type:
      payout.type === PayoutType.INITIAL ? "Initial Payout" : "Final Payout",
    Amount: formatCurrency(Number(payout.amount)),
    Status: formatStatusText(payout.status),
  }));

export const fetchAllPayoutsForExport = async (
  params: Omit<GetAllPayoutsParams, "cursor" | "limit">,
): Promise<Payout[]> => {
  const allPayouts: Payout[] = [];
  let cursor: string | undefined;

  do {
    const endpoint = ENDPOINTS.GET_ALL_PAYOUTS({
      ...params,
      limit: EXPORT_PAGE_SIZE,
      cursor: cursor ?? "",
    });

    const response = await axiosBaseQuery({
      url: `${baseUrl}${endpoint}`,
      method: "get",
    });

    const result = response.data as GetAllPayoutsResponse;
    allPayouts.push(...(result.data?.payouts ?? []));
    cursor = result.data?.nextCursor ?? undefined;
  } while (cursor);

  return allPayouts;
};

export const downloadPayoutsCsv = (
  payouts: Payout[],
  filename = "revenue-payouts-export",
) => {
  const rows = mapPayoutsToCsvRows(payouts);
  exportToCSV(rows, filename);
};
