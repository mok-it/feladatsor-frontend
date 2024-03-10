  import { Box, Typography, Card } from '@mui/material';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
  import Checkbox from '@mui/material/Checkbox';
  import TextField from '@mui/material/TextField';
  import Autocomplete from '@mui/material/Autocomplete';
  import { MdCheckBoxOutlineBlank } from "react-icons/md";
  import { IoMdCheckbox } from "react-icons/io";

  function createData(name: string, roles: string[]) {
    return { name, roles };
  }

  const icon = <MdCheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <IoMdCheckbox fontSize="small" />;

  const Roles = [
    { name: 'Beküldő' },
    { name: 'Ellenőrző' },
    { name: 'Admin' },
    { name: 'Bohóc' },
    { name: 'Szabad' },
    { name: 'Semmit nem csináló' },
  ];

  const rows = [
    createData('Zoárd', ['Beküldő', 'Admin']),
    createData('Anna', ['Ellenőrző']),
    createData('Bálint', ['Bohóc']),
    createData('Ajtony', ['Szabad']),
    createData('Balázs', ['Semmit nem csináló']),
  ]

  export const AdminPage = () => {
    return (
      <Box mb={16}>
        <Typography variant="h4" style={{ margin: '16px' }}>
          Admin
        </Typography>
        <Card>
          <Box p={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Roles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell scope="row" width={'50%'}>
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <Autocomplete
                          multiple
                          id={`checkboxes-tags-demo-${row.name}`}
                          options={Roles}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option?.name || ''}
                          defaultValue={row.roles.map(role => Roles.find(r => r.name === role))}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option && option.name} {/* Ellenőrizzük, hogy az option nem undefined */}
                            </li>
                          )}                                              
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Roles"
                              placeholder="Select"
                            />
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
      </Box>
    );
  };
