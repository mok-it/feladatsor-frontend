import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IoIosStats } from "react-icons/io";
import { grey } from "@/theme/palette.ts";

export interface ProfileStatProps {
  value: number;
  title: string;
}

export function ProfileStatCard({
  value,
  title,
}: ProfileStatProps): React.JSX.Element {
  return (
    <Card
      sx={{
        background: (theme) =>
          theme.palette.mode === "light"
            ? grey[200]
            : theme.palette.action.disabledBackground,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "var(--mui-palette-primary-main)",
              height: "56px",
              width: "56px",
            }}
          >
            <IoIosStats color="black" fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
