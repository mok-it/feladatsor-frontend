import Chip from "@mui/material/Chip";
import { categoryColors } from "@/theme/palette.ts";

const getCategoryColor = (index: number): string => {
  let getCategoryColors = [
    categoryColors.KOALA,
    categoryColors.MEDVEBOCS,
    categoryColors.NAGYMEDVE,
    categoryColors.KISMEDVE,
    categoryColors.JEGESMEDVE,
  ];
  return getCategoryColors[index];
};

type ValueProps = {
  value: number[];
};
export const CategoryDifficulties = (props: ValueProps) => {
  return (
    <>
      {props.value.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          sx={{
            backgroundColor: getCategoryColor(index),
            fontWeight: 700,
          }}
        />
      ))}
    </>
  );
};
