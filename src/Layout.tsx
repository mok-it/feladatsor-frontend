import { Box, IconButton, Stack } from "@mui/material";
import { FC } from "react";
import { MdMenu } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useToggle } from "react-use";
import { drawerWidth, Sidebar } from "./components/Sidebar";
import { useScrollRestoration } from "./util/useScrollRestoration";

const Layout: FC = () => {
  const [open, toggle] = useToggle(false);
  useScrollRestoration();

  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Sidebar open={open} onClose={() => toggle(false)} />
      <Box
        component={"div"}
        sx={{
          width: { lg: `calc(100vw - ${drawerWidth}px)`, xs: "100vw" },
          py: { xs: 2 },
          mb: 2,
          px: { xs: 1, md: 2 },
        }}
      >
        <IconButton
          onClick={toggle}
          sx={{
            display: { md: "none" },
            mb: 2,
            ml: 2,
          }}
        >
          <MdMenu />
        </IconButton>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Layout;
