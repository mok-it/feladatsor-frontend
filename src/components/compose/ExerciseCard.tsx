import { Exercise } from "@/generated/graphql";
import { ageGroups } from "@/util/types";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { entries } from "lodash";
import { FC, useContext } from "react";
import { SortableItemContext } from "./SortableItem";

const ExerciseCard: FC<{
  exercise: Exercise & { fakeId: string };
}> = ({ exercise }) => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <Card
      ref={ref}
      {...attributes}
      {...listeners}
      sx={{
        width: 120,
        borderRadius: 1,
        padding: 1,
        paddingBottom: 1.5,
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <Stack gap={2}>
        <Typography variant="caption">{exercise.fakeId}</Typography>
        <Stack
          direction="row"
          justifyContent={"space-evenly"}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {entries(ageGroups).map(([key]) => (
            <Typography key={key} variant="caption" sx={{ background: "" }}>
              {exercise.difficulty.find((d) => d.ageGroup === key)?.difficulty}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ExerciseCard;
