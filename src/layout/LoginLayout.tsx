import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FC, PropsWithChildren } from "react";

type LoginLayoutProps = {
  headerText: string;
  loading?: boolean;
};

export const LoginLayout: FC<PropsWithChildren<LoginLayoutProps>> = (props) => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background: "url(https://picsum.photos/1920/1080)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
          position: "absolute",
        }}
      />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Card
            sx={{
              p: 2,
              width: {
                xs: "90%",
                sm: "50%",
                md: "400px",
              },
              height: "auto",
            }}
          >
            <Stack justifyContent="center" gap={2} height="100%">
              <Typography variant="h4" textAlign="center">
                {props.headerText}
              </Typography>
              {props.children}
            </Stack>
          </Card>
        </Stack>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading ?? false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
