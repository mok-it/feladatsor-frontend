import { MultiSelect } from "@/components/MultiSelect.tsx";
import { UsersQuery, useUsersQuery } from "@/generated/graphql.tsx";
import { useAuth } from "@/pages/AuthContext";
import { Avatar, Box, Chip, Skeleton, Typography } from "@mui/material";
import { FC } from "react";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type ContributorsSelectorProp = {
  selectedUsers: string[];
  onChange: (value: UsersQuery["users"]) => void;
};

export const ContributorsSelector: FC<ContributorsSelectorProp> = (props) => {
  const { data, loading } = useUsersQuery();
  const { user } = useAuth();

  if (loading) return <Skeleton variant="rounded" width={200} height={10} />;
  if (!data) return "Failed to load users";

  // Filter out the currently logged in user
  const availableUsers = data.users.filter((u) => u.id !== user?.id);

  return (
    <MultiSelect<ArrayElement<UsersQuery["users"]>>
      label="Közreműködők"
      items={availableUsers}
      value={availableUsers.filter((user) =>
        props.selectedUsers.includes(user.id),
      )}
      getItemLabel={(item) => item.name}
      getItemKey={(item) => item.id}
      onChange={props.onChange}
      renderChip={(user, getTagProps, index) => (
        <Chip
          {...getTagProps({ index })}
          size="small"
          variant="outlined"
          avatar={<Avatar src={user.avatarUrl || undefined} alt={user.name} />}
          label={user.name}
        />
      )}
      renderOption={(user) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src={user.avatarUrl || undefined}
            alt={user.name}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body2">{user.name}</Typography>
        </Box>
      )}
    />
  );
};
