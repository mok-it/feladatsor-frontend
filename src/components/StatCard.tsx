import { FC, PropsWithChildren } from "react";
import { Card, Typography } from "@mui/material";

export const StatCard: FC<PropsWithChildren<{ title: string }>> = (props) => (
  <Card sx={{ p: 2 }}>
    <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
      {props.title}
    </Typography>
    {props.children}
  </Card>
);
