import { Card, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const Placeholder: FC<{ order: number }> = ({ order }) => {
  return (
    <Card
      component={"div"}
      sx={{
        width: "100%",
        height: 76,
        borderRadius: 1,
        background: "transparent",
        transition: "0.2s",
        border: "2px solid transparent",
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
