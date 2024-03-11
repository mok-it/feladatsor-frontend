import Chip from "@mui/material/Chip";
import { categoryColors } from "@/theme/palette.ts";
import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import tinycolor from "tinycolor2";

type ValueProps = {
  value: { [key in ExerciseAgeGroup]: number };
};
export const CategoryDifficulties = (props: ValueProps) => {
  return (
    <>
      {(Object.keys(props.value) as ExerciseAgeGroup[]).map((key) => (
        <Chip
          key={key}
          label={props.value[key]}
          sx={{
            backgroundColor: categoryColors[key],
            color: tinycolor(categoryColors[key]).isDark() ? "white" : "black",
            fontWeight: 700,
          }}
        />
      ))}
    </>
  );
};
