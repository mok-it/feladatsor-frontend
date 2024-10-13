import Check from "@/components/Check";
import History from "@/components/History";
import Section from "@/components/Section";
import {
  useCommentsByExerciseQuery,
  useCreateExerciseCommentMutation,
  useDeleteExerciseCommentMutation,
} from "@/generated/graphql";
import { userAtom } from "@/util/atoms";
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
import { orderBy } from "lodash";
import { useSnackbar } from "notistack";
import { FC, useCallback, useMemo, useState } from "react";
import {
  MdArrowDownward,
  MdCheckCircle,
  MdOutlineDelete,
  MdSend,
} from "react-icons/md";
import { AlertDialog } from "./Dialog";

export const ExerciseOperations: FC<{ exerciseId: string }> = ({
  exerciseId,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useAtomValue(userAtom);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [comment, setComment] = useState<string>("");
  const {
    data: commentsData,
    loading: commentsLoading,
    refetch,
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
    refetch();
  }, [comment, createComment, enqueueSnackbar, exerciseId, refetch]);

  const history = useMemo(() => {
    return orderBy(
      commentsData?.commentsByExercise.map((comment) => ({
        type: "comment",
        ...comment,
      })) || [],
      "createdAt",
      sort,
    );
  }, [commentsData?.commentsByExercise, sort]);

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
          refetch();
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
            <Select size="small" defaultValue={1}>
              <MenuItem value={1}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <MdSend />
                  Beküldve
                </Stack>
              </MenuItem>
              <MenuItem value={2}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <MdCheckCircle color="green" />
                  Kész
                </Stack>
              </MenuItem>
              <MenuItem value={2}>
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
            <Check
              response={"accepted"}
              userName="Minta János"
              timestamp={"2024-02-02"}
            />
            <Check
              response={"rejected"}
              userName="Minta János"
              timestamp={"2024-02-02"}
            />
            <Check
              response={"problematic"}
              userName="Minta János"
              timestamp={"2024-02-02"}
            />
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={0.5}>
            <Typography variant="body1" mr={1}>
              Lektorálások
            </Typography>
            <Check />
            <Check />
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
            {history.map((item, index) => {
              switch (item.type) {
                case "comment":
                  return (
                    <History
                      userName={item.createdBy.name}
                      createdAt={item.createdAt}
                      key={index}
                    >
                      <Box sx={{ ml: 4, mr: 6, mt: 1 }}>
                        <Typography sx={{ wordBreak: "break-all" }}>
                          <i>{item.comment}</i>
                        </Typography>
                        {item.createdBy.id === user?.user?.id && (
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
