import type { UniqueIdentifier } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { FC } from "react";

import { Stack, Typography } from "@mui/material";
import SortableItem from "./SortableItem";

const Container: FC<{ items: UniqueIdentifier[]; id: string }> = ({
  items,
  id,
}) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <SortableContext
      items={items}
      strategy={verticalListSortingStrategy}
      id={id}
    >
      <Stack
        ref={setNodeRef}
        height={"100%"}
        alignItems={"center"}
        gap={1}
        pb={4}
      >
        <Typography component="h3" whiteSpace={"nowrap"}>
          {id}
        </Typography>
        {items.map((id: UniqueIdentifier) => (
          <SortableItem key={id} id={id} />
        ))}
      </Stack>
    </SortableContext>
  );
};

export default Container;
