import { Card, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const Placeholder: FC<{ order: number; height: number | string }> = ({
  order,
  height,
}) => {
  return (
    <Card
      component={"div"}
      sx={{
        width: "100%",
        height,
        borderRadius: 1,
        background: "transparent",
        transition: "0.2s",
        border: "2px solid transparent",
        zIndex: 0,
        boxShadow:
          "inset 5px 5px 6px 0 rgba(145, 158, 171, 0.08), inset 0 12px 24px -4px rgba(145, 158, 171, 0.08)",
      }}
    >
      <Stack p={1.5}>
        <Typography variant={"body2"} sx={{ opacity: 0.6, fontSize: 12 }}>
          {order + 1}
        </Typography>
      </Stack>
    </Card>
  );
};
