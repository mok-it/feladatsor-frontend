import { ExerciseRow } from "@/components/InfiniteLoad/ExerciseRow";
import { InfiniteLoad } from "@/components/InfiniteLoad/InfiniteLoad";
import { MultiSelect } from "@/components/MultiSelect.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import {
  Exercise,
  ExerciseAgeGroup,
  ExerciseListElemFragment,
  useFlatExerciseTagsQuery,
  useSearchExercisesLazyQuery,
} from "@/generated/graphql.tsx";
import { DifficultySelectorList } from "@/pages/ExerciseListPage/DifficultySelectorList.tsx";
import { searchDefaultValues } from "@/pages/ExerciseListPage/SearchDefaultValues.tsx";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { entries, uniqBy } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useEffectOnce, useToggle } from "react-use";
import { useImmer } from "use-immer";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import { StyledTableCell } from "@/components/StyledTableCell.tsx";
import { TagSelector } from "@/pages/ExerciseListPage/TagSelector.tsx";

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
  includeTags: string[];
  excludeTags: string[];
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
  const [data, setData] = useImmer<ExerciseListElemFragment[]>([]);
  const [getData, { loading }] = useSearchExercisesLazyQuery({
    fetchPolicy: "cache-and-network",
  });
  const [orderBy, setOrderBy] = useState<keyof Exercise | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data: tags } = useFlatExerciseTagsQuery();

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
          orderBy: orderBy,
          orderDirection: order === "asc" ? "ASC" : "DESC",
          includeTags: exerciseQuery.includeTags,
          excludeTags: exerciseQuery.excludeTags,
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
    exerciseQuery.includeTags,
    exerciseQuery.excludeTags,
    exerciseQuery.searchQuery,
    orderBy,
    order,
    setData,
    setHasMore,
  ]);

  const [resetSignal, reset] = useToggle(false);
  useEffectOnce(() => {
    fetchMore();
  });
  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  useEffect(() => {
    setData([]);
    setLoadingSkip(-1);
    setHasMore(true);
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseQuery, orderBy, order]);

  const headCells: {
    id: keyof Exercise;
    label: string;
    sortable: boolean;
  }[] = [
    {
      id: "id",
      label: "fID",
      sortable: true,
    },
    {
      id: "difficulty",
      label: "Nehézség",
      sortable: false,
    },
    {
      id: "status",
      label: "Státusz",
      sortable: true,
    },
    {
      id: "tags",
      label: "Címkék",
      sortable: false,
    },
    {
      id: "description",
      label: "Feladat",
      sortable: true,
    },
    {
      id: "createdAt",
      label: "Létrehozva",
      sortable: true,
    },
  ];

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
          {exerciseQuery.searchQuery}
          <SimpleAccordion summary="Nehézség szűrő">
            <DifficultySelectorList
              difficulties={exerciseQuery.difficulty}
              setExerciseQuery={setExerciseQuery}
            />
          </SimpleAccordion>
          <SimpleAccordion summary="Címke szűrő">
            {tags && (
              <TagSelector
                tags={tags?.flatExerciseTags}
                selectedTags={exerciseQuery.includeTags}
                excludeTags={exerciseQuery.excludeTags}
                setFieldValue={setExerciseQuery}
              />
            )}
          </SimpleAccordion>

          <Stack direction="row" alignItems="center" gap={2}>
            <Typography>Döntő</Typography>
            <Checkbox
              checked={exerciseQuery.isFinal}
              onChange={(_, checked) => {
                setExerciseQuery((draft) => {
                  if (checked === draft.isFinal) return;
                  draft.isFinal = checked;
                });
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
        <Box sx={{ overflowX: "auto", mx: -2 }}>
          <Table
            sx={{
              minWidth: 650,
              mt: 4,
              overflow: "hidden",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <StyledTableRow>
                {headCells.map((headCell) => (
                  <StyledTableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={headCell.id === "tags" ? { pl: 2.5 } : {}}
                  >
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={() => {
                          setOrderBy(headCell.id);
                          setOrder((order) =>
                            order === "asc" ? "desc" : "asc",
                          );
                        }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
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
        </Box>
      </CardContent>
    </Card>
  );
};
