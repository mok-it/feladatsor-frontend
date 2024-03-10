import { Box, Typography, Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name: string, roles: string) {
  return { name, roles };
}

const rows = [
  createData('Zoárd', 'Developer'),
  createData('Anna', 'Developer'),
  createData('Bálint', 'Developer'),
  createData('Ajtony', 'Developer'),
  createData('Balázs', 'Bohóc'),
];

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
                  <TableCell align="right">Roles</TableCell> {/* align helyesírása helyesen */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.roles}</TableCell> {/* Jobbra igazítás */}
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
