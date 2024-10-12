import { ExerciseRow } from "@/components/InfiniteLoad/ExerciseRow";
import { InfiniteLoad } from "@/components/InfiniteLoad/InfiniteLoad";
import { MultiSelect } from "@/components/MultiSelect.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import {
  ExerciseAgeGroup,
  ExerciseListElemFragment,
  useSearchExercisesLazyQuery,
} from "@/generated/graphql.tsx";
import { DifficultySelectorList } from "@/pages/ExerciseListPage/DifficultySelectorList.tsx";
import { searchDefaultValues } from "@/pages/ExerciseListPage/SearchDefaultValues.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import { entries, uniqBy } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useEffectOnce, useToggle } from "react-use";
import { useImmer } from "use-immer";

export type DifficultySelect = {
  [key in ExerciseAgeGroup]: {
    difficulty: [number, number]; // [min, max]
    isEnabled: boolean;
  };
};

export type ExerciseQuery = {
  difficulty: DifficultySelect;
  searchQuery: string;
  isFinal: boolean;
};

const LIMIT = 20;

export const ExerciseListPage = () => {
  const [exerciseQuery, setExerciseQuery] =
    useImmer<ExerciseQuery>(searchDefaultValues);

  const difficulty = useMemo(() => {
    return entries(exerciseQuery.difficulty)
      .filter(([, diff]) => diff.isEnabled)
      .map(([ageGroup, difficulty]) => {
        return {
          ageGroup: ageGroup as ExerciseAgeGroup,
          min: difficulty.difficulty[0],
          max: difficulty.difficulty[1],
        };
      });
  }, [exerciseQuery.difficulty]);

  const [hasMore, setHasMore] = useToggle(true);
  const [loadingSkip, setLoadingSkip] = useState(-1);
  const [data, setData] = useState<ExerciseListElemFragment[]>([]);
  const [getData, { loading }] = useSearchExercisesLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const fetchMore = useCallback(async () => {
    const skip = data.length || 0;
    if (loadingSkip >= skip) return;
    setLoadingSkip(skip);
    const res = await getData({
      variables: {
        query: {
          skip: skip,
          take: LIMIT,
          difficulty,
          queryStr: exerciseQuery.searchQuery,
        },
      },
    });
    const newData = res.data?.searchExercises.exercises || [];
    setData((prev) => uniqBy([...prev, ...newData], "id"));
    if (newData.length < LIMIT) {
      setHasMore(false);
    }
  }, [
    data.length,
    loadingSkip,
    getData,
    difficulty,
    exerciseQuery.searchQuery,
    setHasMore,
  ]);

  useEffectOnce(() => {
    fetchMore();
  });

  const refetch = useCallback(() => {
    setData([]);
    setLoadingSkip(-1);
    setHasMore(true);
    fetchMore();
  }, [fetchMore, setHasMore]);

  return (
    <Card>
      <CardHeader title="Feladatok keresése" />
      <CardContent>
        <Stack gap={1}>
          <TextField
            onChange={(event) => {
              setExerciseQuery((draft) => {
                draft.searchQuery = event.target.value;
              });
              refetch();
            }}
            label="Keresés"
            value={exerciseQuery.searchQuery}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearch />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <SimpleAccordion summary="Nehétség szűrő">
            <DifficultySelectorList
              difficulties={exerciseQuery.difficulty}
              setExerciseQuery={(v) => {
                setExerciseQuery(v);
                refetch();
              }}
            />
          </SimpleAccordion>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography>Döntő</Typography>
            <Checkbox
              checked={exerciseQuery.isFinal}
              onChange={(_, checked) => {
                setExerciseQuery((draft) => {
                  draft.isFinal = checked;
                });
                refetch();
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <MultiSelect
              label={"Talon"}
              sx={{ flexGrow: 1 }}
              items={["Gellért hegy", "Városliget"]}
            />
          </Stack>
        </Stack>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <InfiniteLoad<ExerciseListElemFragment>
              data={data}
              hasMore={hasMore}
              isInitialLoading={loading && data.length === 0}
              isFetchingNextPage={loading}
              fetchNextPage={async () => {
                await fetchMore();
              }}
            >
              {(row) => {
                return <ExerciseRow key={row.id} data={row} />;
              }}
            </InfiniteLoad>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
