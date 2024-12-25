import { styled, TableCell } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.primary,
}));
