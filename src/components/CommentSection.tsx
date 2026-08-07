import React, { useMemo } from "react";
import { IconButton, Badge } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentPopup, CommentData } from "./CommentPopup";
import { useCommentPopup } from "@/hooks/useCommentPopup";
import { useAuth } from "@/pages/AuthContext";
import {
  useCreateExerciseCommentMutation,
  useDeleteExerciseCommentMutation,
  useSelectExerciseQuery,
  useExerciseSheetQuery,
  useCreateExerciseSheetCommentMutation,
  useResolveExerciseSheetCommentMutation,
  useDeleteExerciseSheetCommentMutation,
} from "@/generated/graphql";
import { useSnackbar } from "notistack";

interface CommentSectionProps {
  targetId: string;
  mode: "graphql-exercise" | "graphql-sheet";
  exerciseId?: string; // Required if mode is 'graphql-exercise'

  // For graphql-sheet mode
  sheetId?: string;
  sheetCommentTarget?: "Sheet" | "SheetItem" | "OrderedExercise";

  className?: string;
  iconSize?: "small" | "medium" | "large";
}

const toCommentTimestamp = (
  value: number | string | Date | null | undefined,
) => {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === "number") {
    return value;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  const numericValue = Number(value);
  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  const parsedValue = new Date(value);
  return Number.isNaN(parsedValue.getTime()) ? 0 : parsedValue.getTime();
};

export const CommentSection: React.FC<CommentSectionProps> = ({
  targetId,
  mode,
  exerciseId,
  sheetId,
  sheetCommentTarget,
  iconSize = "medium",
}) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    isOpen,
    anchorPosition,
    activeThreadId,
    openComments,
    closeComments,
  } = useCommentPopup();

  // --- GraphQL Exercise Logic ---
  const { data: exerciseData, refetch: refetchExercise } =
    useSelectExerciseQuery({
      variables: { exerciseId: exerciseId || "" },
      skip: mode !== "graphql-exercise" || !exerciseId,
      fetchPolicy: "cache-and-network",
    });

  const [createExerciseComment] = useCreateExerciseCommentMutation();
  const [deleteExerciseComment] = useDeleteExerciseCommentMutation();

  // --- GraphQL Sheet Logic ---
  const { data: sheetData, refetch: refetchSheetComments } =
    useExerciseSheetQuery({
      variables: { exerciseSheetId: sheetId || "" },
      skip: mode !== "graphql-sheet" || !sheetId,
      fetchPolicy: "cache-and-network",
    });

  const [createSheetComment] = useCreateExerciseSheetCommentMutation();
  const [resolveSheetComment] = useResolveExerciseSheetCommentMutation();
  const [deleteSheetComment] = useDeleteExerciseSheetCommentMutation();
  const canResolveComments = mode === "graphql-sheet";

  // --- Unified Data ---
  const comments: CommentData[] = useMemo(() => {
    const sortComments = (items: CommentData[]) =>
      [...items].sort((a, b) => {
        const timestampDiff =
          toCommentTimestamp(a.createdAt) - toCommentTimestamp(b.createdAt);

        if (timestampDiff !== 0) {
          return timestampDiff;
        }

        return a.id.localeCompare(b.id);
      });

    if (mode === "graphql-exercise" && exerciseData?.exercise) {
      return sortComments(
        exerciseData.exercise.comments.map((c) => ({
          id: c.id,
          text: c.comment,
          createdAt: c.createdAt,
          user: {
            name: c.createdBy.name,
            avatarUrl: c.createdBy.avatarUrl,
          },
          isResolved: false,
          resolvedAt: null,
        })),
      );
    } else if (mode === "graphql-sheet" && sheetData?.exerciseSheet) {
      let filtered: typeof sheetData.exerciseSheet.comments = [];

      if (sheetCommentTarget === "Sheet") {
        filtered = sheetData.exerciseSheet.comments;
      } else if (sheetCommentTarget === "SheetItem") {
        filtered =
          sheetData.exerciseSheet.sheetItems.find(
            (item) => item.id === targetId,
          )?.comments || [];
      } else if (sheetCommentTarget === "OrderedExercise") {
        filtered = [
          ...sheetData.exerciseSheet.sheetItems.flatMap((item) =>
            item.exercises
              .filter((exercise) => exercise.id === targetId)
              .flatMap((exercise) => exercise.comments),
            ),
        ];
      }

      return sortComments(
        filtered.map((c) => ({
          id: c.id,
          text: c.comment,
          createdAt: c.createdAt,
          user: {
            name: c.user.name,
            avatarUrl: c.user.avatarUrl,
          },
          isResolved: c.isResolved,
          resolvedAt: c.resolvedAt,
        })),
      );
    }
    return [];
  }, [mode, targetId, exerciseData, sheetData, sheetCommentTarget]);

  const unresolvedCommentCount = comments.filter(
    (comment) => !comment.isResolved,
  ).length;
  const hasComments = comments.length > 0;
  const commentButtonLabel =
    mode === "graphql-exercise"
      ? "Komment a feladathoz"
      : sheetCommentTarget === "Sheet"
        ? "Komment a feladatsorhoz"
        : sheetCommentTarget === "SheetItem"
          ? "Komment a kategóriához"
          : "Komment a feladat elhelyezéséhez";
  const hasUnresolvedComments = unresolvedCommentCount > 0;
  const commentIconColor = hasUnresolvedComments
    ? "primary"
    : hasComments
      ? "success"
      : "default";
  const badgeColor = hasUnresolvedComments
    ? "secondary"
    : hasComments
      ? "success"
      : "default";

  // --- Handlers ---
  const handleAddComment = async (text: string) => {
    if (!user) {
      enqueueSnackbar("Jelentkezz be a kommenteléshez", { variant: "warning" });
      return;
    }

    if (mode === "graphql-exercise" && exerciseId) {
      try {
        await createExerciseComment({
          variables: {
            exerciseId,
            comment: text,
            contributors: [],
          },
        });
        await refetchExercise();
        enqueueSnackbar("Komment hozzáadva", { variant: "success" });
      } catch (e) {
        console.error(e);
        enqueueSnackbar("Hiba a komment hozzáadásakor", { variant: "error" });
      }
    } else if (mode === "graphql-sheet" && sheetId) {
      try {
        await createSheetComment({
          variables: {
            input: {
              comment: text,
              exerciseSheetId:
                sheetCommentTarget === "Sheet" ? targetId : undefined,
              exerciseSheetItemId:
                sheetCommentTarget === "SheetItem" ? targetId : undefined,
              exerciseOnExerciseSheetItemId:
                sheetCommentTarget === "OrderedExercise" ? targetId : undefined,
            },
          },
        });
        await refetchSheetComments();
        enqueueSnackbar("Komment hozzáadva", { variant: "success" });
      } catch (e) {
        console.error(e);
        enqueueSnackbar("Hiba a komment hozzáadásakor", { variant: "error" });
      }
    }
  };

  const handleResolveComment = async (commentId: string) => {
    if (mode === "graphql-sheet") {
      try {
        await resolveSheetComment({
          variables: { id: commentId },
        });
        await refetchSheetComments();
      } catch (e) {
        console.error(e);
        enqueueSnackbar("Hiba a komment megoldásakor", { variant: "error" });
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (mode === "graphql-exercise") {
      try {
        await deleteExerciseComment({
          variables: { deleteExerciseCommentId: commentId },
        });
        await refetchExercise();
        enqueueSnackbar("Komment törölve", { variant: "success" });
      } catch (e) {
        console.error(e);
        enqueueSnackbar("Hiba a komment törlésekor", { variant: "error" });
      }
    } else if (mode === "graphql-sheet") {
      try {
        await deleteSheetComment({
          variables: { id: commentId },
        });
        await refetchSheetComments();
        enqueueSnackbar("Komment törölve", { variant: "success" });
      } catch (e) {
        console.error(e);
        enqueueSnackbar("Hiba a komment törlésekor", { variant: "error" });
      }
    }
  };

  return (
    <>
      <IconButton
        aria-label={commentButtonLabel}
        size={iconSize}
        onClick={(e) => openComments(e, targetId)}
        color={commentIconColor}
        data-has-comments={hasComments ? "true" : "false"}
      >
        <Badge badgeContent={comments.length} color={badgeColor}>
          <CommentIcon
            fontSize={iconSize === "large" ? "inherit" : undefined}
          />
        </Badge>
      </IconButton>

      <CommentPopup
        open={isOpen && activeThreadId === targetId}
        anchorPosition={anchorPosition}
        comments={comments}
        onResolve={canResolveComments ? handleResolveComment : undefined}
        onDelete={handleDeleteComment}
        onClose={closeComments}
        onAdd={handleAddComment}
        currentUser={
          user ? { name: user.name, avatarUrl: user.avatarUrl } : undefined
        }
      />
    </>
  );
};
