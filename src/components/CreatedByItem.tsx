import { User } from "@/generated/graphql.tsx";
import { Avatar, Typography } from "@mui/material";

export const CreatedByItem = ({
  user,
}: {
  user: Pick<User, "avatarUrl" | "name">;
}) => {
  return (
    <>
      <Avatar
        src={user.avatarUrl ?? undefined}
        sx={{ height: 24, width: 24 }}
      />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {user.name}
      </Typography>
    </>
  );
};
