import { clsx, type ClassValue } from "clsx";
import { format, getYear, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

type keys<T> = keyof T;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToKilobyte(size: number) {
  const newSize = size / 1024;

  return newSize.toFixed(2);
}

export function createFormData<T extends Record<string, string | Blob>>(
  data: T,
) {
  const reqData = new FormData();

  const dataKeys = Object.keys(data) as keys<T>[];
  dataKeys.forEach((item) => {
    if (data[item]) {
      reqData.set(item as string, data[item]);
    }
  });

  return reqData;
}

export const fileSchema = (maxSize: number, allowedTypes: string[]) =>
  z
    .any()
    .refine((file) => file instanceof File, {
      message: "Expected a file.",
    })
    .refine((file) => file?.size <= maxSize, {
      // make this 50 mb
      message: `File size should be less than ${
        maxSize / (100 * 1024 * 1024)
      }MB.`,
    })
    .refine((file) => allowedTypes.includes(file?.type), {
      message: `Only ${allowedTypes.join(", ")} files are accepted.`,
    });

export const fileSize = 100 * 1024 * 1024;

export function formatNumber(num: number): string {
  if (isNaN(num)) return "0";
  if (num < 1000) return num?.toString();

  const units = ["", "K", "M", "B", "T", "P", "E"]; // K = Thousand, M = Million, B = Billion, T = Trillion, P = Quadrillion, E = Quintillion
  const unitIndex = Math.floor(Math.log10(num) / 3); // Determine the index of the unit

  const scaledNumber = (num / Math.pow(1000, unitIndex)).toFixed(2); // Scale the number down and keep one decimal place
  return `${scaledNumber}${units[unitIndex]}`;
}

export function formatTableNumber(
  num: number,
  options?: { isPercent?: boolean; dp?: number },
): string {
  let giverNum = num;
  if (isNaN(giverNum)) return "0";
  // Remove the decimals bynpm using Math.floor (or Math.trunc)
  // const integerPart = Math.floor(num);
  if (options?.isPercent) giverNum = giverNum * 100;

  // Format the integer part with commas
  return giverNum.toLocaleString("en-US", {
    minimumFractionDigits: options?.dp ?? 3,
    maximumFractionDigits: options?.dp ?? 3,
  });
}

/**
 * Formats an ISO date string to a human-readable time format (e.g., "2:44pm").
 * @param isoDate - The ISO date string to format.
 * @returns The formatted time string in "h:mm am/pm" format or an empty string if the input is invalid.
 */
export function formatTime(isoDate: string | null | undefined): string {
  if (!isoDate) {
    return ""; // Return an empty string if the input is null or undefined
  }

  try {
    const parsedDate = parseISO(isoDate);
    return format(parsedDate, "h:mma").toLowerCase();
  } catch (error) {
    console.error("Invalid date format:", error);
    return "";
  }
}

export default function getInitials(name?: string) {
  if (!name) return "";
  if (name.split(" ").length === 1) return name.substring(0, 2).toUpperCase();
  return name
    .split(" ")
    .splice(0, 2)
    .map((item) => item.substring(0, 1))
    .join("")
    .toUpperCase();
}

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const startYear = getYear(new Date()) - 100;
const endYear = getYear(new Date());

export const years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => endYear - i,
);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ExportData {
  [key: string]: string | number | boolean | null | undefined;
}

export function exportToCSV(data: ExportData[], filename: string) {
  if (data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(","),
    // Data rows
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle values that might contain commas or quotes
          if (value === null || value === undefined) return "";
          const stringValue = String(value);
          if (
            stringValue.includes(",") ||
            stringValue.includes('"') ||
            stringValue.includes("\n")
          ) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(","),
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}-${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatDateForExport(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}

export const formatStatusText = (text: string): string => {
  return text.replace(/[_-]/g, " ").toLowerCase();
};

/**
 * Formats a Date object into "YYYY-MM-DD" format.
 * @param date - The Date object to format.
 * @returns A string in "YYYY-MM-DD" format.
 */
export function formatToFullYMD(date: Date | string): string {
  if (!date) return "";
  return format(new Date(date), "dd MMM, yyyy");
}

const localeMap: Record<string, string> = {
  US: "en-US",
  GB: "en-GB",
  NG: "en-NG",
  KE: "en-KE",
  CA: "en-CA",
  EU: "fr-FR",
  IN: "en-IN",
  JP: "ja-JP",
  CN: "zh-CN",
  ZA: "en-ZA",
};

const currencyMap: Record<string, string> = {
  US: "USD",
  GB: "GBP",
  NG: "NGN",
  KE: "KES",
  CA: "CAD",
  EU: "EUR",
  IN: "INR",
  JP: "JPY",
  CN: "CNY",
  ZA: "ZAR",
};

export function formatCurrency(amount?: number, countryCode?: string): string {
  if (typeof amount !== "number" || !isFinite(amount) || amount < 0) {
    return "Invalid amount";
  }

  const code = countryCode?.toUpperCase() ?? "NG";
  const currency = currencyMap[code] ?? "NGN";
  const locale = localeMap[code] ?? "en-NG";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatToMDY(date?: Date | string): string {
  if (!date) return "";
  return format(new Date(date), "MMMM dd, yyyy");
}
