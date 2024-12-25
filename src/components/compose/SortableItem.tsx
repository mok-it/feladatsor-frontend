import ExerciseCard from "@/components/compose/ExerciseCard";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useSelectExerciseQuery } from "@/generated/graphql.tsx";

export const Item: FC<{
  id: UniqueIdentifier;
  isDragging?: boolean;
}> = ({ id, isDragging = false }) => {
  //const exercises = useAtomValue(exerciseCardsAtom);
  //const exercise = exercises.find((exercise) => exercise.id === id);

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

const SortableItem: FC<{ id: UniqueIdentifier }> = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    alignSelf: "stretch",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id} isDragging={isDragging} />
    </div>
  );
};

export default SortableItem;
