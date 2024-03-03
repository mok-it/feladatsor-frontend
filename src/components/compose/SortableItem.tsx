import type {
  DraggableAttributes,
  UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Stack, Typography } from "@mui/material";

interface Props {
  id: UniqueIdentifier;
}

  if (!exercise) {
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
            <Typography variant="caption">Not found {id}</Typography>
          </Stack>
        </Stack>
      </Card>
    );
  }
  return (
    <ExerciseCard id={id} exercise={exercise.data} isDragging={isDragging} />
  );
};

export const SortableItemContext = createContext<Context>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
  ref() {},
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}
