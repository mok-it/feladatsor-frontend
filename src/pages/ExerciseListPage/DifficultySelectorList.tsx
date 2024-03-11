import { Updater } from "use-immer";
import { Stack } from "@mui/material";
import { entries } from "lodash";
import { DifficultySelector } from "@/pages/ExerciseListPage/DifficultySelector.tsx";
import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import {
  DifficultySelect,
  ExerciseQuery,
} from "@/pages/ExerciseListPage/ExerciseListPage.tsx";

export const DifficultySelectorList = ({
  difficulties,
  setExerciseQuery,
}: {
  difficulties: DifficultySelect;
  setExerciseQuery: Updater<ExerciseQuery>;
}) => (
  <Stack>
    {entries(difficulties).map(([difficultyName, ageGroup]) => {
      return (
        <DifficultySelector
          key={difficultyName}
          ageGroup={difficultyName as ExerciseAgeGroup}
          difficulty={ageGroup.difficulty}
          setDifficulty={(value) =>
            setExerciseQuery((draft) => {
              draft.difficulty[difficultyName as ExerciseAgeGroup].difficulty =
                value;
            })
          }
          isEnabled={ageGroup.isEnabled}
          setIsEnabled={(isEnabled) =>
            setExerciseQuery((draft) => {
              draft.difficulty[difficultyName as ExerciseAgeGroup].isEnabled =
                isEnabled;
            })
          }
        />
      );
    })}
  </Stack>
);
