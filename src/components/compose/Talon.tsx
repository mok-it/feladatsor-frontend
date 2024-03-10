import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Stack } from "@mui/material";
import { FC } from "react";
import TalonItem from "./TalonItem";

const Talon: FC<{ items: UniqueIdentifier[] }> = ({ items }) => {
  const { setNodeRef } = useDroppable({
    id: "talon",
  });

  return (
    <SortableContext
      items={items}
      id={"talon"}
      strategy={verticalListSortingStrategy}
    >
      <Stack ref={setNodeRef} gap={1}>
        {items.map((item, index) => (
          <TalonItem key={index} id={item} />
        ))}
      </Stack>
    </SortableContext>
  );
};

export default Talon;
