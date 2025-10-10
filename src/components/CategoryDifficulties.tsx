import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import { categoryColors } from "@/theme/palette.ts";
import { Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import tinycolor from "tinycolor2";
import { ageGroupTexts } from "@/util/const.ts";

type ValueProps = {
  value: { [key in ExerciseAgeGroup]: number };
};
export const CategoryDifficulties = (props: ValueProps) => {
  return (
    <>
      {(Object.keys(props.value) as ExerciseAgeGroup[]).map((key) => (
        <Tooltip key={key} title={ageGroupTexts[key]} placement="top">
          <Chip
            label={props.value[key]}
            size="small"
            sx={{
              backgroundColor: categoryColors[key],
              color: tinycolor(categoryColors[key]).isDark()
                ? "white"
                : "black",
              fontWeight: 700,
              mr: 0.5,
              mb: 0.5,
              opacity: props.value[key] === 0 ? 0.2 : 1,
            }}
          />
        </Tooltip>
      ))}
    </>
  );
};
