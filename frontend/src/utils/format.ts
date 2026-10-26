import { DetailValue } from "@/models/requirement";

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function formatDateRange(startDate: string, endDate: string | null) {
  return endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : formatDate(startDate);
}

export function formatCurrency(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}

export function formatValue(value: DetailValue) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}
