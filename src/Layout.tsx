import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

const Layout: FC = () => {
  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Sidebar />
      <Box p={4} width="100%">
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Layout;
