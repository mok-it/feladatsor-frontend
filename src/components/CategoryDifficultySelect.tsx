import { blueGrey, brown } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { Grid, Stack, Switch, Typography } from "@mui/material";
import { ageGroupTexts } from "@/types/ageGroupTexts.ts";
import {
  ExerciseAgeGroup,
  ExerciseDifficultyInput,
} from "@/generated/graphql.tsx";
import { ChangeEvent, useEffect, useState } from "react";

type CategoryDifficultySelectProps = {
  onChange: (value: ExerciseDifficultyInput[]) => void;
  values: ExerciseDifficultyInput[];
};

export const CategoryDifficultySelect = (
  props: CategoryDifficultySelectProps,
) => {
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        {Object.entries(ageGroupTexts).map(([ageGroupKey, ageGroup]) => (
          <ColorRadioButtons
            name={ageGroup}
            handleChange={(value) => {
              if (!props.values.find((v) => v.ageGroup === ageGroupKey)) {
                props.onChange([
                  ...props.values,
                  {
                    ageGroup: ageGroupKey as ExerciseAgeGroup,
                    difficulty: parseInt(value),
                  },
                ]);
                return;
              }
              const newValues = props.values.map((v) => {
                if (v.ageGroup === ageGroupKey) {
                  return {
                    ...v,
                    difficulty: parseInt(value),
                  };
                }
                return v;
              });
              props.onChange(newValues);
            }}
            selectedValue={
              props.values
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

export const ColorRadioButtons = (props: ColorRadioButtonProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.handleChange(event.target.value);
  };
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isDisabled) {
      props.handleChange("0");
    }
  }, [isDisabled]);

  const controlProps = (item: string) => ({
    checked: props.selectedValue === item,
    onChange: handleChange,
    value: item,
    inputProps: { "aria-label": item },
  });

  return (
    <Stack direction={"row"} alignItems="center">
      <Switch
        value={isDisabled}
        onChange={(_, checked) => setIsDisabled(!checked)}
      />
      <Typography
        sx={{ width: "95px" }}
        color={isDisabled ? "text.disabled" : undefined}
      >
        {props.name}
      </Typography>
      <Radio disabled={isDisabled} {...controlProps("1")} color="success" />
      <Radio
        disabled={isDisabled}
        {...controlProps("2")}
        sx={{
          color: brown[800],
          "&.Mui-checked": {
            color: brown[600],
          },
        }}
      />
      <Radio
        disabled={isDisabled}
        {...controlProps("3")}
        sx={{
          color: blueGrey[800],
          "&.Mui-checked": {
            color: blueGrey[600],
          },
        }}
      />
      <Radio disabled={isDisabled} {...controlProps("4")} color="warning" />
    </Stack>
  );
};
