import {
  ExerciseAgeGroup,
  useSearchExercisesLazyQuery,
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
import { useCallback } from "react";

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

  const [searchExercises, searchExercisesResults] =
    useSearchExercisesLazyQuery();

  const dataGenerator = useCallback(
    async (from: number, to: number): Promise<ExerciseItem[]> => {
      const { data, error } = await searchExercises({
        variables: {
          query: {
            fromRow: from,
            toRow: to,
            difficulty: entries(exerciseQuery.difficulty)
              .filter(([_, diff]) => diff.isEnabled)
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
      if (error) {
        console.error(error);
        return [];
      }
      if (data) {
        return data.searchExercises.exercises.map((exercise) => {
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
        });
      }
      return [];
    },
    [exerciseQuery.difficulty, exerciseQuery.searchQuery],
  );

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
          totalRows={
            searchExercisesResults.data?.searchExercises.totalCount ?? 0
          }
          dataGenerator={dataGenerator}
        />
      </CardContent>
    </Card>
  );
};
