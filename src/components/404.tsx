import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
// @ts-ignore
import ChromeDinoGame from "react-chrome-dino";

export const Page404: FC = () => {
  return (
    <Stack
      height={"100%"}
      alignItems="center"
      justifyContent={"center"}
      gap={2}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="body1">Nem található</Typography>
      <Box width={600} height={300}>
        <ChromeDinoGame />
      </Box>
    </Stack>
  );
};
