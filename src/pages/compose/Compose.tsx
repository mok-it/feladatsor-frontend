import type {
  CollisionDetection,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  getFirstCollision,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FC, Fragment, useCallback, useEffect, useRef, useState } from "react";

import { Item } from "@/components/compose/SortableItem";
import Talon from "@/components/compose/Talon";
import { ExerciseAgeGroup, ExerciseSheetQuery } from "@/generated/graphql";
import {
  composeAtom,
  exerciseCardsAtom,
  exercisePlacementsAtom,
} from "@/util/atoms";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { ExercisePlacements } from "@/util/types";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { entries, keys, times } from "lodash";
import { useImmer } from "use-immer";
import Container from "../../components/compose/Container";

const Compose: FC<{
  exerciseSheet?: ExerciseSheetQuery["exerciseSheet"] | null;
}> = ({ exerciseSheet }) => {
  const [talon, setTalon] = useImmer<UniqueIdentifier[]>(["1", "2", "3"]);
  const [exercises, setExercises] = useAtom(exerciseCardsAtom);
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const [items, setItems] = useAtom(composeAtom);
  const setPlacements = useSetAtom(exercisePlacementsAtom);

  useEffect(() => {
    setItems((draft) => {
      exerciseSheet?.sheetItems?.forEach(
        (item) => {
          draft[`${item.ageGroup}-${item.level}`] = item.exercises.map(
            (exercise) => exercise.id,
          );
        },
        [exerciseSheet],
      );

      return draft;
    });
  }, [exerciseSheet?.sheetItems, setItems]);

  //console.log({ items });

  // Use the defined sensors for drag and drop operation
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        // Require mouse to move 5px to start dragging, this allow onClick to be triggered on click
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        // Require mouse to move 5px to start dragging, this allow onClick to be triggered on click
        tolerance: 5,
        // Require to press for 100ms to start dragging, this can reduce the chance of dragging accidentally due to page scroll
        delay: 100,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const lastOverId = useRef<UniqueIdentifier | null>(null);

  // Ref to track if an item was just moved to a new container
  const recentlyMovedToNewContainer = useRef(false);

  // Function to find which container an item belongs to
  const findContainer = useCallback(
    (id: UniqueIdentifier, options?: { excludeTalon: boolean }) => {
      if (id === "talon") return id;
      if (!options?.excludeTalon && talon.includes(id)) return "talon";
      // if the id is a container id itself
      if (id in items) return id;
      // find the container by looking into each of them
      return Object.keys(items).find((key) => items[key].includes(id));
    },
    [items, talon],
  );

  // Ref to store the state of items before a drag operation begins
  const itemsBeforeDrag = useRef<null | typeof items>(null);

  const insertCopyToTalon = useCallback(
    (id: UniqueIdentifier) => {
      console.log("insertCopyToTalon", {
        id,
      });
      const talonIndex = talon.indexOf(id);
      const exercise = exercises.find((item) => item.id === id)!;
      const newId = id + ".";
      const newExercise = {
        ...exercise,
        id: newId,
      };
      setExercises((draft) => {
        draft.push(newExercise);
      });
      setTalon((draft) => {
        draft.splice(talonIndex, 1, newId);
      });
    },
    [setExercises, exercises, setTalon, talon],
  );

  const updatePlacements = useCallback(() => {
    const placements: ExercisePlacements = {};
    entries(items).forEach(([group, cards]) => {
      cards.forEach((id) => {
        const exercise = exercises.find((exercise) => exercise.id === id)?.data;
        if (exercise) {
          if (!placements[exercise.id]) {
            placements[exercise.id] = {
              KOALA: 0,
              MEDVEBOCS: 0,
              KISMEDVE: 0,
              NAGYMEDVE: 0,
              JEGESMEDVE: 0,
            };
          }
          placements[exercise.id][group.split("-")[0] as ExerciseAgeGroup]++;
        }
      });
    });
    setPlacements(placements);
  }, [exercises, items, setPlacements]);

  // Function called when a drag operation begins
  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      // Store the current state of items
      itemsBeforeDrag.current = { ...items };
      // Set the active (dragged) item id
      setActiveId(active.id);
    },
    [items],
  );

  // Function called when an item is dragged over another container
  const handleDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      if (!over || active.id in items) {
        return;
      }

      const { id: activeId } = active;
      const { id: overId } = over;

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      // console.log("handleDragOver", {
      //   activeId,
      //   activeContainer,
      //   overContainer,
      // });

      if (!overContainer || !activeContainer) {
        return;
      }
      if (overContainer === "talon") {
        return;
      }
      if (activeContainer === "talon") {
        setItems((items) => {
          // clear duplicate items
          for (const key in items) {
            items[key] = items[key].filter((id) => id !== activeId);
          }
          const overItems = items[overContainer];
          const overIndex = overItems.indexOf(overId);

          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          const newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

          recentlyMovedToNewContainer.current = true;

          items[overContainer] = [
            ...items[overContainer].slice(0, newIndex),
            activeId,
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length,
            ),
          ];
        });
        insertCopyToTalon(activeId);
      } else if (activeContainer !== overContainer) {
        setItems((items) => {
          const activeItems = items[activeContainer];
          const overItems = items[overContainer];
          const overIndex = overItems.indexOf(overId);
          const activeIndex = activeItems.indexOf(activeId);

          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          const newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

          recentlyMovedToNewContainer.current = true;

          const activeTemp = items[activeContainer].filter(
            (item) => item !== active.id,
          );
          const overTemp = [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length,
            ),
          ];
          // update
          items[activeContainer] = activeTemp;
          items[overContainer] = overTemp;
        });
      }
    },
    [items, findContainer, setItems, insertCopyToTalon],
  );

  // Function called when a drag operation ends
  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const activeContainer = findContainer(active.id);
      if (!over || !activeContainer) {
        setActiveId(null);
        return;
      }

      const { id: activeId } = active;
      const { id: overId } = over;

      const overContainer = findContainer(overId);

      if (!overContainer) {
        setActiveId(null);
        return;
      }
      //console.log("handleDragEnd", { activeContainer, active, over });

      if (activeContainer === "talon") {
        const overContainer = findContainer(overId, { excludeTalon: true });
        console.log("talon to", { overContainer });
        if (overContainer) {
          const overIndex = items[overContainer].indexOf(overId);
          setItems((items) => {
            items[overContainer].splice(overIndex, 1, activeId);
          });
          insertCopyToTalon(activeId);
        }
      } else {
        const activeIndex = items[activeContainer].indexOf(activeId);
        const overIndex = items[overContainer].indexOf(overId);
        if (activeIndex !== overIndex) {
          setItems((items) => ({
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex,
            ),
          }));
        }
      }
      updatePlacements();
      setActiveId(null);
    },
    [findContainer, insertCopyToTalon, items, setItems, updatePlacements],
  );

  // Function called when a drag operation is cancelled
  const onDragCancel = useCallback(() => {
    console.log(itemsBeforeDrag.current);
    setActiveId(null);
    if (!itemsBeforeDrag.current) return;
    setItems(() => itemsBeforeDrag.current);
    itemsBeforeDrag.current = null;
  }, [setItems]);

  /**
   * Custom collision detection strategy optimized for multiple containers
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items,
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id),
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items],
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={onDragCancel}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.WhileDragging,
        },
      }}
    >
      <Stack direction={"row"} gap={2} p={2}>
        <Grid container columns={6} spacing={4}>
          {view === "all" && (
            <>
              <Grid item xs={1} />
              {times(5).map((i) => (
                <Grid item key={i} xs={1}>
                  <Typography variant="body1" textAlign={"center"}>
                    {keys(items)[i].split("-")[0]}
                  </Typography>
                </Grid>
              ))}
            </>
          )}
          {entries(items).map(([key, items], index) => {
            return (
              <Fragment key={key}>
                {index % 5 === 0 && (
                  <Grid xs={1} item>
                    <Stack height={"100%"} justifyContent={"center"} pb={4}>
                      <Typography variant="body1" textAlign={"center"}>
                        {index === 0 && "Zöld"}
                        {index === 5 && "Bronz"}
                        {index === 10 && "Ezüst"}
                        {index === 15 && "Arany"}
                      </Typography>
                    </Stack>
                  </Grid>
                )}
                {(view === "all" || key.split("-")[0] === view) && (
                  <Grid
                    item
                    xs={view === "all" ? 1 : 5}
                    borderBottom={"1px solid"}
                    borderColor={"divider"}
                  >
                    <Container id={key} items={items} />
                  </Grid>
                )}
              </Fragment>
            );
          })}
        </Grid>
        {exerciseView !== ExerciseView.LIST && (
          <Box maxWidth={"40%"}>
            <Talon items={talon} />
          </Box>
        )}
        <DragOverlay>
          {activeId ? <Item id={String(activeId)} isDragging /> : null}
        </DragOverlay>
      </Stack>
    </DndContext>
  );
};

export default Compose;
