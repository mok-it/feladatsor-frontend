import { FC, useState } from "react";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import Section from "@/components/Section";
import { CommentModal } from "./CommentModal";

interface ExerciseCommentSectionProps {
  exerciseId: string;
  onCommentCreated: () => void;
}

export const ExerciseCommentSection: FC<ExerciseCommentSectionProps> = ({
  exerciseId,
  onCommentCreated,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

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
        onClose={() => setModalOpen(false)}
        exerciseId={exerciseId}
        onCommentCreated={onCommentCreated}
      />
    </Section>
  );
};