import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import { ageGroupTexts } from "@/util/const";
import { Grid, Slider, Stack, Switch } from "@mui/material";

export const DifficultySelector = (props: {
  ageGroup: ExerciseAgeGroup;
  difficulty: [number, number];
  setDifficulty: (difficulty: [number, number]) => void;
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
}) => {
  return (
    <Grid container>
      <Grid item xs={1}>
        <Switch
          checked={props.isEnabled}
          onChange={(_, checked) => {
            props.setIsEnabled(checked);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Stack justifyContent={"center"} height={"100%"}>
          {ageGroupTexts[props.ageGroup]}
        </Stack>
      </Grid>
      <Grid item xs={8} px={8} pt={1}>
        <Slider
          disabled={!props.isEnabled}
          name="Nehézség"
          value={props.difficulty}
          onChange={(_, value) =>
            props.setDifficulty(value as [number, number])
          }
          step={1}
          min={0}
          max={4}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
};
