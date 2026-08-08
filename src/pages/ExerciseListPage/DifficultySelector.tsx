import type { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import { ageGroupTexts } from "@/util/const";
import { Slider, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const DifficultySelector = (props: {
  ageGroup: ExerciseAgeGroup;
  difficulty: [number, number];
  setDifficulty: (difficulty: [number, number]) => void;
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
}) => {
  const [sliderValue, setSliderValue] = useState(props.difficulty);

  useEffect(() => {
    setSliderValue(props.difficulty);
  }, [props.difficulty]);

  return (
    <Stack direction={"row"} alignItems={"center"} pr={4}>
      <Stack
        fontSize={14}
        direction={"row"}
        alignItems={"center"}
        width={170}
        flexShrink={0}
      >
        <Switch
          checked={props.isEnabled}
          onChange={(_, checked) => {
            props.setIsEnabled(checked);
          }}
        />
        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {ageGroupTexts[props.ageGroup]}
        </Typography>
      </Stack>
      <Slider
        disabled={!props.isEnabled}
        name="Nehézség"
        value={sliderValue}
        onChange={(_, value) => setSliderValue(value as [number, number])}
        onChangeCommitted={(_, value) =>
          props.setDifficulty(value as [number, number])
        }
        step={1}
        min={0}
        max={4}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
};
