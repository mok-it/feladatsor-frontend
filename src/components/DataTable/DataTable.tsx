import { Box, Table, TableContainer, TableHead } from "@mui/material";

import { DataTableContextProvider } from "./context/DataTableContext";
import { getKeys } from "./context/getKeys";
import { BaseObject, DataTableProps } from "./DataTable.types";
import { DataTableBody } from "./DataTableBody";
import { DataTablePaginationRow } from "./DataTablePaginationRow";
import { TableHeaderRow } from "./rows/TableHeaderRow";
import { ensureSxArray } from "@/util/ensureSxArray.ts";

export const DataTable = <T extends BaseObject>(props: DataTableProps<T>) => {
  const orderedColumnKeys = getKeys(props.columns);

  return (
    <Box sx={[{ backgroundColor: "white" }, ...ensureSxArray(props.sx)]}>
      <DataTableContextProvider {...props}>
        <TableContainer sx={{ maxHeight: props.maxHeight }}>
          <Table stickyHeader sx={{ boxSizing: "border-box" }}>
            <TableHead>
              <TableHeaderRow
                headers={props.columns}
                orderedColumnKeys={orderedColumnKeys}
                stickyFirstColumn={props.stickyFirstColumn}
              />
            </TableHead>
            {props.customBodyRender && props.customBodyRender(props.dataSource)}
            {!props.customBodyRender && (
              <DataTableBody
                expandableRowRenderer={props.expandableRowRenderer}
                columns={props.columns}
                orderedColumnKeys={orderedColumnKeys}
                dataSource={props.dataSource}
                rowRenderers={props.rowRenderers}
                rowKey={props.rowKey}
                stickyFirstColumn={props.stickyFirstColumn}
                hoverable={props.hoverable}
                onRowClick={props.onRowClick}
              />
            )}
          </Table>
        </TableContainer>
        {props.pagination && (
          <DataTablePaginationRow
            pagination={{
              rowsPerPageOptions: props.pagination.rowsPerPageOptions,
            }}
            itemsPerPageText={props.pagination.itemsPerPageText}
          >
            {props.pagination.extraContent}
          </DataTablePaginationRow>
        )}
      </DataTableContextProvider>
    </Box>
  );
};
