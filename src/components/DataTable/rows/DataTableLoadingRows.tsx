import { Skeleton, TableRow } from "@mui/material";

import { DataTableCell } from "./DataTableCell";

export const DataTableLoadingRows = (props: {
  rows: number;
  columns: number;
}) => {
  return (
    <>
      {Array.from({ length: props.rows }).map((_, rowId) => (
        <TableRow key={rowId}>
          {Array.from({ length: props.columns }).map((_, cellId) => {
            return (
              <DataTableCell key={cellId} align="center">
                <Skeleton width="100%" variant="text" />
              </DataTableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
