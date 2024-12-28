import ExerciseCard from "@/components/compose/ExerciseCard";
import { useSelectExerciseQuery } from "@/generated/graphql.tsx";
import { composeAtom } from "@/util/atoms";
import { composeStore, ExerciseView } from "@/util/composeStore";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { Box, Skeleton } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useContext } from "react";
import { ContainerContext } from "./Container";
import { Placeholder } from "./Placeholder";

export const Item: FC<{
  order: number;
  id: UniqueIdentifier | null;
}> = ({ id, order }) => {
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
  const items = useAtomValue(composeAtom);

  const height =
    exerciseView === ExerciseView.CARD
      ? view === "all"
        ? 76
        : 200
      : "fit-content";
  if (loading) {
    return <Skeleton width={"100%"} height={height} />;
  }
  return (
    <Box
      width={"100%"}
      height={height}
      sx={{
        transition: "0.2s",
        borderRadius: 1,
        border:
          containerId === selectedContainer && order === selectedOrder
            ? "2px solid highlight"
            : "2px solid transparent",
        ":hover": selectedContainer && {
          border: "2px solid highlight",
          cursor: exerciseView === ExerciseView.CARD ? "pointer" : "default",
        },
      }}
      onClick={() => {
        if (exerciseView !== ExerciseView.CARD) return;
        if (!containerId) return;
        console.log({
          selectedContainer,
          selectedOrder,
          containerId,
          order,
          items,
          id:
            selectedContainer &&
            selectedOrder &&
            items[selectedContainer][selectedOrder],
        });

        if (containerId === selectedContainer && order === selectedOrder) {
          // same as selected
          clear();
        } else if (selectedContainer && selectedOrder !== null) {
          // something is selected
          if (containerId === "talon") return;
          setItems((draft) => {
            const tempId = draft[selectedContainer][selectedOrder];
            draft[containerId][order] = tempId;
            if (selectedContainer !== "talon") {
              draft[selectedContainer][selectedOrder] = id;
            }
          });
          clear();
        } else if (id) {
          // nothing is selected
          setSelected(containerId, order);
        }
      }}
    >
      {id && data?.exercise ? (
        <ExerciseCard id={id} exercise={data.exercise} />
      ) : (
        <Placeholder order={order} />
      )}
    </Box>
  );
};
