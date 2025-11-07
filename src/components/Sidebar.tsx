import { DayNightSwitch } from "@/components/DayNightSwitch/DayNightSwitch.tsx";
import { useAuth } from "@/pages/AuthContext";
import { useRoleBasedAccess } from "@/util/auth";
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
import { FC, useMemo } from "react";
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

  const { hasRole, hasAllRoles } = useRoleBasedAccess();

  const { mode, setMode } = useColorScheme();

  // Filter pages based on user roles
  const visiblePages = useMemo(() => {
    return pages.filter((page) => {
      // If no roles required, show to all authenticated users
      if (!page.requiredRoles || page.requiredRoles.length === 0) {
        return true;
      }

      // Check if user has required roles
      return page.requireAllRoles
        ? hasAllRoles(page.requiredRoles)
        : hasRole(page.requiredRoles);
    });
  }, [hasRole, hasAllRoles]);

  const { signOut } = useAuth();

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
            <Typography width="100%" textAlign="center" fontWeight={600} mb={2}>
              Feladatbeküldő
            </Typography>
            <Stack gap={1}>
              {visiblePages.map((page) => {
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
