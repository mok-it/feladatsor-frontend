import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatLocalDate,
  getDefaultReportDateRange,
  parseLocalDate,
  parseReportDateRange,
  writeReportDateRange,
} from "../src/pages/Reporting/reportDateParams.ts";

const now = new Date(2026, 7, 8, 15, 30);

test("report dates round-trip through query parameters", () => {
  const params = new URLSearchParams("section=users");
  const range = {
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 6, 31),
  };

  writeReportDateRange(params, range, now);

  assert.equal(
    params.toString(),
    "section=users&from=2026-06-01&to=2026-07-31",
  );
  assert.deepEqual(parseReportDateRange(params, now), range);
});

test("empty parameters use the rolling one-month default", () => {
  const range = parseReportDateRange(new URLSearchParams(), now);
  assert.equal(formatLocalDate(range.startDate), "2026-07-08");
  assert.equal(formatLocalDate(range.endDate), "2026-08-08");

  const params = new URLSearchParams();
  writeReportDateRange(params, getDefaultReportDateRange(now), now);
  assert.equal(params.toString(), "");
});

test("invalid dates and reversed ranges safely fall back to defaults", () => {
  assert.equal(parseLocalDate("2026-02-30"), null);
  assert.equal(parseLocalDate("08/08/2026"), null);

  const range = parseReportDateRange(
    new URLSearchParams("from=2026-09-01&to=2026-08-01"),
    now,
  );
  assert.equal(formatLocalDate(range.startDate), "2026-07-08");
  assert.equal(formatLocalDate(range.endDate), "2026-08-08");
});
