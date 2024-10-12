import type { UniqueIdentifier } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createContext, memo, type FC } from "react";

import { ExerciseView, composeStore } from "@/util/composeStore";
import { Stack } from "@mui/material";
import SortableItem from "./SortableItem";

export const ContainerContext = createContext<string | null>(null);

const Container: FC<{ items: UniqueIdentifier[]; id: string }> = ({
  items,
  id,
}) => {
  const exerciseView = composeStore((state) => state.exerciseView);
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <ContainerContext.Provider value={id}>
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        id={id}
        disabled={exerciseView === ExerciseView.LIST}
      >
        <Stack
          ref={setNodeRef}
          height={"100%"}
          alignItems={"center"}
          gap={1}
          pb={4}
        >
          {items.map((cardId: UniqueIdentifier) => (
            <SortableItem key={cardId} id={cardId} />
          ))}
        </Stack>
      </SortableContext>
    </ContainerContext.Provider>
  );
};

const MemoizedContainer = memo(Container);
export default MemoizedContainer;
