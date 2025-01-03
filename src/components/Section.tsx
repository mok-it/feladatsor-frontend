import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, PropsWithChildren, ReactNode } from "react";

const Section: FC<PropsWithChildren<{ text: ReactNode | string }>> = ({
  text,
  children,
}) => {
  return (
    <Stack gap={1}>
      <Typography>{text}</Typography>
      {children}
    </Stack>
  );
};

export default Section;
