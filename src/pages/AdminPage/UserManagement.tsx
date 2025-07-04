import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableHead,
  Typography,
} from "@mui/material";
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
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import { StyledTableCell } from "@/components/StyledTableCell.tsx";

const Roles: Role[] = ["ADMIN", "USER"];

const capitalizeStr = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const UserManagement = () => {
  const { data, loading } = useUsersQuery();
  const [changePermissions] = useChangePermissionsMutation();
  const [user] = useAtom(userAtom);

  const isMyself = (userId: string) => {
    if (user?.user?.id) return user.user.id === userId;
    return false;
  };

  return (
    <Card sx={{ mb: 3 }}>
      <Box p={2}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Felhasználókezelés
        </Typography>
        {loading && <Typography>Betöltés...</Typography>}
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <Typography variant="body1" textAlign="center">
                  Név
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body1" textAlign="center">
                  Jogosultságok
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {data?.users.map((user) => {
            return (
              <StyledTableRow key={user.id}>
                <StyledTableCell sx={{ minWidth: 100 }} size="small">
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Avatar src={user.avatarUrl ?? undefined} />
                    <Typography variant="body1">{user.name}</Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell size="small">
                  <Autocomplete
                    multiple
                    freeSolo
                    disableCloseOnSelect
                    disableClearable
                    size="small"
                    sx={{ m: 1, width: "100%" }}
                    options={Roles}
                    disabled={isMyself(user.id)}
                    defaultValue={user.roles}
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
                          userId: user.id,
                          permissions: value as Role[],
                        },
                      }).then((r) => {
                        console.log(
                          `Sucessfully changed permissions to user: ${user.name}, to: ${value.join()}`,
                        );
                        console.log(r);
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Jogosultságok"
                        size="small"
                        placeholder="Kiválasztás"
                      />
                    )}
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </Table>
      </Box>
    </Card>
  );
};