import { FC, useState, useCallback } from "react";
import { Button, TextField, Stack, Box } from "@mui/material";
import { MdSend } from "react-icons/md";
import { useCreateExerciseCommentMutation } from "@/generated/graphql";
import { useSnackbar } from "notistack";
import Section from "@/components/Section";

interface ExerciseCommentSectionProps {
  exerciseId: string;
  onCommentCreated: () => void;
}

export const ExerciseCommentSection: FC<ExerciseCommentSectionProps> = ({
  exerciseId,
  onCommentCreated,
}) => {
  const [comment, setComment] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const [createComment] = useCreateExerciseCommentMutation();

  const onComment = useCallback(async () => {
    if (!comment) return;
    setComment("");
    await createComment({
      variables: { comment: comment!, exerciseId },
    });
    enqueueSnackbar({ variant: "success", message: "Komment elküldve" });
    onCommentCreated();
  }, [comment, createComment, enqueueSnackbar, exerciseId, onCommentCreated]);

  return (
    <Section text="Komment">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onComment();
        }}
      >
        <Stack direction="row" gap={1}>
          <Box flexGrow={1}>
            <TextField
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
              fullWidth
              size="small"
            />
          </Box>
          <Button type="submit" variant="contained" endIcon={<MdSend />}>
            Küld
          </Button>
        </Stack>
      </form>
    </Section>
  );
};