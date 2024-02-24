import { Exercise, ExerciseAgeGroup } from "@/generated/graphql";
import { FakeId } from "@/pages/ExcerciseCompose";
import { ageGroups } from "@/util/types";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";
import ExerciseCard from "./ExerciseCard";
import { SortableItem } from "./SortableItem";

const AgeContainer: FC<{
  id: string;
  ageGroup: ExerciseAgeGroup;
  level: number;
  items: (Exercise & FakeId)[];
}> = ({ id, ageGroup, level, items }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Stack direction={"column"} flexGrow={1}>
      {level === 0 && (
        <Typography textAlign={"center"}>
          {ageGroups[ageGroup]?.name}
        </Typography>
      )}
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} style={{ height: "75%" }}>
          <Stack
            gap={2}
            py={2}
            direction={"column"}
            width={120}
            margin={"auto"}
          >
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <ExerciseCard exercise={item} />
              </SortableItem>
            ))}
          </Stack>
        </div>
      </SortableContext>
    </Stack>
  );
};

export default AgeContainer;
