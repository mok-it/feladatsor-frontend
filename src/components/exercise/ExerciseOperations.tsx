import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Card, Divider, Typography, Stack, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { orderBy, union, uniqBy } from "lodash";
import dayjs from "dayjs";

import {
  ExerciseCheckFragment,
  ExerciseCommentFragment,
  SelectExerciseQuery,
  useCommentsByExerciseQuery,
  useDeleteExerciseCommentMutation,
  useExerciseHistoryByExerciseQuery,
} from "@/generated/graphql";

import { Checks } from "../Checks";
import { AlertDialog } from "../Dialog";
import { UserItem } from "../UserItem";
import { ExerciseChecks } from "./ExerciseChecks";
import { ExerciseStatusSelector } from "./ExerciseStatusSelector";
import { ExerciseCommentSection } from "./ExerciseCommentSection";
import { HistoryList } from "./HistoryList";

export const ExerciseOperations: FC<{
  exercise: SelectExerciseQuery["exercise"];
  updateSignal: boolean;
}> = ({ exercise, updateSignal }) => {
  exercise = exercise!;
  const exerciseId = exercise.id;
  const { enqueueSnackbar } = useSnackbar();
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [commentToEdit, setCommentToEdit] = useState<ExerciseCommentFragment | null>(null);
  const [newChecks, setNewChecks] = useState<ExerciseCheckFragment[]>([]);

  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: refetchComments,
  } = useCommentsByExerciseQuery({
    variables: { exerciseId },
    fetchPolicy: "no-cache",
  });

  const {
    data: historyData,
    loading: historyLoading,
    refetch: refetchHistories,
  } = useExerciseHistoryByExerciseQuery({ variables: { exerciseId } });

  const [deleteComment] = useDeleteExerciseCommentMutation();

  useEffect(() => {
    void refetchComments();
    void refetchHistories();
  }, [refetchComments, refetchHistories, updateSignal]);

  const history = useMemo(() => {
    return orderBy(
      [
        ...(historyData?.exerciseHistoryByExercise.map((history) => ({
          ...history,
          historyType: "history" as const,
        })) || []),
        ...[...(exercise?.checks || []), ...newChecks].map((check) => ({
          ...check,
          historyType: "check" as const,
        })),
        ...(commentsData?.commentsByExercise.map((comment) => ({
          ...comment,
          historyType: "comment" as const,
        })) || []),
      ],
      "createdAt",
      sort,
    );
  }, [
    commentsData?.commentsByExercise,
    exercise.checks,
    historyData?.exerciseHistoryByExercise,
    newChecks,
    sort,
  ]);

  const checks = uniqBy(
    orderBy(union(exercise.checks, newChecks), "createdAt", "desc"),
    (item) => item.user.id,
  );

  const handleCommentDelete = useCallback(
    async (commentId: string) => {
      await deleteComment({
        variables: { deleteExerciseCommentId: commentId },
      });
      enqueueSnackbar({ variant: "success", message: "Komment törölve" });
      setCommentToDelete(null);
      void refetchComments();
    },
    [deleteComment, enqueueSnackbar, refetchComments],
  );

  const loading = commentsLoading || historyLoading;

  return (
    <>
      <AlertDialog
        open={commentToDelete !== null}
        title="Biztosan törlöd ezt a kommentedet?"
        description={
          commentsData?.commentsByExercise.find((c) => c.id === commentToDelete)
            ?.comment || ""
        }
        secondaryClick={() => setCommentToDelete(null)}
        primaryClick={() => handleCommentDelete(commentToDelete!)}
      />
      
      <Card sx={{ borderRadius: { xs: 0, md: 1 } }}>
        <Stack p={2} gap={2}>
          <ExerciseStatusSelector
            exerciseId={exerciseId}
            currentStatus={exercise.status}
          />
          
          <Divider sx={{ mx: -2 }} />
          
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography variant="body1" mr={1}>
              Ellenőrzések
            </Typography>
            <Checks data={checks} />
            <Box flexGrow={1} />
            <ExerciseChecks
              exerciseId={exercise.id}
              onCheck={(check) => {
                setNewChecks((prev) => [...prev, check]);
              }}
            />
          </Stack>
          
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography variant="body1" mr={1}>
              Lektorálások
            </Typography>
          </Stack>

          <Box>
            <Typography component="div" sx={{ color: "text.primary", mb: 1 }}>
              {exercise.contributors.length > 0 ? "Beküldők " : "Beküldő"}
            </Typography>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              flexWrap="wrap"
            >
              <UserItem user={exercise.createdBy} />
              {exercise.contributors.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </Stack>
          </Box>
          
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ color: "text.secondary", textAlign: "right" }}>
              <Typography component="span" sx={{ color: "text.primary" }}>
                Készült:{" "}
              </Typography>
              {dayjs(+exercise?.createdAt).format("YYYY. MM. DD. HH.mm")}
            </Typography>
          </Stack>
          
          <Divider sx={{ mx: -2 }} />
          
          <ExerciseCommentSection
            exerciseId={exerciseId}
            onCommentCreated={refetchComments}
            editComment={commentToEdit}
            onEditComment={setCommentToEdit}
          />
          
          <HistoryList
            history={history}
            sort={sort}
            onSortChange={setSort}
            onCommentDelete={setCommentToDelete}
            onCommentEdit={setCommentToEdit}
            loading={loading}
          />
        </Stack>
      </Card>
    </>
  );
};