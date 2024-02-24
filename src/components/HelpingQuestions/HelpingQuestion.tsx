import * as React from "react";
import { HelpingQuestionData } from "./HelpingQuestions.tsx";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";

type HelpingQuestionProps = {
  helpingQuestion: HelpingQuestionData;
  handleUpdateHelpingQuestion: (question: HelpingQuestionData) => void;
  handleDeleteHelpingQuestion: (id: string) => void;
};
export default function HelpingQuestion({
                                          helpingQuestion,
                                          handleUpdateHelpingQuestion,
                                          handleDeleteHelpingQuestion
                                        }: HelpingQuestionProps) {
  const [editing, setEditing] = React.useState(false);

  const handleEditClick = () => setEditing(!editing);

  const handleEditHelpingQuestion = (e: React.ChangeEvent<HTMLInputElement>) => handleUpdateHelpingQuestion({
    ...helpingQuestion,
    label: e.target.value
  });

  const handleDeleteClick = () => handleDeleteHelpingQuestion(helpingQuestion.id);

  /*
  type="text"
              value={helpingQuestion.label}
              onChange={handleEditHelpingQuestion}
   */
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Írd ide a segítő kérdést"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end"
                        onClick={handleEditClick}
            >
              {editing ? <Save /> : <Edit />}
            </IconButton>
            {!editing && (
              <IconButton edge="end"
                          onClick={handleDeleteClick}>
                <Delete />
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
      value={helpingQuestion.label}
      onChange={handleEditHelpingQuestion}
    />
  );
}