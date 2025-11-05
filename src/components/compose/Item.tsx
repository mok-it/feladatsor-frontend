import ExerciseCard from "@/components/compose/ExerciseCard";
import { useSelectExerciseQuery } from "@/generated/graphql.tsx";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { COMPOSE_HEIGHT } from "@/util/const";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { FC, useCallback, useContext, useMemo, useRef } from "react";
import { useToggle } from "react-use";
import { ContainerContext } from "./Container";
import { ItemMenu } from "./ItemMenu";
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
  const containerId = useContext(ContainerContext)!;
  const clear = composeStore((state) => state.clear);
  const setSelected = composeStore((state) => state.setSelected);
  const selectedContainer = composeStore((state) => state.selectedContainer);
  const selectedOrder = composeStore((state) => state.selectedOrder);
  const exerciseView = composeStore((state) => state.exerciseView);
  const view = composeStore((state) => state.view);

  const height = view === "all" ? COMPOSE_HEIGHT.SHORT : COMPOSE_HEIGHT.TALL;
  const isSelected =
    containerId === selectedContainer && order === selectedOrder;

  const onClick = useCallback(() => {
    if (exerciseView !== ExerciseView.CARD) return;
    if (!containerId) return;

    if (isSelected) {
      // same as selected
      clear();
    } else {
      setSelected(containerId, order);
    }

    // else if (selectedContainer && selectedOrder !== null) {
    //   // something is selected
    //   if (containerId === "talon") {
    //     // talon is selected
    //     // act like nothing was selected
    //     setSelected(containerId, order);
    //     return;
    //   }
    //   setItems((draft) => {
    //     const aId = draft[selectedContainer][selectedOrder].id;
    //     const aCardId = draft[selectedContainer][selectedOrder].cardId;
    //     const bId = draft[containerId][order].id;
    //     const bCardId = draft[containerId][order].cardId;
    //     draft[containerId][order] = { id: aId, cardId: aCardId };
    //     if (selectedContainer !== "talon") {
    //       draft[selectedContainer][selectedOrder] = {
    //         id: bId,
    //         cardId: bCardId,
    //       };
    //     } else {
    //       draft[selectedContainer][selectedOrder].cardId = uniqueId();
    //     }
    //   });
    //   clear();
    // } else {
    //   // nothing is selected
    //   setSelected(containerId, order);
    // }
  }, [clear, containerId, exerciseView, isSelected, order, setSelected]);

  const memoizedCard = useMemo(
    () => (
      <Box position={"relative"} sx={{ height: "100%" }}>
        {loading ? (
          <Skeleton
            sx={{ height: "100%", transform: "none", borderRadius: "7px" }}
          />
        ) : (
          <>
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
              <Placeholder order={order} />
            </Box>
          </>
        )}
      </Box>
    ),
    [cardId, data, id, loading, order, view],
  );

  const [open, toggle] = useToggle(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        data-card-id={cardId}
        ref={anchorRef}
        width={"100%"}
        height={height}
        minHeight={COMPOSE_HEIGHT.SHORT}
        sx={{
          transition: "0.2s",
          borderRadius: 1,
          border: isSelected ? "1px solid highlight" : "1px solid #e0e0e0",
          ":hover": {
            border: "1px solid highlight",
            cursor: exerciseView === ExerciseView.CARD ? "pointer" : "default",
          },
        }}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle();
        }}
      >
        {memoizedCard}
      </Box>
      <ItemMenu {...{ id, open, toggle, order, anchorRef }} />
    </>
  );
};
