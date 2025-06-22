import Check from "@/components/Check";
import { History } from "@/components/History";
import Section from "@/components/Section";
import {
  ExerciseCheckFragment,
  ExerciseCommentFragment,
  ExerciseHistoryFragment,
  ExerciseStatus,
  HistoryValue,
  SelectExerciseQuery,
  useCommentsByExerciseQuery,
  useCreateExerciseCommentMutation,
  useDeleteExerciseCommentMutation,
  useExerciseHistoryByExerciseQuery,
  useUpdateExerciseMutation,
} from "@/generated/graphql";
import { userAtom } from "@/util/atoms";
import { translateCheck, translateFieldName } from "@/util/const";
import { ExerciseStatusEnum } from "@/util/types";
import {
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { orderBy, union, uniqBy } from "lodash";
import { useSnackbar } from "notistack";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoHourglassOutline } from "react-icons/io5";
import {
  MdArrowDownward,
  MdCheckCircle,
  MdOutlineDelete,
  MdSend,
} from "react-icons/md";
import { Checks } from "../Checks";
import { AlertDialog } from "../Dialog";
import { DiffModal } from "../DiffModal";
import { UserItem } from "../UserItem";
import { ExerciseChecks } from "./ExerciseChecks";

export const ExerciseOperations: FC<{
  exercise: SelectExerciseQuery["exercise"];
  updateSignal: boolean;
}> = ({ exercise, updateSignal }) => {
  exercise = exercise!;
  const exerciseId = exercise.id;
  const status = exercise.status;
  const { enqueueSnackbar } = useSnackbar();
  const user = useAtomValue(userAtom);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

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
  const [deleteComment] = useDeleteExerciseCommentMutation();
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const {
    data: historyData,
    loading: historyLoading,
    refetch: refetchHistories,
  } = useExerciseHistoryByExerciseQuery({ variables: { exerciseId } });

  useEffect(() => {
    refetchComments();
    refetchHistories();
  }, [refetchComments, refetchHistories, updateSignal]);

  const [newChecks, setNewChecks] = useState<ExerciseCheckFragment[]>([]);
  const history = useMemo(() => {
    return orderBy(
      [
        ...(historyData?.exerciseHistoryByExercise.map((history) => ({
          ...history,
          historyType: "history",
        })) || []),
        ...[...(exercise?.checks || []), ...newChecks].map((check) => ({
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

  const [updateExercise] = useUpdateExerciseMutation();

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
        primaryClick={async () => {
          await deleteComment({
            variables: { deleteExerciseCommentId: commentToDelete! },
          });
          enqueueSnackbar({ variant: "success", message: "Komment törölve" });
          setCommentToDelete(null);
          refetchComments();
        }}
      />
      <Card sx={{ borderRadius: { xs: 0, md: 1 } }}>
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
              onChange={async (e) => {
                await updateExercise({
                  variables: {
                    id: exerciseId,
                    input: {
                      status: e.target.value as ExerciseStatus,
                    },
                  },
                });
                enqueueSnackbar({
                  variant: "success",
                  message: "Státusz frissítve",
                });
              }}
            >
              <MenuItem value={ExerciseStatusEnum.DRAFT}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <IoHourglassOutline color="orange" />
                  Vázlat
                </Stack>
              </MenuItem>
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
          <Divider sx={{ mx: -2 }} />
          <Stack direction={"row"} alignItems={"center"} gap={0.5}>
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
          <Stack direction={"row"} alignItems={"center"} gap={0.5}>
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
              flexWrap={"wrap"}
            >
              <UserItem user={exercise.createdBy} />
              {exercise.contributors.map((user) => (
                <UserItem user={user} />
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
          <Stack>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography variant="h5">Történet</Typography>
              <Box flexGrow={1} />
              <motion.div
                animate={{
                  transform:
                    sort === "asc" ? "rotate(0deg)" : "rotate(-180deg)",
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
            {loading && <Typography>Töltés...</Typography>}
            {history.map((item, i, arr) => {
              switch (item.historyType) {
                case "comment": {
                  const comment = item as ExerciseCommentFragment;
                  return (
                    <History
                      key={comment.id}
                      hideHeader={
                        i > 0 && arr[i - 1].createdAt === comment.createdAt
                      }
                      userName={comment.createdBy.name}
                      createdAt={comment.createdAt}
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
                      key={check.id}
                      hideHeader={
                        i > 0 && arr[i - 1].createdAt === check.createdAt
                      }
                      userName={check.user.name}
                      createdAt={check.createdAt}
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
                case "history": {
                  const history = item as ExerciseHistoryFragment;
                  return (
                    <History
                      key={history.id}
                      hideHeader={
                        i > 0 && arr[i - 1].createdAt === history.createdAt
                      }
                      userName={history.createdBy.name}
                      createdAt={history.createdAt}
                    >
                      <Stack
                        direction={"row"}
                        gap={1}
                        sx={{ ml: 4, mr: 6, mt: 1 }}
                      >
                        <Box sx={{ wordBreak: "break-all" }}>
                          {translateFieldName(history.field)}:{" "}
                          {history.field === "description" ||
                          history.fieldType === "IMAGE" ? (
                            <DiffModal
                              oldValue={history.oldValue as HistoryValue | null}
                              newValue={history.newValue as HistoryValue | null}
                              fieldType={history.fieldType}
                            />
                          ) : (
                            <>
                              {history.oldValue &&
                              history.oldValue.__typename ===
                                "HistoryStringValue" ? (
                                history.oldValue.value || <i>üres</i>
                              ) : history.oldValue &&
                                history.oldValue.__typename === "Image" ? (
                                <Box
                                  component="span"
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <img
                                    src={history.oldValue.url}
                                    alt="Old"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      objectFit: "contain",
                                    }}
                                  />
                                </Box>
                              ) : history.oldValue &&
                                history.oldValue.__typename ===
                                  "HistoryTagArray" ? (
                                <Box
                                  component="span"
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {history.oldValue.tags.length > 0 ? (
                                    history.oldValue.tags.map((tag) => (
                                      <Chip
                                        key={tag.id}
                                        label={tag.name}
                                        variant="outlined"
                                        sx={{
                                          height: "18px",
                                          fontSize: "0.7rem",
                                        }}
                                      />
                                    ))
                                  ) : (
                                    <i>nincs címke</i>
                                  )}
                                </Box>
                              ) : history.oldValue &&
                                history.oldValue.__typename ===
                                  "HistoryUserArray" ? (
                                <Box
                                  component="span"
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {history.oldValue.users.length > 0 ? (
                                    history.oldValue.users.map((user) => (
                                      <Chip
                                        key={user.id}
                                        avatar={
                                          user.avatarUrl ? (
                                            <Avatar
                                              src={user.avatarUrl}
                                              sx={{ width: 16, height: 16 }}
                                            />
                                          ) : (
                                            <Avatar
                                              sx={{
                                                width: 16,
                                                height: 16,
                                                fontSize: "0.6rem",
                                              }}
                                            >
                                              {user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                            </Avatar>
                                          )
                                        }
                                        label={user.name}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                          fontSize: "0.7rem",
                                        }}
                                      />
                                    ))
                                  ) : (
                                    <i>nincs felhasználó</i>
                                  )}
                                </Box>
                              ) : (
                                <i>üres</i>
                              )}{" "}
                              <Box
                                sx={{
                                  display: "inline",
                                  position: "relative",
                                  top: 1.5,
                                }}
                              >
                                <FaArrowRight />
                              </Box>
                              {history.newValue &&
                              history.newValue.__typename ===
                                "HistoryStringValue" ? (
                                history.newValue.value || <i>üres</i>
                              ) : history.newValue &&
                                history.newValue.__typename === "Image" ? (
                                <Box
                                  component="span"
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <img
                                    src={history.newValue.url}
                                    alt="New"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      objectFit: "contain",
                                    }}
                                  />
                                </Box>
                              ) : history.newValue &&
                                history.newValue.__typename ===
                                  "HistoryTagArray" ? (
                                <Box
                                  component="span"
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {history.newValue.tags.length > 0 ? (
                                    history.newValue.tags.map((tag) => (
                                      <Chip
                                        key={tag.id}
                                        label={tag.name}
                                        variant="outlined"
                                        sx={{
                                          height: "18px",
                                          fontSize: "0.7rem",
                                        }}
                                      />
                                    ))
                                  ) : (
                                    <i>nincs címke</i>
                                  )}
                                </Box>
                              ) : history.newValue &&
                                history.newValue.__typename ===
                                  "HistoryUserArray" ? (
                                <Box
                                  component="span"
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {history.newValue.users.length > 0 ? (
                                    history.newValue.users.map((user) => (
                                      <Chip
                                        key={user.id}
                                        avatar={
                                          user.avatarUrl ? (
                                            <Avatar
                                              src={user.avatarUrl}
                                              sx={{ width: 16, height: 16 }}
                                            />
                                          ) : (
                                            <Avatar
                                              sx={{
                                                width: 16,
                                                height: 16,
                                                fontSize: "0.6rem",
                                              }}
                                            >
                                              {user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                            </Avatar>
                                          )
                                        }
                                        label={user.name}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                          fontSize: "0.7rem",
                                        }}
                                      />
                                    ))
                                  ) : (
                                    <i>nincs felhasználó</i>
                                  )}
                                </Box>
                              ) : (
                                <i>üres</i>
                              )}
                            </>
                          )}
                        </Box>
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
    </>
  );
};
