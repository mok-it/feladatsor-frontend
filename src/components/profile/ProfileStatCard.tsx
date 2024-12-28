import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IoIosStats } from "react-icons/io";
import { IconType } from "react-icons";

export interface ProfileStatProps {
  value?: number | string;
  title: string;
  icon?: IconType;
  iconColor?: string;
}

export function ProfileStatCard({
  value,
  title,
  icon: Icon,
  iconColor,
}: ProfileStatProps): React.JSX.Element {
  return (
    <Card
      sx={{
        background: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.action.disabledBackground,
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          spacing={1}
        >
          <Typography color="text.secondary" variant="overline">
            {title}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="baseline"
            width="100%"
          >
            <Typography variant="h4">{value}</Typography>
            <Avatar
              sx={{
                backgroundColor: "var(--mui-palette-primary-main)",
              }}
            >
              {Icon ? (
                <Icon color={iconColor ? iconColor : "gray"} fontSize={28} />
              ) : (
                <IoIosStats color="black" fontSize={28} />
              )}
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
