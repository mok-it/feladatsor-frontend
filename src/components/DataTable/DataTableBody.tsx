import { TableBody } from '@mui/material';
import React from 'react';

import { useDataTable } from './context/DataTableContext';
import { getKeys } from './context/getKeys';
import {
  BaseObject,
  ComplexColumn,
  DataTableDataSource,
  DataTableProps,
  RowRenderers,
} from './DataTable.types';
import { DataTableLoadingRows } from './rows/DataTableLoadingRows';
import { DataTableRows } from './rows/DataTableRows';

export const DataTableBody = <T extends BaseObject>(props: {
  columns: DataTableProps<T>['columns'];
  expandableRowRenderer: DataTableProps<T>['expandableRowRenderer'];
  orderedColumnKeys: Array<keyof { [key in keyof T]?: ComplexColumn<T> | React.ReactNode }>;
  dataSource: DataTableDataSource<T>;
  rowRenderers?: RowRenderers<T>;
  rowKey?: keyof T;
  stickyFirstColumn: boolean | undefined;
  hoverable: boolean | undefined;
}) => {
  const { loading, rowsPerPage } = useDataTable();
  return (
    <TableBody sx={{ overflow: 'scroll' }}>
      {loading && (
        <DataTableLoadingRows
          rows={Math.min(rowsPerPage, 20)}
          columns={getKeys(props.columns).length ?? 5}
        />
      )}
      {!loading && (
        <DataTableRows
          expandableRowRenderer={props.expandableRowRenderer}
          orderedColumnKeys={props.orderedColumnKeys}
          groupDisplayNames={props.dataSource.groupDisplayNames}
          rowRenderers={props.rowRenderers}
          rowKey={props.rowKey}
          columns={props.columns}
          stickyFirstColumn={props.stickyFirstColumn}
          hoverable={props.hoverable}
        />
      )}
    </TableBody>
  );
};
