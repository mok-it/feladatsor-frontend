import { Typography } from "@mui/material";
import { FC } from "react";

export const Required: FC = () => {
  return <Typography sx={{ color: "red", display: "inline" }}> *</Typography>;
};
