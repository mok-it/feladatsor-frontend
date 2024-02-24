import AgeContainer from "@/components/compose/AgeContainer";
import ExerciseCard from "@/components/compose/ExerciseCard";
import { SortableItem } from "@/components/compose/SortableItem";
import { SortableOverlay } from "@/components/compose/SortableOverlay";
import { Exercise, ExerciseAgeGroup } from "@/generated/graphql";
import { levels } from "@/util/types";
import type { Active } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { entries, flatten, values } from "lodash";
import { FC, useCallback, useMemo, useState } from "react";
import { useImmer } from "use-immer";

export type FakeId = { fakeId: string };

const mock: Exercise & FakeId = {
  __typename: "Exercise",
  fakeId: "24-0123-4567",
  name: "name",
  checks: [],
  difficulty: [
    { ageGroup: "KOALA", difficulty: 10, __typename: "ExerciseDifficulty" },
    { ageGroup: "MEDVEBOCS", difficulty: 8, __typename: "ExerciseDifficulty" },
    { ageGroup: "KISMEDVE", difficulty: 4, __typename: "ExerciseDifficulty" },
    { ageGroup: "NAGYMEDVE", difficulty: 2, __typename: "ExerciseDifficulty" },
    { ageGroup: "JEGESMEDVE", difficulty: 1, __typename: "ExerciseDifficulty" },
  ],
  helpingQuestions: [],
  history: [],
  similarExercises: [],
  id: "1",
  description: "description",
  solution: "solution",
  createdBy: {
    __typename: "User",
    id: "1",
    name: "name",
    email: "email",
    exercises: [],
    updatedAt: dayjs().toISOString(),
    createdAt: dayjs().toISOString(),
    userName: "userName",
  },
  createdAt: dayjs().toISOString(),
  updatedAt: dayjs().toISOString(),
};

const mock2 = {
  ...mock,
  id: "2",
  fakeId: "a-1",
};
const mock3 = {
  ...mock,
  id: "3",
  fakeId: "b-2",
};

const ExerciseCompose: FC = () => {
  const [groups, setGroups] = useImmer<{
    [key in ExerciseAgeGroup]: { [key in number]?: (Exercise & FakeId)[] };
  }>({
    KOALA: { 0: [mock], 1: [], 2: [], 3: [] },
    MEDVEBOCS: { 0: [mock2], 1: [], 2: [], 3: [] },
    KISMEDVE: { 0: [mock3], 1: [], 2: [], 3: [] },
    NAGYMEDVE: { 0: [], 1: [], 2: [], 3: [] },
    JEGESMEDVE: { 0: [], 1: [], 2: [], 3: [] },
  });
  const allItems = useMemo(
    () => flatten(flatten(values(groups).map((group) => values(group)))),
    [groups]
  );

  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => allItems.find((item) => item?.id === active?.id),
    [active, allItems]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const replace = useCallback(
    (
      fromGroup: ExerciseAgeGroup,
      fromlevel: number,
      fromIndex: number,
      toGroup: ExerciseAgeGroup,
      toLevel: number,
      toIndex: number | null
    ) => {
      if (
        fromGroup === toGroup &&
        fromlevel === toLevel &&
        fromIndex === toIndex
      )
        return;
      if (fromGroup === toGroup && fromlevel === toLevel) {
        setGroups((draft) => {
          const temp = draft[fromGroup][fromlevel];
          const item = temp?.[fromIndex];
          if (!item) return;
          temp?.splice(fromIndex, 1);
          if (toIndex === null) {
            temp?.push(item);
          } else {
            temp?.splice(toIndex, 0, item);
          }
          draft[fromGroup][fromlevel] = temp;
        });
      } else {
        setGroups((draft) => {
          const item = draft[fromGroup][fromlevel]?.[fromIndex];
          if (!item) return;

          const tempFrom = draft[fromGroup][fromlevel];
          const tempTo = draft[toGroup][toLevel];

          tempFrom?.splice(fromIndex, 1);

          if (!toIndex) {
            tempTo?.push(item);
          } else {
            tempTo?.splice(toIndex, 0, item);
          }
          draft[fromGroup][fromlevel] = tempFrom;
          draft[toGroup][toLevel] = tempTo;
        });
      }
    },
    [setGroups]
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          setActive(active);
        }}
        onDragEnd={({ active, over }) => {
          if (!active || !over) return;
          try {
            const fromId = active.data.current?.sortable?.containerId;
            const toId = over.data.current?.sortable?.containerId ?? over.id;
            const [fromGroup, fromlevel] = fromId.split("-");
            const [toGroup, toLevel] = toId.split("-");
            if (fromId === toId) {
              const fromIndex: number = active.data.current?.sortable.index;
              const toIndex: number = over.data.current?.sortable.index;
              replace(
                fromGroup,
                +fromlevel,
                fromIndex,
                toGroup,
                +toLevel,
                toIndex
              );
            }
            setActive(null);
          } catch (e) {
            console.log("error", e);
          }
        }}
        onDragCancel={() => {
          setActive(null);
        }}
        onDragOver={({ active, over }) => {
          if (!active || !active.data.current || !over) return;
          const fromId = active.data.current?.sortable.containerId;
          const toId = over.data.current?.sortable.containerId ?? over.id;
          const [fromGroup, fromlevel] = fromId.split("-");
          const [toGroup, toLevel] = toId.split("-");
          if (fromGroup === toGroup && fromlevel === toLevel) {
            return;
          }
          const fromIndex = active.data.current?.sortable.index;
          const toIndex = over.data.current?.sortable.index || null;
          replace(fromGroup, +fromlevel, fromIndex, toGroup, +toLevel, toIndex);
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"stretch"}
          sx={{ height: "100%" }}
          divider={<Divider orientation={"horizontal"} />}
        >
          {[0, 1, 2, 3].map((level) => (
            <Stack
              key={level}
              direction={"row"}
              justifyContent={"stretch"}
              gap={2}
              divider={<Divider orientation={"vertical"} />}
            >
              <Stack width={120} alignItems={"end"} justifyContent={"center"}>
                {levels[level].name}
              </Stack>
              {entries(groups).map(([key, items]) => (
                <AgeContainer
                  key={key}
                  ageGroup={key as ExerciseAgeGroup}
                  id={`${key}-${level}`}
                  level={level}
                  items={items[level] || []}
                />
              ))}
            </Stack>
          ))}
          <SortableOverlay>
            {activeItem && (
              <SortableItem id={activeItem.id}>
                <ExerciseCard exercise={activeItem} />
              </SortableItem>
            )}
          </SortableOverlay>
        </Stack>
      </DndContext>
    </>
  );
};

export default ExerciseCompose;
