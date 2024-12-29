import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import DinoGame from "react-chrome-dino-ts";
import "react-chrome-dino-ts/index.css";

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

      <Typography variant="caption">404</Typography>

      <Box width={600} height={300}>
        <DinoGame
          instructions={
            <Typography textAlign="center">
              Nyomjad a SPACÉT oszt jáccá xD
            </Typography>
          }
        />
      </Box>
    </Stack>
  );
};
