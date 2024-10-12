import {
  ExerciseAgeGroup,
  ExerciseDifficultyInput,
} from "@/generated/graphql.tsx";
import { ageGroupTexts } from "@/types/ageGroupTexts.ts";
import { Grid, Stack, Switch, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { blueGrey, brown } from "@mui/material/colors";
import { ChangeEvent, FC } from "react";

export const CategoryDifficultySelect: FC<{
  difficulty: ExerciseDifficultyInput[];
  onChange: (value: ExerciseDifficultyInput[]) => void;
}> = ({ difficulty, onChange }) => {
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        {Object.entries(ageGroupTexts).map(([ageGroupKey, ageGroup], index) => (
          <ColorRadioButtons
            key={index}
            name={ageGroup}
            handleChange={(value) => {
              if (!difficulty.find((v) => v.ageGroup === ageGroupKey)) {
                onChange([
                  ...difficulty,
                  {
                    ageGroup: ageGroupKey as ExerciseAgeGroup,
                    difficulty: parseInt(value),
                  },
                ]);
                return;
              }
              const newValues = difficulty.map((v) => {
                if (v.ageGroup === ageGroupKey) {
                  return {
                    ...v,
                    difficulty: parseInt(value),
                  };
                }
                return v;
              });
              console.log({ newValues });
              onChange(newValues);
            }}
            selectedValue={
              difficulty
                .find((value) => value.ageGroup === ageGroupKey)
                ?.difficulty.toString() ?? "0"
            }
          />
        ))}
      </Grid>
    </Grid>
  );
};

type ColorRadioButtonProps = {
  name: string;
  handleChange: (value: string) => void;
  selectedValue: string;
};

export const ColorRadioButtons = ({
  name,
  handleChange: propHandleChange,
  selectedValue,
}: ColorRadioButtonProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    propHandleChange(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
    },
    value: item,
    inputProps: { "aria-label": item },
  });

  return (
    <Stack direction={"row"} alignItems="center">
      <Switch
        checked={selectedValue !== "0"}
        onChange={() => propHandleChange(selectedValue === "0" ? "1" : "0")}
      />
      <Typography
        sx={{ width: "95px" }}
        color={selectedValue === "0" ? "text.disabled" : undefined}
      >
        {name}
      </Typography>
      <Radio {...controlProps("1")} color="success" />
      <Radio
        {...controlProps("2")}
        sx={{
          color: brown[800],
          "&.Mui-checked": {
            color: brown[600],
          },
        }}
      />
      <Radio
        {...controlProps("3")}
        sx={{
          color: blueGrey[800],
          "&.Mui-checked": {
            color: blueGrey[600],
          },
        }}
      />
      <Radio {...controlProps("4")} color="warning" />
    </Stack>
  );
};
