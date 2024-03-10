import { IconButton, TableRow, Typography } from "@mui/material";

import { useDataTable } from "../context/DataTableContext";
import { BaseObject, ComplexColumn, DataTableProps } from "../DataTable.types";
import { DataTableCell } from "./DataTableCell";
import { ensureSxArray } from "@/util/ensureSxArray.ts";
import { grey } from "@/theme/palette.ts";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

type TableHeaderRowProps<T extends BaseObject> = {
  orderedColumnKeys: (keyof T)[];
  headers: DataTableProps<T>["columns"];
  stickyFirstColumn?: boolean;
};

const ComplexHeaderCell = <T extends BaseObject>(
  props: ComplexColumn<T> & { columnKey: keyof T; isSticky?: boolean },
) => {
  const { sortColumn, columnSorting } = useDataTable<T>();
  const columnSort = columnSorting.find(
    (item) => item.columnKey === props.columnKey,
  );
  return (
    <DataTableCell
      align={props.align ?? "center"}
      sx={[
        ...ensureSxArray(props.sx),
        { backgroundColor: "white" },
        { borderColor: grey[300] },
      ]}
      isSticky={props.isSticky}
      backgroundColor="white"
    >
      <Typography variant="body1">{props.element}</Typography>
      {props.unit && (
        <Typography sx={{ ml: 1 }} data-testid="" variant="body1">
          {props.unit}
        </Typography>
      )}
      {props.sortable && (
        <IconButton onClick={() => sortColumn(props.columnKey)}>
          {columnSort?.direction === null && <TiArrowUnsorted />}
          {columnSort?.direction === "asc" && <TiArrowSortedUp />}
          {columnSort?.direction === "desc" && <TiArrowSortedDown />}
        </IconButton>
      )}
    </DataTableCell>
  );
};

export const TableHeaderRow = <T extends BaseObject>(
  props: TableHeaderRowProps<T>,
) => {
  return (
    <TableRow>
      {props.orderedColumnKeys.map((columnKey, colIndex) => {
        const column = props.headers[columnKey];
        const isSticky = props.stickyFirstColumn && colIndex === 0;

        return column && typeof column === "object" && "element" in column ? (
          <ComplexHeaderCell<T>
            key={columnKey.toString()}
            {...column}
            columnKey={columnKey}
            isSticky={isSticky}
          />
        ) : (
          <DataTableCell
            key={columnKey.toString()}
            align="center"
            isSticky={isSticky}
            sx={{
              backgroundColor: "white",
              borderColor: grey[300],
            }}
          >
            <Typography variant="body1">{column}</Typography>
          </DataTableCell>
        );
      })}
    </TableRow>
  );
};
