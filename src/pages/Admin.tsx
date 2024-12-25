import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Role,
  useChangePermissionsMutation,
  useUsersQuery,
} from "@/generated/graphql.tsx";
import { userAtom } from "@/util/atoms.ts";
import { useAtom } from "jotai";
import { DataTable } from "@/components/DataTable/DataTable.tsx";

const Roles: Role[] = ["ADMIN", "USER"];

const capitalizeStr = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const AdminPage = () => {
  const { data, loading, error } = useUsersQuery();

  const [changePermissions] = useChangePermissionsMutation();

  const [user] = useAtom(userAtom);

  const isMyself = (userId: string) => {
    if (user?.user?.id) return user.user.id === userId;
    return false;
  };

  return (
    <Box mb={16}>
      <Typography variant="h4" style={{ margin: "16px" }}>
        Admin
      </Typography>
      <Card>
        <Box p={2}>
          <DataTable
            dataSource={{
              data: data?.users,
              loading,
              error: error?.message,
            }}
            columns={{
              name: {
                element: "Név",
                sortable: true,
              },
              roles: {
                element: "Jogosultságok",
                sortable: false,
              },
            }}
            rowRenderers={{
              name: (name, row) => (
                <Stack direction="row" alignItems="center" gap={2}>
                  <Avatar src={row.avatarUrl ?? undefined} />
                  <Typography variant="body1">{name}</Typography>
                </Stack>
              ),
              roles: (userRoles: string[], row) => (
                <Autocomplete
                  multiple
                  freeSolo
                  disableCloseOnSelect
                  disableClearable
                  size="small"
                  sx={{ m: 1, width: "100%" }}
                  options={Roles}
                  disabled={isMyself(row.id)}
                  defaultValue={userRoles}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        size="small"
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {capitalizeStr(option)}
                    </li>
                  )}
                  onChange={(_, value) => {
                    changePermissions({
                      variables: {
                        userId: row.id,
                        permissions: value as Role[],
                      },
                    }).then((r) => {
                      console.log(
                        `Sucessfully changed permissions to user: ${row.name}, to: ${value.join()}`,
                      );
                      console.log(r);
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Roles"
                      size="small"
                      placeholder="Select"
                    />
                  )}
                />
              ),
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

/*
<MUIDataTable
            options={{
              search: false,
              filter: false,
              download: false,
              print: false,
              viewColumns: false,
              elevation: 0,
              pagination: false,
              selectableRows: "none",
            }}
            data={data?.users ?? []}
            columns={[
              {
                name: "name",
                label: "Name",
                options: {
                  sort: true,
                },
              },
              {
                name: "roles",
                label: "Roles",
                options: {
                  sort: false,
                  customBodyRender: (value, meta) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      disableCloseOnSelect
                      disableClearable
                      size="small"
                      sx={{ m: 1, width: "100%" }}
                      options={Roles}
                      disabled={isMyself(meta.currentTableData)}
                      defaultValue={value}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            size="small"
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {capitalizeStr(option)}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Roles"
                          size="small"
                          placeholder="Select"
                        />
                      )}
                    />
                  ),
                },
              },
            ]}
            title={"Jogosultságok"}
          />
<DataTable
            dataSource={{
              dataGenerator: async () => {
                const { data } = await getUsers();
                return data?.users || ([] as UsersQuery["users"]);
              },
            }}
            columns={{
              name: {
                element: "Név",
                sortable: true,
              },
              roles: {
                element: "Jogosultságok",
                sortable: false,
              },
            }}
            rowRenderers={{
              roles: (userRoles: string[]) => (
                <Autocomplete
                  multiple
                  freeSolo
                  disableCloseOnSelect
                  disableClearable
                  size="small"
                  sx={{ m: 1, width: "100%" }}
                  options={Roles}
                  defaultValue={userRoles}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        size="small"
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {capitalizeStr(option)}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Roles"
                      size="small"
                      placeholder="Select"
                    />
                  )}
                />
              ),
            }}
          />
 */
