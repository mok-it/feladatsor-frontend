import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import { DifficultySelector } from "@/pages/ExerciseListPage/DifficultySelector.tsx";
import { DifficultySelect, ExerciseQuery } from "@/util/types";
import { Stack } from "@mui/material";
import { entries } from "lodash";
import { Updater } from "use-immer";

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
              if (
                draft.difficulty[difficultyName as ExerciseAgeGroup]
                  .difficulty === value
              ) {
                return draft;
              }
              draft.difficulty[difficultyName as ExerciseAgeGroup].difficulty =
                value;
            })
          }
          isEnabled={ageGroup.isEnabled}
          setIsEnabled={(isEnabled) =>
            setExerciseQuery((draft) => {
              if (
                draft.difficulty[difficultyName as ExerciseAgeGroup]
                  .isEnabled === isEnabled
              ) {
                return draft;
              }
              draft.difficulty[difficultyName as ExerciseAgeGroup].isEnabled =
                isEnabled;
            })
          }
        />
      );
    })}
  </Stack>
);
