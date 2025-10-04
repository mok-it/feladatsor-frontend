import ExerciseCard from "@/components/compose/ExerciseCard";
import { useSelectExerciseQuery } from "@/generated/graphql.tsx";
import { composeAtom } from "@/util/atoms";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { COMPOSE_HEIGHT } from "@/util/const";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { uniqueId } from "lodash";
import { FC, useCallback, useContext, useMemo } from "react";
import { ContainerContext } from "./Container";
import { Placeholder } from "./Placeholder";

export const Item: FC<{
  order: number;
  id: UniqueIdentifier | null;
  cardId: string;
}> = ({ id, order, cardId }) => {
  const { data, loading } = useSelectExerciseQuery({
    variables: {
      exerciseId: String(id),
    },
    skip: !id,
  });
  const containerId = useContext(ContainerContext);
  const clear = composeStore((state) => state.clear);
  const setSelected = composeStore((state) => state.setSelected);
  const selectedContainer = composeStore((state) => state.selectedContainer);
  const selectedOrder = composeStore((state) => state.selectedOrder);
  const exerciseView = composeStore((state) => state.exerciseView);
  const view = composeStore((state) => state.view);
  const setItems = useSetAtom(composeAtom);

  const height =
    view === "all"
      ? COMPOSE_HEIGHT.SHORT
      : exerciseView === ExerciseView.CARD
        ? COMPOSE_HEIGHT.TALL
        : "fit-content";

  const onClick = useCallback(() => {
    if (exerciseView !== ExerciseView.CARD) return;
    if (!containerId) return;

    if (containerId === selectedContainer && order === selectedOrder) {
      // same as selected
      clear();
    } else if (selectedContainer && selectedOrder !== null) {
      // something is selected
      if (containerId === "talon") {
        // talon is selected
        // act like nothing was selected
        setSelected(containerId, order);
        return;
      }
      setItems((draft) => {
        const aId = draft[selectedContainer][selectedOrder].id;
        const aCardId = draft[selectedContainer][selectedOrder].cardId;
        const bId = draft[containerId][order].id;
        const bCardId = draft[containerId][order].cardId;
        draft[containerId][order] = { id: aId, cardId: aCardId };
        if (selectedContainer !== "talon") {
          draft[selectedContainer][selectedOrder] = {
            id: bId,
            cardId: bCardId,
          };
        } else {
          draft[selectedContainer][selectedOrder].cardId = uniqueId();
        }
      });
      clear();
    } else if (id) {
      // nothing is selected
      setSelected(containerId, order);
    }
  }, [
    clear,
    containerId,
    exerciseView,
    id,
    order,
    selectedContainer,
    selectedOrder,
    setItems,
    setSelected,
  ]);

  const memoizedCard = useMemo(
    () => (
      <Box position={"relative"}>
        {id && data?.exercise && (
          <motion.div
            layout
            id={`${view}-${cardId}`}
            layoutId={`${view}-${cardId}`}
            style={{ zIndex: 100 }}
          >
            <ExerciseCard id={id} exercise={data.exercise} />
          </motion.div>
        )}
        <Box position={"absolute"} sx={{ inset: 0, zIndex: -1 }}>
          <Placeholder order={order} height={height} />
        </Box>
      </Box>
    ),
    [cardId, data?.exercise, height, id, order, view],
  );

  if (loading) {
    return (
      <Skeleton
        width={"100%"}
        height={height}
        sx={{ minHeight: COMPOSE_HEIGHT.SHORT }}
      />
    );
  }

  return (
    <Box
      width={"100%"}
      height={height}
      minHeight={COMPOSE_HEIGHT.SHORT}
      sx={{
        transition: "0.2s",
        borderRadius: 1,
        border:
          containerId === selectedContainer && order === selectedOrder
            ? "1px solid highlight"
            : "1px solid #e0e0e0",
        ":hover": selectedContainer && {
          border: "1px solid highlight",
          cursor: exerciseView === ExerciseView.CARD ? "pointer" : "default",
        },
      }}
      onClick={onClick}
    >
      {memoizedCard}
    </Box>
  );
};
