import type {
  ExerciseAgeGroup,
  ExerciseCheckFilter,
} from "../generated/graphql.tsx";
import { searchDefaultValues } from "./const.ts";
import type { ExerciseQuery } from "./types.ts";

export const exerciseSortKeys = [
  "id",
  "status",
  "description",
  "createdAt",
] as const;

export type ExerciseSortKey = (typeof exerciseSortKeys)[number];
export type ExerciseSortDirection = "asc" | "desc";

const ageGroups: ExerciseAgeGroup[] = [
  "KOALA",
  "MEDVEBOCS",
  "KISMEDVE",
  "NAGYMEDVE",
  "JEGESMEDVE",
];

const checkStatuses: ExerciseCheckFilter[] = [
  "NEEDS_TO_BE_CHECKED",
  "GOOD",
  "CHANGE_REQUIRED",
  "TO_DELETE",
];

const difficultyPattern = /^([A-Z]+):(\d)-(\d)$/;

export const createDefaultExerciseQuery = (
  includeCheckStatus = false,
): ExerciseQuery => ({
  ...searchDefaultValues,
  difficulty: Object.fromEntries(
    ageGroups.map((ageGroup) => [
      ageGroup,
      {
        ...searchDefaultValues.difficulty[ageGroup],
        difficulty: [
          ...searchDefaultValues.difficulty[ageGroup].difficulty,
        ] as [number, number],
      },
    ]),
  ) as ExerciseQuery["difficulty"],
  ...(includeCheckStatus ? { checkStatus: "" } : {}),
});

export const parseExerciseFilters = (
  params: URLSearchParams,
  includeCheckStatus = false,
): ExerciseQuery => {
  const query = createDefaultExerciseQuery(includeCheckStatus);
  query.searchQuery = params.get("q") ?? "";
  query.includeTags = [...new Set(params.getAll("includeTag").filter(Boolean))];
  query.excludeTags = [
    ...new Set(
      params
        .getAll("excludeTag")
        .filter((tagId) => tagId && !query.includeTags.includes(tagId)),
    ),
  ];

  params.getAll("difficulty").forEach((value) => {
    const match = difficultyPattern.exec(value);
    if (!match) return;

    const [, ageGroupValue, minValue, maxValue] = match;
    if (!ageGroups.includes(ageGroupValue as ExerciseAgeGroup)) return;

    const min = Number(minValue);
    const max = Number(maxValue);
    if (min < 0 || max > 4 || min > max) return;

    const ageGroup = ageGroupValue as ExerciseAgeGroup;
    query.difficulty[ageGroup] = {
      difficulty: [min, max],
      isEnabled: true,
    };
  });

  if (includeCheckStatus) {
    const checkStatus = params.get("check");
    query.checkStatus = checkStatuses.includes(
      checkStatus as ExerciseCheckFilter,
    )
      ? (checkStatus as ExerciseCheckFilter)
      : "";
  }

  return query;
};

export const writeExerciseFilters = (
  params: URLSearchParams,
  query: ExerciseQuery,
  includeCheckStatus = false,
) => {
  ["q", "tag", "includeTag", "excludeTag", "difficulty", "check"].forEach(
    (key) => params.delete(key),
  );

  if (query.searchQuery) params.set("q", query.searchQuery);
  query.includeTags.forEach((tagId) => params.append("includeTag", tagId));
  query.excludeTags
    .filter((tagId) => !query.includeTags.includes(tagId))
    .forEach((tagId) => params.append("excludeTag", tagId));

  ageGroups.forEach((ageGroup) => {
    const difficulty = query.difficulty[ageGroup];
    if (!difficulty.isEnabled) return;
    params.append(
      "difficulty",
      `${ageGroup}:${difficulty.difficulty[0]}-${difficulty.difficulty[1]}`,
    );
  });

  if (includeCheckStatus && query.checkStatus) {
    params.set("check", query.checkStatus);
  }
};

export const parseExerciseSorting = (
  params: URLSearchParams,
): { orderBy: ExerciseSortKey | null; order: ExerciseSortDirection } => {
  const orderByValue = params.get("sort");
  const order = params.get("dir");
  const orderBy = exerciseSortKeys.includes(orderByValue as ExerciseSortKey)
    ? (orderByValue as ExerciseSortKey)
    : null;

  return {
    orderBy,
    order: orderBy && order === "desc" ? "desc" : "asc",
  };
};

export const writeExerciseSorting = (
  params: URLSearchParams,
  orderBy: ExerciseSortKey | null,
  order: ExerciseSortDirection,
) => {
  params.delete("sort");
  params.delete("dir");

  if (!orderBy) return;
  params.set("sort", orderBy);
  if (order === "desc") params.set("dir", order);
};
