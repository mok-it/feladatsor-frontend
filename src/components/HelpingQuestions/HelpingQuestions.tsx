import React from "react";
import { HelpingQuestion } from "./HelpingQuestion.tsx";
import { HelpingQuestionComposer } from "./HelpingQuestionComposer.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import { Stack } from "@mui/material";

export type HelpingQuestionData = {
  id: string;
  label: string;
};
export const HelpingQuestions = () => {
  const [helpingQuestions, setHelpingQuestions] = React.useState<
    HelpingQuestionData[]
  >([]);
  const handleUpdateHelpingQuestion = (
    updatedHelpingQuestion: HelpingQuestionData,
  ) => {
    const newHelpingQuestions = helpingQuestions.map((helpingQuestion) =>
      helpingQuestion.id === updatedHelpingQuestion.id
        ? updatedHelpingQuestion
        : helpingQuestion,
    );
    setHelpingQuestions(newHelpingQuestions);
  };

  const handleDeleteHelpingQuestion = (id: string) => {
    const newHelpingQuestions = helpingQuestions.filter(
      (helpingQuestion) => helpingQuestion.id !== id,
    );
    setHelpingQuestions(newHelpingQuestions);
  };

  const handleAddHelpingQuestion = (
    newHelpingQuestion: HelpingQuestionData,
  ) => {
    const newHelpingQuestions = [...helpingQuestions, newHelpingQuestion];
    setHelpingQuestions(newHelpingQuestions);
  };

  return (
    <SimpleAccordion summary="Segítő kérdések">
      <Stack gap={1}>
        <HelpingQuestionComposer
          handleAddHelpingQuestion={handleAddHelpingQuestion}
        />
        {helpingQuestions.map((helpingQuestion) => (
          <HelpingQuestion
            key={helpingQuestion.id}
            helpingQuestion={helpingQuestion}
            handleUpdateHelpingQuestion={handleUpdateHelpingQuestion}
            handleDeleteHelpingQuestion={handleDeleteHelpingQuestion}
          />
        ))}
      </Stack>
    </SimpleAccordion>
  );
};
