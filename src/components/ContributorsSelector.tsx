import { FC } from "react";
import { UsersQuery, useUsersQuery } from "@/generated/graphql.tsx";
import { Skeleton, Chip, Avatar, Box, Typography } from "@mui/material";
import { MultiSelect } from "@/components/MultiSelect.tsx";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type ContributorsSelectorProp = {
  selectedUsers: string[];
  onChange: (value: UsersQuery["users"]) => void;
};

export const ContributorsSelector: FC<ContributorsSelectorProp> = (props) => {
  const { data, loading } = useUsersQuery();

  if (loading) return <Skeleton variant="rounded" width={200} height={10} />;
  if (!data) return "Failed to load users";

  return (
    <MultiSelect<ArrayElement<UsersQuery["users"]>>
      label="Közreműködők"
      items={data.users}
      value={data.users.filter((user) => props.selectedUsers.includes(user.id))}
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
