import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IoIosArrowDown } from "react-icons/io";

type AccordionTypeProps = {
  summary?: React.ReactNode;
  details: React.ReactNode;
};

export const AccordionExpandIcon = (props: AccordionTypeProps) => (
  <div>
    <Accordion>
      <AccordionSummary
        expandIcon={<IoIosArrowDown />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{props.summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.details}</Typography>
      </AccordionDetails>
    </Accordion>
  </div>
);
