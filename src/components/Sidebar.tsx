import { DayNightSwitch } from "@/components/DayNightSwitch/DayNightSwitch.tsx";
import { tokenAtom, userAtom } from "@/util/atoms";
import { auth } from "@/util/firebase";
import {
  alpha,
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { signOut as firebaseSignout } from "firebase/auth";
import { useAtomValue, useSetAtom } from "jotai";
import { jwtDecode } from "jwt-decode";
import { FC, useCallback, useEffect } from "react";
import { FaPersonRunning } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { pages } from "../pages";

dayjs.extend(relativeTime);

const style = {
  minHeight: 44,
  borderRadius: 0.75,
  typography: "body2",
  color: "text.secondary",
  textTransform: "capitalize",
  fontWeight: "fontWeightMedium",
};

export const drawerWidth = 250;

export const Sidebar: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetAtom(userAtom);
  const token = useAtomValue(tokenAtom);
  const setToken = useSetAtom(tokenAtom);

  const { mode, setMode } = useColorScheme();

  const signOut = useCallback(() => {
    firebaseSignout(auth).then(() => {
      setUser({ isLoggedIn: false, user: null });
      setToken(null);
    });
  }, [setUser, setToken]);

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return;
    console.log(
      "token exp",
      dayjs(decoded.exp * 1000).format("YYYY-MM-DD HH:mm:ss"),
    );
    console.log("logging out", dayjs(decoded.exp * 1000).fromNow());
    const timeout = setTimeout(
      signOut,
      dayjs(decoded.exp * 1000).diff(dayjs(), "ms"),
    );
    return () => clearTimeout(timeout);
  }, [setToken, setUser, signOut, token]);

  return (
    <>
      <Drawer
        anchor="left"
        variant={isDesktop ? "permanent" : "temporary"}
        open={open}
        sx={{
          width: drawerWidth,
          height: "100vh",
        }}
        onClose={onClose}
      >
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
          pt={2}
          height="100%"
        >
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
                      onClose();
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
              <DayNightSwitch
                checked={mode === "dark"}
                onChange={(value) => {
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
    </>
  );
};
