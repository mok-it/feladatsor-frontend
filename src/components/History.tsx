import { Typography, Popover, IconButton } from "@mui/material";
import { Box, Stack } from "@mui/system";
import dayjs from "dayjs";
import { FC, memo, PropsWithChildren, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { UserAvatarFragment } from "@/generated/graphql";
import { UserItem } from "@/components/UserItem";

const History: FC<
  PropsWithChildren<{
    users: UserAvatarFragment[];
    createdAt: string;
    hideHeader?: boolean;
  }>
> = ({ users, createdAt, children, hideHeader }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const showPopover = users.length > 2;
  const visibleUsers = showPopover ? users.slice(0, 2) : users;
  const extraUsers = showPopover ? users.slice(2) : [];

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      {!hideHeader && (
        <Stack direction={"row"} alignItems={"center"} gap={1} mt={2}>
          <Stack direction="row" gap={1} alignItems="center">
            {visibleUsers.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
            {showPopover && (
              <>
                <IconButton
                  size="small"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: "action.hover",
                    "&:hover": {
                      bgcolor: "action.selected",
                    },
                  }}
                >
                  <MdMoreHoriz size={16} />
                </IconButton>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  sx={{
                    pointerEvents: "none",
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        pointerEvents: "auto",
                        p: 1,
                        maxWidth: 300,
                      },
                    },
                  }}
                >
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {extraUsers.map((user) => (
                      <UserItem key={user.id} user={user} />
                    ))}
                  </Stack>
                </Popover>
              </>
            )}
          </Stack>
          <Box flexGrow={1} />
          <Typography color={"gray"}>
            {dayjs(+createdAt).format("YYYY. MM. DD. HH.mm")}
          </Typography>
        </Stack>
      )}
      <Stack sx={{ position: "relative" }}>{children}</Stack>
    </Box>
  );
};

const MemoizedHistory = memo(History);

export { MemoizedHistory as History };
