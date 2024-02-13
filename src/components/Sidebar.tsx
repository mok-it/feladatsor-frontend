import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { pages } from "../pages";
import { alpha } from "@mui/material/styles";

export const Sidebar = () => {
  const drawerWidth = 250;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: drawerWidth,
      }}
    >
      <Box sx={{ width: drawerWidth }} role="presentation" pt={2}>
        <Typography width="100%" textAlign="center">
          <b>FE</b>ladat <b>BE</b>küldő
        </Typography>
        <Stack gap={1} sx={{ p: 2 }}>
          {pages.map((page) => {
            const active = location.pathname === page.path;
            return (
              <ListItem
                key={page.name}
                disablePadding
                onClick={() => {
                  navigate(page.path);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 44,
                    borderRadius: 0.75,
                    typography: "body2",
                    color: "text.secondary",
                    textTransform: "capitalize",
                    fontWeight: "fontWeightMedium",
                    ...(active && {
                      color: "primary.main",
                      fontWeight: "fontWeightSemiBold",
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.08),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.16),
                      },
                    }),
                  }}
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <Typography fontSize={22} lineHeight={0}>
                      <page.icon />
                    </Typography>
                    <ListItemText primary={page.name} />
                  </Stack>
                </ListItemButton>
              </ListItem>
            );
          })}
        </Stack>
        <Divider />
      </Box>
    </Drawer>
  );
};
