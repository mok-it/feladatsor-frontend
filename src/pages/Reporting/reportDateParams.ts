export interface ReportDateRange {
  startDate: Date;
  endDate: Date;
}

export type QuickDateRange =
  | "today"
  | "yesterday"
  | "last3days"
  | "lastWeek"
  | "lastMonth";

const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

const startOfLocalDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseLocalDate = (value: string): Date | null => {
  const match = datePattern.exec(value);
  if (!match) return null;

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const getDefaultReportDateRange = (
  now = new Date(),
): ReportDateRange => {
  const endDate = startOfLocalDay(now);
  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - 1);
  return { startDate, endDate };
};

export const getQuickReportDateRange = (
  range: QuickDateRange,
  now = new Date(),
): ReportDateRange => {
  const today = startOfLocalDay(now);
  const startDate = new Date(today);
  const endDate = new Date(today);

  switch (range) {
    case "today":
      break;
    case "yesterday":
      startDate.setDate(today.getDate() - 1);
      endDate.setDate(today.getDate() - 1);
      break;
    case "last3days":
      startDate.setDate(today.getDate() - 3);
      break;
    case "lastWeek":
      startDate.setDate(today.getDate() - 7);
      break;
    case "lastMonth":
      startDate.setMonth(today.getMonth() - 1);
      break;
  }

  return { startDate, endDate };
};

export const parseReportDateRange = (
  params: URLSearchParams,
  now = new Date(),
): ReportDateRange => {
  const defaults = getDefaultReportDateRange(now);
  const startDate =
    parseLocalDate(params.get("from") ?? "") ?? defaults.startDate;
  const endDate = parseLocalDate(params.get("to") ?? "") ?? defaults.endDate;

  return startDate <= endDate ? { startDate, endDate } : defaults;
};

export const writeReportDateRange = (
  params: URLSearchParams,
  range: ReportDateRange,
  now = new Date(),
) => {
  params.delete("from");
  params.delete("to");

  const defaults = getDefaultReportDateRange(now);
  const startDate = formatLocalDate(range.startDate);
  const endDate = formatLocalDate(range.endDate);

  if (startDate !== formatLocalDate(defaults.startDate)) {
    params.set("from", startDate);
  }
  if (endDate !== formatLocalDate(defaults.endDate)) {
    params.set("to", endDate);
  }
};
