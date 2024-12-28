import type { UniqueIdentifier } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { createContext, memo, type FC } from "react";

import { Stack } from "@mui/material";
import { Item } from "./Item";

export const ContainerContext = createContext<string | null>(null);

const Container: FC<{ items: UniqueIdentifier[]; id: string }> = ({
  items,
  id,
}) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Stack
      ref={setNodeRef}
      height={"100%"}
      alignItems={"center"}
      gap={1}
      pb={4}
    >
      {items.map((cardId: UniqueIdentifier) => (
        <Item key={cardId} id={cardId} />
      ))}
    </Stack>
  );
};

const MemoizedContainer = memo(Container);
export default MemoizedContainer;
