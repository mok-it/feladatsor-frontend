import ExerciseCard from "@/components/compose/ExerciseCard";
import { useSelectExerciseQuery } from "@/generated/graphql.tsx";
import { composeAtom, sheetIdAtom } from "@/util/atoms";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { COMPOSE_HEIGHT } from "@/util/const";
import {
  type UniqueIdentifier,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box, Skeleton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { FC, useCallback, useContext, useMemo, useRef } from "react";
import { useToggle } from "react-use";
import { ContainerContext } from "./Container";
import { ItemMenu } from "./ItemMenu";
import { Placeholder } from "./Placeholder";
import { CommentSection } from "@/components/CommentSection";

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
  const [items, setItems] = useAtom(composeAtom);
  const sheetId = useAtomValue(sheetIdAtom);

  // Detect if item is persisted (UUID) or draft (short uniqueId)
  const isPersisted = cardId.length > 10;

  const height = view === "all" ? COMPOSE_HEIGHT.SHORT : COMPOSE_HEIGHT.TALL;
  const isSelected =
    containerId === selectedContainer && order === selectedOrder;

  const dndId = `${containerId}:${order}`;
  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    transform,
    isDragging,
  } = useDraggable({
    id: dndId,
    data: { containerId, order },
    disabled: !id || exerciseView !== ExerciseView.CARD,
  });
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: dndId,
    data: { containerId, order },
  });

  const onClick = useCallback(() => {
    if (exerciseView !== ExerciseView.CARD) return;
    if (!containerId) return;
    if (isSelected) {
      clear();
    } else {
      setSelected(containerId, order);
    }
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
            <Box
              position={"absolute"}
              sx={{ inset: 0, zIndex: -1, userSelect: "none" }}
            >
              <Placeholder order={order} />
            </Box>
          </>
        )}
      </Box>
    ),
    [cardId, data, id, loading, order, view],
  );

  const [open, toggle] = useToggle(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      anchorRef.current = node;
      setDragRef(node);
      setDropRef(node);
    },
    [setDragRef, setDropRef],
  );

  return (
    <>
      <Box
        data-card-id={cardId}
        ref={setRef}
        {...attributes}
        {...listeners}
        position="relative"
        width={"100%"}
        height={height}
        minHeight={COMPOSE_HEIGHT.SHORT}
        style={{
          transform: CSS.Translate.toString(transform),
          opacity: isDragging ? 0.4 : 1,
          zIndex: isDragging ? 1000 : undefined,
          touchAction: "none",
        }}
        sx={{
          transition: "outline 0.2s, background-color 0.2s",
          borderRadius: 1,
          border: "1px solid #e0e0e0",
          outline: isSelected
            ? "2px solid highlight"
            : isOver && !isDragging
              ? "2px dashed #1976d2"
              : "2px solid transparent",
          cursor: !id
            ? "default"
            : exerciseView === ExerciseView.CARD
              ? isDragging
                ? "grabbing"
                : "grab"
              : "default",
        }}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle();
        }}
      >
        {memoizedCard}

        {/* Item/Exercise Comment (Top-Right) */}
        <Box
          className="comment-triggers"
          position="absolute"
          top={-15}
          right={-15}
          zIndex={110}
          sx={{
            opacity: 0,
            transition: "opacity 0.2s",
            ".MuiBox-root:hover > &": { opacity: 1 },
            '&:has(button[data-has-comments="true"])': { opacity: 1 },
            pointerEvents: "auto",
          }}
        >
          <Tooltip title="Komment a feladat elhelyezéséhez">
            <Box>
              <CommentSection
                targetId={cardId}
                mode={isPersisted ? "graphql-sheet" : "local-context"}
                sheetId={sheetId || undefined}
                sheetCommentTarget="OrderedExercise"
                iconSize="small"
              />
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <ItemMenu {...{ id, open, toggle, order, anchorRef }} />
    </>
  );
};
