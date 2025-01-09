import { User } from "@/generated/graphql.tsx";
import { Avatar, Stack, Typography } from "@mui/material";

export const UserItem = ({
  user,
}: {
  user: Pick<User, "avatarUrl" | "name">;
}) => {
  return (
    <Stack direction={"row"} spacing={1} alignItems="center">
      <Avatar
        src={user.avatarUrl ?? undefined}
        sx={{ height: 24, width: 24 }}
      />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {user.name}
      </Typography>
    </Stack>
  );
};
