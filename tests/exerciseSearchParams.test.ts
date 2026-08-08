import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createDefaultExerciseQuery,
  parseExerciseFilters,
  parseExerciseSorting,
  writeExerciseFilters,
  writeExerciseSorting,
} from "../src/util/exerciseSearchParams.ts";

test("filter state round-trips through query parameters", () => {
  const query = createDefaultExerciseQuery(true);
  query.searchQuery = "geometry";
  query.includeTags = ["12", "18"];
  query.excludeTags = ["25"];
  query.difficulty.KOALA = {
    difficulty: [1, 3],
    isEnabled: true,
  };
  query.checkStatus = "CHANGE_REQUIRED";

  const params = new URLSearchParams("sort=createdAt&dir=desc");
  writeExerciseFilters(params, query, true);

  assert.equal(
    params.toString(),
    "sort=createdAt&dir=desc&q=geometry&includeTag=12&includeTag=18&excludeTag=25&difficulty=KOALA%3A1-3&check=CHANGE_REQUIRED",
  );
  assert.deepEqual(parseExerciseFilters(params, true), query);
});

test("invalid and conflicting filter parameters fall back safely", () => {
  const params = new URLSearchParams(
    "tag=legacy&includeTag=12&includeTag=12&excludeTag=12&excludeTag=25&difficulty=UNKNOWN:1-2&difficulty=KOALA:4-2&difficulty=KISMEDVE:0-5&check=INVALID",
  );

  const parsed = parseExerciseFilters(params, true);

  assert.deepEqual(parsed.includeTags, ["12"]);
  assert.deepEqual(parsed.excludeTags, ["25"]);
  assert.equal(parsed.checkStatus, "");
  assert.equal(parsed.difficulty.KOALA.isEnabled, false);
  assert.equal(parsed.difficulty.KISMEDVE.isEnabled, false);

  writeExerciseFilters(params, parsed, true);
  assert.equal(params.has("tag"), false);
  assert.equal(params.has("check"), false);
});

test("default filter state produces no filter parameters", () => {
  const params = new URLSearchParams("sort=id");
  writeExerciseFilters(params, createDefaultExerciseQuery(), false);
  assert.equal(params.toString(), "sort=id");
});

test("sorting validates fields and omits default direction", () => {
  const params = new URLSearchParams("q=geometry&sort=notAField&dir=desc");
  assert.deepEqual(parseExerciseSorting(params), {
    orderBy: null,
    order: "asc",
  });

  writeExerciseSorting(params, "createdAt", "asc");
  assert.equal(params.toString(), "q=geometry&sort=createdAt");
  assert.deepEqual(parseExerciseSorting(params), {
    orderBy: "createdAt",
    order: "asc",
  });

  writeExerciseSorting(params, "createdAt", "desc");
  assert.equal(params.toString(), "q=geometry&sort=createdAt&dir=desc");
});
