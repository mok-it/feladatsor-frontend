import { Avatar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { FC } from "react";
import { MdArrowForward } from "react-icons/md";

const History: FC = () => {
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Avatar sx={{ height: 24, width: 24 }} />
        <span>User</span>
        <Box flexGrow={1} />
        <Typography color={"gray"}>2024. 03. 01. 18:20</Typography>
      </Stack>
      <Stack pl={4} py={1}>
        <Typography>
          <i>Jó lesz az úgy</i>
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          Státusz:
          <Typography component={"span"}>Beküldve</Typography>
          <MdArrowForward />
          <Typography component={"span"} fontWeight={600}>
            Kész
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default History;
