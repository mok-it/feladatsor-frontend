import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";
import { IoIosArrowDown } from "react-icons/io";

type AccordionTypeProps = {
  summary: string;
  defaultExpanded?: boolean;
};

export const SimpleAccordion = (
  props: PropsWithChildren<AccordionTypeProps>,
) => (
  <Accordion
    defaultExpanded={props.defaultExpanded}
    sx={{ ":before": { display: "none" } }}
  >
    <AccordionSummary expandIcon={<IoIosArrowDown />} sx={{ px: 0, my: 0 }}>
      <Typography variant="subtitle1" color="text.primary">
        {props.summary}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ px: 0, py: 0 }}>{props.children}</AccordionDetails>
  </Accordion>
);
