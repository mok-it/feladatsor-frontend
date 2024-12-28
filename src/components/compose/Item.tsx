import ExerciseCard from "@/components/compose/ExerciseCard";
import { useSelectExerciseQuery } from "@/generated/graphql.tsx";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { Card, Stack, Typography } from "@mui/material";
import { FC, memo } from "react";

export const Item: FC<{
  id: UniqueIdentifier;
  isDragging?: boolean;
}> = ({ id, isDragging = false }) => {
  const { data, loading } = useSelectExerciseQuery({
    variables: {
      exerciseId: String(id),
    },
  });

  if (!data || !data.exercise) {
    return (
      <Card
        sx={{
          width: 120,
          height: 70,
          borderRadius: 1,
          padding: 1,
          paddingBottom: 1.5,
          cursor: "grab",
          userSelect: "none",
          backgroundColor: "lightgray",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <Stack gap={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="caption">
              {loading ? "Loading" : `Not found ${id}`}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    );
  }
  return (
    <ExerciseCard id={id} exercise={data.exercise} isDragging={isDragging} />
  );
};

const MemoizedItem = memo(Item);
export default MemoizedItem;
