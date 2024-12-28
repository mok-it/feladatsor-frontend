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
          width: { md: `calc(100% - ${drawerWidth}px)` },
          py: { xs: 2 },
          px: { xs: 2, md: 4 },
        }}
      >
        <IconButton
          onClick={toggle}
          sx={{
            display: { md: "none" },
            mb: 2,
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
