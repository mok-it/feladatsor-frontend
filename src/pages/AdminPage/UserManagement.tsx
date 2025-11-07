import { StyledTableCell } from "@/components/StyledTableCell.tsx";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import {
  Role,
  useChangePermissionsMutation,
  useUsersQuery,
} from "@/generated/graphql.tsx";
import { RoleGuide } from "@/pages/AdminPage/RoleGuide.tsx";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Stack,
  Table,
  TableHead,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useAuth } from "../AuthContext";

const Roles: Role[] = [
  "ADMIN",
  "USER",
  "LIST_EXERCISES",
  "CHECK_EXERCISE",
  "CLONE_EXERCISE",
  "FINALIZE_EXERCISE",
  "EXERCISE_SHEET",
  "PROOFREAD_EXERCISE_SHEET",
];

// Role display mapping for better user experience
const roleDisplayNames: Record<Role, string> = {
  ADMIN: "Adminisztrátor",
  USER: "Felhasználó",
  LIST_EXERCISES: "Feladatok listázása",
  CHECK_EXERCISE: "Feladat ellenőrzés",
  CLONE_EXERCISE: "Feladat klónozás",
  FINALIZE_EXERCISE: "Feladat véglegesítés",
  EXERCISE_SHEET: "Feladatsor kezelés",
  PROOFREAD_EXERCISE_SHEET: "Feladatsor lektorálás",
};

const getRoleDisplayName = (role: Role): string => {
  return roleDisplayNames[role] || role;
};

export const UserManagement = () => {
  const { user } = useAuth();
  const { data, loading } = useUsersQuery();
  const [changePermissions] = useChangePermissionsMutation();

  const isMyself = (userId: string) => {
    if (user?.id) return user.id === userId;
    return false;
  };

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card sx={{ mb: 3 }}>
      <Box p={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Felhasználókezelés
          </Typography>
          <RoleGuide />
        </Stack>
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
                    disableCloseOnSelect
                    disableClearable
                    size="small"
                    sx={{ m: 1, width: "100%" }}
                    options={Roles}
                    disabled={isMyself(user.id)}
                    defaultValue={user.roles}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          size="small"
                          label={getRoleDisplayName(option)}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          size="small"
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {getRoleDisplayName(option)}
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
                        enqueueSnackbar(
                          `Successfully changed permissions to user: ${user.name}, to: ${value}`,
                          {
                            variant: "success",
                          },
                        );
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
