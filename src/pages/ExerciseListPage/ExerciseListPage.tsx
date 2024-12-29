import { ExerciseTable } from "@/components/exercise/ExerciseTable";
import { useInfiniteLoad } from "@/components/InfiniteLoad/useInfiniteLoad";
import {
  ExerciseListElemFragment,
  useSearchExercisesLazyQuery,
} from "@/generated/graphql.tsx";
import { useExerciseFilters } from "@/util/useExerciseFilters";
import { useTableOrder } from "@/util/useTableOrder";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useCallback, useEffect } from "react";

const LIMIT = 20;

export const ExerciseListPage = () => {
  const { exerciseQuery, difficulty, filterComponents } = useExerciseFilters();
  const tableOrder = useTableOrder<ExerciseListElemFragment>();
  const { orderBy, order } = tableOrder;

  const [getData, { loading }] = useSearchExercisesLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const fetch: (skip: number) => Promise<ExerciseListElemFragment[]> =
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
        return res.data?.searchExercises.exercises || [];
      },
      [
        getData,
        difficulty,
        exerciseQuery.includeTags,
        exerciseQuery.excludeTags,
        exerciseQuery.searchQuery,
        orderBy,
        order,
      ],
    );

  const { data, fetchMore, hasMore, reset } =
    useInfiniteLoad<ExerciseListElemFragment>({
      fetch,
      limit: LIMIT,
    });

  useEffect(() => {
    reset();
  }, [exerciseQuery, difficulty, orderBy, order, reset]);

  return (
    <Card>
      <CardHeader title="Feladatok keresése" />
      <CardContent>
        {filterComponents}
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
