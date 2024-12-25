import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import { categoryColors } from "@/theme/palette.ts";
import Chip from "@mui/material/Chip";
import tinycolor from "tinycolor2";
import { Tooltip } from "@mui/material";

type ValueProps = {
  value: { [key in ExerciseAgeGroup]: number };
};
export const CategoryDifficulties = (props: ValueProps) => {
  return (
    <>
      {(Object.keys(props.value) as ExerciseAgeGroup[]).map((key) => (
        <Tooltip key={key} title={key} placement="top">
          <Chip
            label={props.value[key]}
            sx={{
              backgroundColor: categoryColors[key],
              color: tinycolor(categoryColors[key]).isDark()
                ? "white"
                : "black",
              fontWeight: 700,
              mr: 0.5,
              visibility: props.value[key] === 0 ? "hidden" : "visible",
            }}
          />
        </Tooltip>
      ))}
    </>
  );
};
