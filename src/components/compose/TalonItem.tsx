import { composeStore } from "@/util/composeStore";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";
import ExerciseCard from "./ExerciseCard";

const TalonItem: FC<{ id: UniqueIdentifier }> = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const exercises = composeStore((state) => state.exercises);
  const exercise = exercises.find((exercise) => exercise.id === id);

  if (!exercise) {
    return null;
  }
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ExerciseCard exercise={exercise.data} isTalon isDragging={isDragging} />
    </div>
  );
};

export default TalonItem;
