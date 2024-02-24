import { PropsWithChildren } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IoIosArrowDown } from "react-icons/io";

type AccordionTypeProps = {
  summary: string;
  defaultExpanded?: boolean;
};

export const SimpleAccordion = (
  props: PropsWithChildren<AccordionTypeProps>,
) => (
  <Accordion defaultExpanded={props.defaultExpanded}>
    <AccordionSummary expandIcon={<IoIosArrowDown />}>
      <Typography variant="subtitle1" color="text.primary">
        {props.summary}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>{props.children}</Typography>
    </AccordionDetails>
  </Accordion>
);
