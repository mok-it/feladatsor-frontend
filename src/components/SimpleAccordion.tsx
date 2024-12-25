import { grey } from "@/theme/palette.ts";
import {
  AccordionProps,
  AccordionSummaryProps,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  styled,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";
import { FaAngleRight } from "react-icons/fa6";

type AccordionTypeProps = {
  summary: string;
  defaultExpanded?: boolean;
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<FaAngleRight />} {...props} />
))(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: grey[50],
  borderRadius: theme.shape.borderRadius,
}));

export const SimpleAccordion = (
  props: PropsWithChildren<AccordionTypeProps>,
) => (
  <Accordion
    defaultExpanded={props.defaultExpanded}
    sx={{ ":before": { display: "none" }, borderRadius: 1, overflow: "hidden" }}
  >
    <AccordionSummary
      sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
    >
      <Typography variant="subtitle1" color="text.primary">
        {props.summary}
      </Typography>
    </AccordionSummary>
    <AccordionDetails
      sx={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: (theme) => theme.palette.action.hover,
      }}
    >
      {props.children}
    </AccordionDetails>
  </Accordion>
);
