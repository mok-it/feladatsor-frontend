import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import HelpingQuestion from "./HelpingQuestion.tsx";
import HelpingQuestionComposer from "./HelpingQuestionComposer.tsx";

export type HelpingQuestionData = {
  id: string;
  label: string;
};
export default function HelpingQuestions() {
  const [helpingQuestions, setHelpingQuestions] = React.useState<HelpingQuestionData[]>([]);
  const handleUpdateHelpingQuestion = (updatedHelpingQuestion: HelpingQuestionData) => {
    const newHelpingQuestions = helpingQuestions.map((helpingQuestion) =>
      helpingQuestion.id === updatedHelpingQuestion.id ? updatedHelpingQuestion : helpingQuestion
    );
    setHelpingQuestions(newHelpingQuestions);
  };

  const handleDeleteHelpingQuestion = (id: string) => {
    const newHelpingQuestions = helpingQuestions.filter((helpingQuestion) => helpingQuestion.id !== id);
    setHelpingQuestions(newHelpingQuestions);
  };

  const handleAddHelpingQuestion = (newHelpingQuestion: HelpingQuestionData) => {
    const newHelpingQuestions = [...helpingQuestions, newHelpingQuestion];
    setHelpingQuestions(newHelpingQuestions);
  };

  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Segítő kérdések</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <HelpingQuestionComposer handleAddHelpingQuestion={handleAddHelpingQuestion} />
            {helpingQuestions.map((helpingQuestion) => (
              <HelpingQuestion
                key={helpingQuestion.id}
                helpingQuestion={helpingQuestion}
                handleUpdateHelpingQuestion={handleUpdateHelpingQuestion}
                handleDeleteHelpingQuestion={handleDeleteHelpingQuestion}
              />
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

