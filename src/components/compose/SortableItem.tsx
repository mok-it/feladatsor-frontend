import ExerciseCard from "@/components/compose/ExerciseCard";
import { composeStore } from "@/util/composeStore";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FC } from "react";

export const Item: FC<{
  id: UniqueIdentifier;
  isDragging?: boolean;
}> = ({ id, isDragging = false }) => {
  const exercises = composeStore((state) => state.exercises);
  const exercise = exercises.find((exercise) => exercise.id === id);

  if (!exercise) {
    return null;
  }
  return <ExerciseCard exercise={exercise} isDragging={isDragging} />;
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
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id} isDragging={isDragging} />
    </div>
  );
};

export default SortableItem;
