import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TalonItem from "./TalonItem";

const Talon: FC<{ items: UniqueIdentifier[] }> = ({ items }) => {
  const { setNodeRef } = useDroppable({
    id: "talon",
  });

  return (
    <Stack>
      <Typography variant="body1" mb={4} textAlign={"center"}>
        Talon
      </Typography>
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
    </Stack>
  );
};

export default Talon;
