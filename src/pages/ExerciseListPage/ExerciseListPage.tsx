import {
  ExerciseAgeGroup,
  useSearchExercisesQuery,
} from "@/generated/graphql.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { entries } from "lodash";
import { IoSearch } from "react-icons/io5";
import { useImmer } from "use-immer";
import { MultiSelect } from "@/components/MultiSelect.tsx";
import { ExerciseItem, ExerciseList } from "@/components/ExerciseList.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import { DifficultySelectorList } from "@/pages/ExerciseListPage/DifficultySelectorList.tsx";
import { searchDefaultValues } from "@/pages/ExerciseListPage/SearchDefaultValues.tsx";
import { useEffect, useState } from "react";

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

export const ExerciseListPage = () => {
  const [exerciseQuery, setExerciseQuery] =
    useImmer<ExerciseQuery>(searchDefaultValues);
  const [pagination, setPagination] = useState({ fromRow: 0, toRow: 10 });

  const [tableData, setTableData] = useState<ExerciseItem[]>([]);

  const { data, loading, error } = useSearchExercisesQuery({
    variables: {
      query: {
        fromRow: pagination.fromRow,
        toRow: pagination.toRow,
        difficulty: entries(exerciseQuery.difficulty)
          .filter(([, diff]) => diff.isEnabled)
          .map(([ageGroup, difficulty]) => {
            return {
              ageGroup: ageGroup as ExerciseAgeGroup,
              min: difficulty.difficulty[0],
              max: difficulty.difficulty[1],
            };
          }),
        queryStr: exerciseQuery.searchQuery,
        tags: [],
        excludeTags: [],
      },
    },
  });

  useEffect(() => {
    if (data) {
      setTableData(
        data.searchExercises.exercises.map((exercise) => {
          return {
            fakeId: exercise.id,
            categoryDifficulties: exercise.difficulty.reduce(
              (prev, current) => {
                return {
                  ...prev,
                  [current.ageGroup]: current.difficulty,
                };
              },
              {},
            ) as { [key in ExerciseAgeGroup]: number },
            state: "ACTIVE",
            tags: exercise.tags.map((tag) => tag.name),
            hasPicture: true,
            description: exercise.description,
          };
        }),
      );
    }
  }, [data]);

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
          <SimpleAccordion summary="Nehétség szűrő">
            <DifficultySelectorList
              difficulties={exerciseQuery.difficulty}
              setExerciseQuery={setExerciseQuery}
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

        <ExerciseList
          setPagination={setPagination}
          dataSource={{
            data: tableData,
            loading: loading,
            error: error?.message,
          }}
        />
      </CardContent>
    </Card>
  );
};
