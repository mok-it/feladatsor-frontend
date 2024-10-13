import Check from "@/components/Check";
import History from "@/components/History";
import Section from "@/components/Section";
import {
  ExerciseCheckFragment,
  ExerciseCommentFragment,
  SelectExerciseQuery,
  useCommentsByExerciseQuery,
  useCreateExerciseCommentMutation,
  useDeleteExerciseCommentMutation,
} from "@/generated/graphql";
import { userAtom } from "@/util/atoms";
import { translateCheck } from "@/util/translateCheck";
import { ExerciseStatusEnum } from "@/util/types";
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { orderBy, times } from "lodash";
import { useSnackbar } from "notistack";
import { FC, useCallback, useMemo, useState } from "react";
import {
  MdArrowDownward,
  MdCheckCircle,
  MdOutlineDelete,
  MdSend,
} from "react-icons/md";
import { AlertDialog } from "./Dialog";
import { ExerciseChecks } from "./ExerciseChecks";

export const ExerciseOperations: FC<{
  exercise: SelectExerciseQuery["exercise"];
}> = ({ exercise }) => {
  exercise = exercise!;
  const exerciseId = exercise.id;
  const status = exercise.status;
  const { enqueueSnackbar } = useSnackbar();
  const user = useAtomValue(userAtom);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [comment, setComment] = useState<string>("");
  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: refetchComments,
  } = useCommentsByExerciseQuery({
    variables: { exerciseId },
    fetchPolicy: "no-cache",
  });
  const [createComment] = useCreateExerciseCommentMutation();
  const onComment = useCallback(async () => {
    if (!comment) return;
    setComment("");
    await createComment({
      variables: { comment: comment!, exerciseId },
    });
    enqueueSnackbar({ variant: "success", message: "Komment elküldve" });
    refetchComments();
  }, [comment, createComment, enqueueSnackbar, exerciseId, refetchComments]);

  const [newChecks, setNewChecks] = useState<ExerciseCheckFragment[]>([]);
  const history = useMemo(() => {
    return orderBy(
      [
        ...[...exercise.checks, ...newChecks].map((check) => ({
          ...check,
          historyType: "check",
        })),
        ...(commentsData?.commentsByExercise.map((comment) => ({
          ...comment,
          historyType: "comment",
        })) || []),
      ],
      "createdAt",
      sort,
    );
  }, [commentsData?.commentsByExercise, exercise.checks, newChecks, sort]);

  const [deleteComment] = useDeleteExerciseCommentMutation();
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const loading = commentsLoading;

  return (
    <Grid item xs={12} lg={5}>
      <AlertDialog
        open={commentToDelete !== null}
        title="Biztosan törlöd ezt a kommentedet?"
        description={
          commentsData?.commentsByExercise.find((c) => c.id === commentToDelete)
            ?.comment || ""
        }
        secondaryClick={() => setCommentToDelete(null)}
        primaryClick={async () => {
          await deleteComment({
            variables: { deleteExerciseCommentId: commentToDelete! },
          });
          enqueueSnackbar({ variant: "success", message: "Komment törölve" });
          setCommentToDelete(null);
          refetchComments();
        }}
      />
      <Card>
        <Stack p={2} gap={2}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Státusz</Typography>
            <Select
              size="small"
              defaultValue={status}
              onChange={async () => {
                // await updateExercise({
                //   variables: {
                //     id: exerciseId,
                //     input: {
                //       status: e.target.value as ExerciseStatus,
                //     },
                //   },
                // });
              }}
            >
              <MenuItem value={ExerciseStatusEnum.CREATED}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <MdSend />
                  Beküldve
                </Stack>
              </MenuItem>
              <MenuItem value={ExerciseStatusEnum.APPROVED}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <MdCheckCircle color="green" />
                  Kész
                </Stack>
              </MenuItem>
              <MenuItem value={ExerciseStatusEnum.DELETED}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <MdOutlineDelete color="red" />
                  Törölve
                </Stack>
              </MenuItem>
            </Select>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={0.5}>
            <Typography variant="body1" mr={1}>
              Ellenőrzések
            </Typography>
            {[...exercise.checks, ...newChecks].map((check) => (
              <Check
                key={check.id}
                response={check.type}
                userName={check.user.name}
                timestamp={check.createdAt}
              />
            ))}
            {exercise.checks.length + newChecks.length <= 3 &&
              times(3 - (exercise.checks.length + newChecks.length), (i) => (
                <Check key={i} response={null} userName={""} timestamp={""} />
              ))}
            <Box flexGrow={1} />
            <ExerciseChecks
              exerciseId={exercise.id}
              onCheck={(check) => {
                setNewChecks((prev) => [...prev, check]);
              }}
            />
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={0.5}>
            <Typography variant="body1" mr={1}>
              Lektorálások
            </Typography>
          </Stack>
          <Section text="Komment">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onComment();
              }}
            >
              <Stack direction={"row"} gap={1}>
                <Box flexGrow={1}>
                  <TextField
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                    fullWidth
                    size="small"
                  ></TextField>
                </Box>
                <Button type="submit" variant="contained" endIcon={<MdSend />}>
                  Küld
                </Button>
              </Stack>
            </form>
          </Section>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Typography variant="h5">Történet</Typography>
            <Box flexGrow={1} />
            <motion.div
              animate={{
                transform: sort === "asc" ? "rotate(0deg)" : "rotate(-180deg)",
              }}
            >
              <IconButton
                onClick={() =>
                  setSort((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                <MdArrowDownward />
              </IconButton>
            </motion.div>
          </Stack>
          <Stack spacing={2} py={2}>
            {loading && <Typography>Töltés...</Typography>}
            {history.map((item) => {
              switch (item.historyType) {
                case "comment": {
                  const comment = item as ExerciseCommentFragment;
                  return (
                    <History
                      userName={comment.createdBy.name}
                      createdAt={comment.createdAt}
                      key={comment.id}
                    >
                      <Box sx={{ ml: 4, mr: 6, mt: 1 }}>
                        <Typography sx={{ wordBreak: "break-all" }}>
                          <i>{comment.comment}</i>
                        </Typography>
                        {comment.createdBy.id === user?.user?.id && (
                          <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                            <IconButton
                              onClick={() => setCommentToDelete(item.id)}
                            >
                              <MdOutlineDelete />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </History>
                  );
                }
                case "check": {
                  const check = item as ExerciseCheckFragment;
                  return (
                    <History
                      userName={check.user.name}
                      createdAt={check.createdAt}
                      key={check.id}
                    >
                      <Stack
                        direction={"row"}
                        gap={1}
                        sx={{ ml: 4, mr: 6, mt: 1 }}
                      >
                        <Check
                          hideTooltip
                          response={check.type}
                          userName={check.user.name}
                          timestamp={check.createdAt}
                        />
                        <Typography sx={{ wordBreak: "break-all" }}>
                          {translateCheck(check.type)}
                        </Typography>
                        {/* {check.user.id === user?.user?.id && (
                          <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                            <IconButton
                              onClick={() => setCommentToDelete(item.id)}
                            >
                              <MdOutlineDelete />
                            </IconButton>
                          </Box>
                        )} */}
                      </Stack>
                    </History>
                  );
                }
                default:
                  return null;
              }
            })}
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};
