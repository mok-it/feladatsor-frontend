import { TableRow } from '@mui/material';
import { grey } from '@theme/strictColors';
import { ensureSxArray } from '@utils/utils';
import React from 'react';

import { SortingAscendingIcon, SortingDescendingIcon, SortingMixedIcon } from '../../BaseIcon';
import IconButton from '../../IconButton';
import Text from '../../Text';
import { useDataTable } from '../context/DataTableContext';
import { BaseObject, ComplexColumn, DataTableProps } from '../DataTable.types';
import { DataTableCell } from './DataTableCell';

type TableHeaderRowProps<T extends BaseObject> = {
  orderedColumnKeys: (keyof T)[];
  headers: DataTableProps<T>['columns'];
  stickyFirstColumn?: boolean;
};

const ComplexHeaderCell = <T extends BaseObject>(
  props: ComplexColumn<T> & { columnKey: keyof T; isSticky?: boolean },
) => {
  const { sortColumn, columnSorting } = useDataTable<T>();
  const columnSort = columnSorting.find((item) => item.columnKey === props.columnKey);
  return (
    <DataTableCell
      align={props.align ?? 'center'}
      sx={[...ensureSxArray(props.sx), { backgroundColor: 'white' }, { borderColor: grey[300] }]}
      isSticky={props.isSticky}
      backgroundColor="white"
    >
      <Text data-testid="" variant="textSemiBold">
        {props.element}
      </Text>
      {props.unit && (
        <Text sx={{ ml: 1 }} data-testid="" variant="labelRegular">
          {props.unit}
        </Text>
      )}
      {props.sortable && (
        <IconButton data-testid="" onClick={() => sortColumn(props.columnKey)}>
          {columnSort?.direction === null && <SortingMixedIcon color="textLabel" fontSize="16px" />}
          {columnSort?.direction === 'asc' && (
            <SortingAscendingIcon color="textLabel" fontSize="16px" />
          )}
          {columnSort?.direction === 'desc' && (
            <SortingDescendingIcon color="textLabel" fontSize="16px" />
          )}
        </IconButton>
      )}
    </DataTableCell>
  );
};

export const TableHeaderRow = <T extends BaseObject>(props: TableHeaderRowProps<T>) => {
  return (
    <TableRow>
      {props.orderedColumnKeys.map((columnKey, colIndex) => {
        const column = props.headers[columnKey];
        const isSticky = props.stickyFirstColumn && colIndex === 0;

        return column && typeof column === 'object' && 'element' in column ? (
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
              backgroundColor: 'white',
              borderColor: grey[300],
            }}
          >
            <Text data-testid="" variant="textSemiBold">
              {column}
            </Text>
          </DataTableCell>
        );
      })}
    </TableRow>
  );
};
