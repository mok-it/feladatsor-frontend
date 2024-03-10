import { ExerciseAgeGroup } from "@/generated/graphql";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { entries } from "lodash";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { useImmer } from "use-immer";
import { MultiSelect } from "@/components/MultiSelect.tsx";
import { ExerciseList } from "@/components/ExerciseList.tsx";

export const ExerciseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulties, setDifficulties] = useImmer<{
    [key in ExerciseAgeGroup]: [number, number];
  }>({
    KOALA: [0, 2],
    MEDVEBOCS: [0, 2],
    NAGYMEDVE: [0, 2],
    KISMEDVE: [0, 2],
    JEGESMEDVE: [0, 2],
  });
  return (
    <Card>
      <CardHeader title="Feladatok keresése" />
      <CardContent>
        <Grid container>
          {entries(difficulties).map(([difficultyName, [min, max]]) => {
            return (
              <DifficultySelector
                key={difficultyName}
                ageGroup={difficultyName}
                difficulty={[min, max]}
                setDifficulty={(value) =>
                  setDifficulties((draft) => {
                    draft[difficultyName as ExerciseAgeGroup] = value;
                  })
                }
                onNewRowClick={() => {}}
                isLastRow={true}
              />
            );
          })}
        </Grid>
        <Grid container>
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

const DifficultySelector = (props: {
  ageGroup: string;
  // setAgeGroup: (age: string) => void;
  difficulty: [number, number];
  setDifficulty: (difficulty: [number, number]) => void;
  onNewRowClick: () => void;
  isLastRow: boolean;
}) => {
  return (
    <>
      <Grid item xs={1}>
        <Checkbox></Checkbox>
      </Grid>
      <Grid item xs={2}>
        <Stack justifyContent={"center"} height={"100%"}>
          {props.ageGroup}
        </Stack>
      </Grid>
      <Grid item xs={8} px={8} pt={1}>
        <Slider
          name="Nehézség"
          value={props.difficulty}
          onChange={(_, value) =>
            props.setDifficulty(value as [number, number])
          }
          step={1}
          marks
          min={0}
          max={4}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={1}>
        {props.isLastRow && (
          <IconButton color="primary" onClick={() => props.onNewRowClick()}>
            <BiPlus />
          </IconButton>
        )}
      </Grid>
    </>
  );
};
