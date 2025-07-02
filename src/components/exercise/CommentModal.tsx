import { FC, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { MdSend } from "react-icons/md";
import { useCreateExerciseCommentMutation, UsersQuery } from "@/generated/graphql";
import { useSnackbar } from "notistack";
import { ContributorsSelector } from "@/components/ContributorsSelector";

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  exerciseId: string;
  onCommentCreated: () => void;
}

export const CommentModal: FC<CommentModalProps> = ({
  open,
  onClose,
  exerciseId,
  onCommentCreated,
}) => {
  const [comment, setComment] = useState<string>("");
  const [contributors, setContributors] = useState<UsersQuery["users"]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [createComment, { loading }] = useCreateExerciseCommentMutation();

  const handleClose = useCallback(() => {
    setComment("");
    setContributors([]);
    onClose();
  }, [onClose]);

  const onComment = useCallback(async () => {
    if (!comment.trim()) return;
    
    try {
      await createComment({
        variables: {
          comment: comment.trim(),
          exerciseId,
          contributors: contributors.map(c => c.id),
        },
      });
      enqueueSnackbar({ variant: "success", message: "Komment elküldve" });
      handleClose();
      onCommentCreated();
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: "Hiba történt a komment küldésekor" });
    }
  }, [comment, contributors, createComment, exerciseId, onCommentCreated, handleClose, enqueueSnackbar]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onComment();
  }, [onComment]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Új komment</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ mt: 1 }}>
            <TextField
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder="Írj kommentet..."
              variant="outlined"
            />
            <ContributorsSelector
              selectedUsers={contributors.map(c => c.id)}
              onChange={setContributors}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Mégse
          </Button>
          <Button
            type="submit"
            variant="contained"
            endIcon={<MdSend />}
            disabled={!comment.trim() || loading}
          >
            Küld
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};