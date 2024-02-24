import ExerciseCard from "@/components/compose/ExerciseCard";
import ExerciseContainer from "@/components/compose/ExerciseContainer";
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
import { Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import dayjs from "dayjs";
import { entries, flatten, random, union, values } from "lodash";
import { FC, useCallback, useMemo, useState } from "react";
import { useImmer } from "use-immer";

export type LocalExerciseProps = { fakeId: string };
export type ExerciseCopy = {
  id: string;
  data: Exercise & LocalExerciseProps;
};

const mock: ExerciseCopy = {
  id: "1",
  data: {
    __typename: "Exercise",
    fakeId: "24-0123-4567",
    checks: [],
    difficulty: [
      { ageGroup: "KOALA", difficulty: 10, __typename: "ExerciseDifficulty" },
      {
        ageGroup: "MEDVEBOCS",
        difficulty: 8,
        __typename: "ExerciseDifficulty",
      },
      { ageGroup: "KISMEDVE", difficulty: 4, __typename: "ExerciseDifficulty" },
      {
        ageGroup: "NAGYMEDVE",
        difficulty: 2,
        __typename: "ExerciseDifficulty",
      },
      {
        ageGroup: "JEGESMEDVE",
        difficulty: 1,
        __typename: "ExerciseDifficulty",
      },
    ],
    helpingQuestions: [],
    history: [],
    id: "1",
    description: "description",
    solution: "solution",
    alternativeDifficultyExercises: [],
    sameLogicExercises: [],
    comments: [],
    solutionOptions: [],
    status: "CREATED",
    tags: [],
    elaboration: "elaboration",
    elaborationImage: null,
    exerciseImage: null,
    isCompetitionFinal: false,
    solveIdea: "",
    source: "source",
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
  },
};

const mock2 = {
  data: {
    ...mock.data,
    fakeId: "ab-2837-1234",
  },
  id: "2",
};
const mock3 = {
  data: {
    ...mock.data,
    fakeId: "ku-2837-1234",
  },
  id: "3",
};

const ExerciseCompose: FC = () => {
  const [talon, setTalon] = useImmer<ExerciseCopy[]>([mock, mock2, mock3]);
  const [groups, setGroups] = useImmer<{
    [key in ExerciseAgeGroup]: {
      [key in number]?: ExerciseCopy[];
    };
  }>({
    KOALA: { 0: [], 1: [], 2: [], 3: [] },
    MEDVEBOCS: { 0: [], 1: [], 2: [], 3: [] },
    KISMEDVE: { 0: [], 1: [], 2: [], 3: [] },
    NAGYMEDVE: { 0: [], 1: [], 2: [], 3: [] },
    JEGESMEDVE: { 0: [], 1: [], 2: [], 3: [] },
  });
  const allItems = useMemo(
    () =>
      union(
        talon,
        flatten(flatten(values(groups).map((group) => values(group)))),
      ),
    [groups, talon],
  );
  const [lastTalonInsert, setLastTalonInsert] = useState<{
    group: ExerciseAgeGroup;
    level: number;
    index: number;
  } | null>(null);
  const [active, setActive] = useState<
    (Active & { preventCopy?: boolean }) | null
  >(null);
  const activeItem = useMemo(
    () => allItems.find((item) => item?.id === active?.id),
    [active, allItems],
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const insertExercise = useCallback(
    (toGroup: ExerciseAgeGroup, toLevel: number, toIndex: number | null) => {
      if (!activeItem) return;
      if (lastTalonInsert) {
        setGroups((draft) => {
          draft[lastTalonInsert.group][lastTalonInsert.level]?.splice(
            lastTalonInsert.index,
            1,
          );
        });
      }
      console.log("insert", toGroup, toLevel, toIndex);
      const newId = activeItem.id.split("/")[0] + "/" + random(10000, 99999);

      setTalon((draft) => {
        // update the talon item id
        const index = draft.findIndex((item) => item.id === activeItem.id);
        draft[index].id = newId;
      });

      setGroups((draft) => {
        const temp = draft[toGroup][toLevel];
        if (!temp) return;
        if (toIndex === null) {
          temp.push(activeItem);
        } else {
          temp.splice(toIndex, 0, activeItem);
        }
        draft[toGroup][toLevel] = temp;
      });
      setLastTalonInsert({
        group: toGroup,
        level: toLevel,
        index: toIndex ?? 0,
      });
    },
    [activeItem, lastTalonInsert, setGroups, setTalon],
  );

  const replace = useCallback(
    (
      fromGroup: ExerciseAgeGroup,
      fromlevel: number,
      fromIndex: number,
      toGroup: ExerciseAgeGroup,
      toLevel: number,
      toIndex: number | null,
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
          if (!activeItem) return;
          temp?.splice(fromIndex, 1);
          if (toIndex === null) {
            temp?.push(activeItem);
          } else {
            temp?.splice(toIndex, 0, activeItem);
          }
          draft[fromGroup][fromlevel] = temp;
        });
      } else {
        setGroups((draft) => {
          if (!activeItem) return;

          const tempFrom = draft[fromGroup][fromlevel];
          const tempTo = draft[toGroup][toLevel];

          tempFrom?.splice(fromIndex, 1);

          if (!toIndex) {
            tempTo?.push(activeItem);
          } else {
            tempTo?.splice(toIndex, 0, activeItem);
          }

          draft[fromGroup][fromlevel] = tempFrom;
          draft[toGroup][toLevel] = tempTo;
        });
      }
    },
    [activeItem, setGroups],
  );

  return (
    <Stack direction={"row"} gap={2}>
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          console.log("active", active.id);
          setActive(active);
        }}
        onDragEnd={({ active, over }) => {
          console.log("onDragEnd");
          if (!active || !over) return;
          try {
            const fromId = active.data.current?.sortable?.containerId;
            const toId = over.data.current?.sortable?.containerId ?? over.id;
            if (toId === "talon") return;
            const [fromGroup, fromlevel] = fromId.split("-");
            const [toGroup, toLevel] = toId.split("-");
            const fromIndex: number = active.data.current?.sortable.index;
            const toIndex: number = over.data.current?.sortable.index;
            if (fromId === toId && fromId !== "talon") {
              replace(
                fromGroup,
                +fromlevel,
                fromIndex,
                toGroup,
                +toLevel,
                toIndex,
              );
            } else if (fromId === "talon") {
              insertExercise(toGroup, +toLevel, toIndex);
            }
          } catch (e) {
            console.log("error", e);
          }
          setActive(null);
          setLastTalonInsert(null);
        }}
        onDragCancel={() => {
          setActive(null);
          setLastTalonInsert(null);
        }}
        onDragOver={({ active: newActive, over }) => {
          console.log("onDragOver", newActive, over);
          try {
            if (!newActive || !newActive.data.current || !over) return;
            const fromId = newActive.data.current?.sortable.containerId;
            const toId = over.data.current?.sortable.containerId ?? over.id;
            if (toId === "talon") return;
            const [fromGroup, fromlevel] = fromId.split("-");
            const [toGroup, toLevel] = toId.split("-");
            if (fromGroup === toGroup && fromlevel === toLevel) {
              return;
            }
            const fromIndex = newActive.data.current?.sortable.index;
            const toIndex = over.data.current?.sortable.index || null;
            console.log(fromId, toId, fromIndex, toIndex);
            if (fromId !== "talon") {
              replace(
                fromGroup,
                +fromlevel,
                fromIndex,
                toGroup,
                +toLevel,
                toIndex,
              );
            } else {
              insertExercise(toGroup, +toLevel, toIndex);
            }
          } catch (e) {
            console.log("error", e);
          }
        }}
      >
        <Box flexGrow={0}>
          <Typography variant="subtitle1" textAlign={"center"} mt={2}>
            Talon
          </Typography>
          <ExerciseContainer
            isTalon
            ageGroup={null}
            id={`talon`}
            level={0}
            items={talon}
          />
        </Box>
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
              <Stack
                width={120}
                alignItems={"end"}
                justifyContent={"center"}
                paddingTop={level === 0 ? 5 : 0}
              >
                {levels[level].name}
              </Stack>
              {entries(groups).map(([key, items]) => (
                <ExerciseContainer
                  isTalon={false}
                  key={key}
                  ageGroup={key as ExerciseAgeGroup}
                  id={`${key}-${level}`}
                  level={level}
                  items={items[level] || []}
                />
              ))}
            </Stack>
          ))}
        </Stack>
        <SortableOverlay>
          {activeItem && (
            <SortableItem id={activeItem.id}>
              <ExerciseCard exercise={activeItem} />
            </SortableItem>
          )}
        </SortableOverlay>
      </DndContext>
    </Stack>
  );
};

export default ExerciseCompose;
