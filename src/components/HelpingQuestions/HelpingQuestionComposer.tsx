import * as React from "react";
import { HelpingQuestionData } from "./HelpingQuestions.tsx";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

function createHelpingQuestion(label: string): HelpingQuestionData {
  return {
    id: Date.now().toString(), // using timestamp as a unique id
    label: label
  };
}

type HelpingQuestionComposerProps = {
  handleAddHelpingQuestion: (question: HelpingQuestionData) => void;
};

export default function HelpingQuestionComposer({ handleAddHelpingQuestion }: HelpingQuestionComposerProps) {
  const [label, setLabel] = React.useState("");

  const handleUpdateLabel = (e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value);

  const handleAddHelpingQuestionClick = () => {
    const helpingQuestion = createHelpingQuestion(label);
    handleAddHelpingQuestion(helpingQuestion);
    setLabel("");
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Írd ide a segítő kérdést"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleAddHelpingQuestionClick}>
              <Add />
            </IconButton>
          </InputAdornment>
        )
      }}
      value={label}
      onChange={handleUpdateLabel}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          handleAddHelpingQuestionClick();
          event.preventDefault();
        }
      }}
    />
  );
}