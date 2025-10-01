import { ExerciseTable } from "@/components/exercise/ExerciseTable";
import { useInfiniteLoad } from "@/components/InfiniteLoad/useInfiniteLoad";
import {
  ExerciseListElemFragment,
  useSearchExercisesLazyQuery,
} from "@/generated/graphql.tsx";
import { useExerciseFilters } from "@/util/useExerciseFilters";
import { useTableOrder } from "@/util/useTableOrder";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";

const LIMIT = 20;

export const ExerciseListPage = () => {
  const { exerciseQuery, difficulty, filterComponents } = useExerciseFilters();
  const tableOrder = useTableOrder<ExerciseListElemFragment>();
  const { orderBy, order } = tableOrder;

  const [getData, { loading }] = useSearchExercisesLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const fetch: (
    skip: number,
  ) => Promise<{ data: ExerciseListElemFragment[]; totalCount?: number }> =
    useCallback(
      async (skip: number) => {
        const res = await getData({
          variables: {
            query: {
              skip,
              take: LIMIT,
              difficulty,
              queryStr: exerciseQuery.searchQuery,
              orderBy: orderBy,
              orderDirection: order === "asc" ? "ASC" : "DESC",
              includeTags: exerciseQuery.includeTags,
              excludeTags: exerciseQuery.excludeTags,
            },
          },
        });
        return {
          data: res.data?.searchExercises.exercises || [],
          totalCount: res.data?.searchExercises.totalCount,
        };
      },
      [
        getData,
        difficulty,
        exerciseQuery.searchQuery,
        exerciseQuery.includeTags,
        exerciseQuery.excludeTags,
        orderBy,
        order,
      ],
    );

  const { data, fetchMore, hasMore, reset, totalCount } =
    useInfiniteLoad<ExerciseListElemFragment>({
      fetch,
      limit: LIMIT,
    });

  useEffect(() => {
    reset();
  }, [exerciseQuery, difficulty, orderBy, order, reset]);

  return (
    <Card sx={{ borderRadius: { xs: 0, md: 1 } }}>
      <CardHeader title="Feladatok keresése" />
      <CardContent>
        {filterComponents}
        {totalCount !== undefined && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 3, mb: 1, textAlign: "right" }}
          >
            {totalCount} db találat
          </Typography>
        )}
        <ExerciseTable
          {...tableOrder}
          data={data}
          fetchMore={fetchMore}
          hasMore={hasMore}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};
