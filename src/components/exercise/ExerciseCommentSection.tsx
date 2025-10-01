import { FC, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import Section from "@/components/Section";
import { CommentModal } from "./CommentModal";
import { ExerciseCommentFragment } from "@/generated/graphql";

interface ExerciseCommentSectionProps {
  exerciseId: string;
  onCommentCreated: () => void;
  editComment?: ExerciseCommentFragment | null;
  onEditComment?: (comment: ExerciseCommentFragment | null) => void;
}

export const ExerciseCommentSection: FC<ExerciseCommentSectionProps> = ({
  exerciseId,
  onCommentCreated,
  editComment,
  onEditComment,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Open modal when editComment is provided
  useEffect(() => {
    if (editComment) {
      setModalOpen(true);
    }
  }, [editComment]);
  
  const handleClose = () => {
    setModalOpen(false);
    // Clear edit mode when modal closes
    if (editComment && onEditComment) {
      onEditComment(null);
    }
  };

  return (
    <Section text="Komment">
      <Button
        variant="contained"
        startIcon={<MdAdd />}
        onClick={() => setModalOpen(true)}
        fullWidth
      >
        Új komment hozzáadása
      </Button>
      <CommentModal
        open={modalOpen}
        onClose={handleClose}
        exerciseId={exerciseId}
        onCommentCreated={onCommentCreated}
        editComment={editComment}
      />
    </Section>
  );
};