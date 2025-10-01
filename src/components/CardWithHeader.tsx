import { Box, Card, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const CardWithHeader: FC<PropsWithChildren<{ title: string }>> = (
  props,
) => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        {props.title}
      </Typography>

      <Box>{props.children}</Box>
    </Card>
  );
};
