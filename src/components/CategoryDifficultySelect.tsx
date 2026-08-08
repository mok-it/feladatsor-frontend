import {
  ExerciseAgeGroup,
  ExerciseDifficultyInput,
} from "@/generated/graphql.tsx";
import { ageGroupGradeRanges, ageGroupTexts } from "@/util/const";
import { Box, Grid, Switch, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { blueGrey, brown } from "@mui/material/colors";
import { ChangeEvent, FC } from "react";

const difficultyValues = [1, 2, 3, 4] as const;

const difficultyGridSx = {
  display: "grid",
  gridTemplateColumns: "40px minmax(128px, 1fr) repeat(4, 36px)",
  alignItems: "center",
  maxWidth: 420,
};

export const CategoryDifficultySelect: FC<{
  difficulty: ExerciseDifficultyInput[];
  onChange: (value: ExerciseDifficultyInput[]) => void;
}> = ({ difficulty, onChange }) => {
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Box sx={difficultyGridSx} aria-hidden="true">
          <Box sx={{ gridColumn: "1 / 3" }} />
          {difficultyValues.map((value) => (
            <Typography key={value} align="center" fontWeight={700}>
              {value}
            </Typography>
          ))}
        </Box>
        {Object.entries(ageGroupTexts).map(([ageGroupKey, name]) => {
          const ageGroup = ageGroupKey as ExerciseAgeGroup;

          return (
            <ColorRadioButtons
              key={ageGroup}
              name={`${name} (${ageGroupGradeRanges[ageGroup]})`}
              handleChange={(value) => {
                if (!difficulty.find((v) => v.ageGroup === ageGroup)) {
                  onChange([
                    ...difficulty,
                    {
                      ageGroup,
                      difficulty: parseInt(value),
                    },
                  ]);
                  return;
                }
                const newValues = difficulty.map((v) => {
                  if (v.ageGroup === ageGroup) {
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
                  .find((value) => value.ageGroup === ageGroup)
                  ?.difficulty.toString() ?? "0"
              }
            />
          );
        })}
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
    inputProps: { "aria-label": `${name}, ${item}-es nehézség` },
  });

  return (
    <Box sx={difficultyGridSx}>
      <Switch
        size="small"
        checked={selectedValue !== "0"}
        onChange={() => propHandleChange(selectedValue === "0" ? "1" : "0")}
        inputProps={{ "aria-label": `${name} bekapcsolása` }}
      />
      <Typography
        sx={{ whiteSpace: "nowrap", fontSize: { xs: "0.875rem", sm: "1rem" } }}
        color={selectedValue === "0" ? "text.disabled" : undefined}
      >
        {name}
      </Typography>
      <Radio
        {...controlProps("1")}
        color="success"
        size="small"
        sx={{ p: 1 }}
      />
      <Radio
        {...controlProps("2")}
        size="small"
        sx={{
          p: 1,
          color: brown[800],
          "&.Mui-checked": {
            color: brown[600],
          },
        }}
      />
      <Radio
        {...controlProps("3")}
        size="small"
        sx={{
          p: 1,
          color: blueGrey[800],
          "&.Mui-checked": {
            color: blueGrey[600],
          },
        }}
      />
      <Radio
        {...controlProps("4")}
        color="warning"
        size="small"
        sx={{ p: 1 }}
      />
    </Box>
  );
};
