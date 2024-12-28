import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { drawerWidth, Sidebar } from "./components/Sidebar";

const Layout: FC = () => {
  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Sidebar />
      <Box
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          py: { xs: 8, md: 4 },
          px: { xs: 2, md: 4 },
        }}
        component={"div"}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Layout;
