import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { entries } from "lodash";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Updater, useImmer } from "use-immer";
import { MultiSelect } from "@/components/MultiSelect.tsx";
import { ExerciseList } from "@/components/ExerciseList.tsx";
import { DifficultySelector } from "@/pages/ExerciseListPage/DifficultySelector.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";

type DifficultySelect = {
  [key in ExerciseAgeGroup]: {
    difficulty: [number, number]; // [min, max]
    isEnabled: boolean;
  };
};

function DifficultySelectorList({
  difficulties,
  setDifficulties,
}: {
  difficulties: DifficultySelect;
  setDifficulties: Updater<DifficultySelect>;
}) {
  return (
    <Stack>
      {entries(difficulties).map(([difficultyName, ageGroup]) => {
        return (
          <DifficultySelector
            key={difficultyName}
            ageGroup={difficultyName as ExerciseAgeGroup}
            difficulty={ageGroup.difficulty}
            setDifficulty={(value) =>
              setDifficulties((draft) => {
                draft[difficultyName as ExerciseAgeGroup].difficulty = value;
              })
            }
            isEnabled={ageGroup.isEnabled}
            setIsEnabled={(isEnabled) =>
              setDifficulties((draft) => {
                draft[difficultyName as ExerciseAgeGroup].isEnabled = isEnabled;
              })
            }
          />
        );
      })}
    </Stack>
  );
}

export const ExerciseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulties, setDifficulties] = useImmer<DifficultySelect>({
    KOALA: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    MEDVEBOCS: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    NAGYMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    KISMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    JEGESMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
  });
  return (
    <Card>
      <CardHeader title="Feladatok keresése" />
      <CardContent>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <SimpleAccordion summary="Nehétség szűrő">
              <DifficultySelectorList
                difficulties={difficulties}
                setDifficulties={setDifficulties}
              />
            </SimpleAccordion>
          </Grid>
          <Grid item xs={0.5}>
            <Checkbox />
          </Grid>
          <Grid item xs={0.5}>
            <Stack justifyContent={"center"} height={"100%"}>
              Döntő
            </Stack>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={0.5}>
            <Checkbox />
          </Grid>
          <Grid item xs={0.5}>
            <Stack justifyContent={"center"} height={"100%"}>
              Talon
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <MultiSelect items={["Gellért hegy", "Városliget"]} />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <TextField
          onChange={(event) => setSearchTerm(event.target.value)}
          label="Keresés"
          value={searchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearch />
              </InputAdornment>
            ),
          }}
          size="small"
        />
        <ExerciseList
          data={[
            {
              fakeId: "ab-012",
              categoryDifficulties: {
                JEGESMEDVE: 1,
                KISMEDVE: 2,
                MEDVEBOCS: 3,
                NAGYMEDVE: 4,
                KOALA: 2,
              },
              hasPicture: false,
              description:
                "Ez egy példa feladat kacsa kacsakacsakacsakacsakacsakacsa ",
              state: "Checked",
              tags: ["Kombinatorika", "Permutáció"],
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};
