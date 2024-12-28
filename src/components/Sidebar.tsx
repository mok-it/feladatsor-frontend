import { tokenAtom, userAtom } from "@/util/atoms";
import { auth } from "@/util/firebase";
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Switch,
  Typography,
  alpha,
  useColorScheme,
} from "@mui/material";
import { signOut as firebaseSignout } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { FaPersonRunning } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { pages } from "../pages";

const style = {
  minHeight: 44,
  borderRadius: 0.75,
  typography: "body2",
  color: "text.secondary",
  textTransform: "capitalize",
  fontWeight: "fontWeightMedium",
};

export const drawerWidth = 250;

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  const { mode, setMode } = useColorScheme();

  const signOut = useCallback(() => {
    firebaseSignout(auth).then(() => {
      setUser({ isLoggedIn: false, user: null });
      setToken(null);
    });
  }, [setUser, setToken]);

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: drawerWidth,
        height: "100vh",
      }}
    >
      <Box sx={{ width: drawerWidth }} role="presentation" pt={2} height="100%">
        <Stack height="100%" sx={{ p: 2 }}>
          <Typography width="100%" textAlign="center" mb={2}>
            Feladatbeküldő
          </Typography>
          <Stack gap={1}>
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
                      ...style,
                      ...(active && {
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
            <Divider />
            <ListItemButton sx={style} onClick={signOut}>
              <Stack direction="row" gap={2} alignItems="center">
                <Typography fontSize={22} lineHeight={0}>
                  <FaPersonRunning />
                </Typography>
                <ListItemText primary="Kijelentkezés" />
              </Stack>
            </ListItemButton>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} sx={{ mt: "auto" }}>
            <Switch
              checked={mode === "dark"}
              onChange={(_, value) => {
                setMode(value ? "dark" : "light");
              }}
            />
            <Typography
              variant="caption"
              sx={{
                borderRadius: 0.75,
                typography: "body2",
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: "fontWeightMedium",
              }}
            >
              Dark mode
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};
