import { Avatar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import dayjs from "dayjs";
import { FC, PropsWithChildren } from "react";

const History: FC<
  PropsWithChildren<{ userName: string; createdAt: string }>
> = ({ userName, createdAt, children }) => {
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Avatar sx={{ height: 24, width: 24 }} />
        <span>{userName}</span>
        <Box flexGrow={1} />
        <Typography color={"gray"}>
          {dayjs(+createdAt).format("YYYY. MM. DD. HH.mm")}
        </Typography>
      </Stack>
      <Stack sx={{ position: "relative" }}>{children}</Stack>
    </Box>
  );
};

export default History;
