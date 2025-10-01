import { FC, useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { MdSend, MdEdit } from "react-icons/md";
import { 
  useCreateExerciseCommentMutation, 
  useUpdateExerciseCommentMutation,
  UsersQuery,
  ExerciseCommentFragment
} from "@/generated/graphql";
import { useSnackbar } from "notistack";
import { ContributorsSelector } from "@/components/ContributorsSelector";

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  exerciseId: string;
  onCommentCreated: () => void;
  editComment?: ExerciseCommentFragment | null;
}

export const CommentModal: FC<CommentModalProps> = ({
  open,
  onClose,
  exerciseId,
  onCommentCreated,
  editComment,
}) => {
  const [comment, setComment] = useState<string>("");
  const [contributors, setContributors] = useState<UsersQuery["users"]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [createComment, { loading: createLoading }] = useCreateExerciseCommentMutation();
  const [updateComment, { loading: updateLoading }] = useUpdateExerciseCommentMutation();
  
  const isEditMode = !!editComment;
  const loading = createLoading || updateLoading;

  const handleClose = useCallback(() => {
    setComment("");
    setContributors([]);
    onClose();
  }, [onClose]);

  // Populate form when editing
  useEffect(() => {
    if (editComment && open) {
      setComment(editComment.comment);
      // Convert UserAvatarFragment to UsersQuery["users"] type
      // We only need the id, name, and avatarUrl fields which are present in both
      setContributors((editComment.contributors || []) as UsersQuery["users"]);
    } else if (!open) {
      // Reset form when modal closes
      setComment("");
      setContributors([]);
    }
  }, [editComment, open]);

  const onComment = useCallback(async () => {
    if (!comment.trim()) return;
    
    try {
      if (isEditMode && editComment) {
        await updateComment({
          variables: {
            id: editComment.id,
            comment: comment.trim(),
            contributors: contributors.map(c => c.id),
          },
        });
        enqueueSnackbar({ variant: "success", message: "Komment módosítva" });
      } else {
        await createComment({
          variables: {
            comment: comment.trim(),
            exerciseId,
            contributors: contributors.map(c => c.id),
          },
        });
        enqueueSnackbar({ variant: "success", message: "Komment elküldve" });
      }
      handleClose();
      onCommentCreated();
    } catch (error) {
      enqueueSnackbar({ 
        variant: "error", 
        message: isEditMode ? "Hiba történt a komment módosításakor" : "Hiba történt a komment küldésekor" 
      });
    }
  }, [comment, contributors, createComment, updateComment, exerciseId, onCommentCreated, handleClose, enqueueSnackbar, isEditMode, editComment]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onComment();
  }, [onComment]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{isEditMode ? "Komment szerkesztése" : "Új komment"}</DialogTitle>
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
            endIcon={isEditMode ? <MdEdit /> : <MdSend />}
            disabled={!comment.trim() || loading}
          >
            {isEditMode ? "Módosít" : "Küld"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};