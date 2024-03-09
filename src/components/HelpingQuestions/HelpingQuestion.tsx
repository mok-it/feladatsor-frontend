import * as React from "react";
import { HelpingQuestionData } from "./HelpingQuestions.tsx";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";

type HelpingQuestionProps = {
  helpingQuestion: HelpingQuestionData;
  handleUpdateHelpingQuestion: (question: HelpingQuestionData) => void;
  handleDeleteHelpingQuestion: (id: string) => void;
};
export const HelpingQuestion = ({
  helpingQuestion,
  handleUpdateHelpingQuestion,
  handleDeleteHelpingQuestion,
}: HelpingQuestionProps) => {
  const handleEditHelpingQuestion = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleUpdateHelpingQuestion({
      ...helpingQuestion,
      label: e.target.value,
    });

  const handleDeleteClick = () =>
    handleDeleteHelpingQuestion(helpingQuestion.id);
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Írd ide a segítő kérdést"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleDeleteClick}>
              <MdOutlineDelete />
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={helpingQuestion.label}
      onChange={handleEditHelpingQuestion}
    />
  );
};
