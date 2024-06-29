import { SxProps } from "@mui/material";
import React from "react";

import { GroupingStrategy } from "./context/groupBy";

export type BaseObject = Record<PropertyKey, unknown>;
export type RowRenderers<T extends BaseObject> = {
  [key in keyof T]?: (item: T[key], row: T) => React.ReactNode;
};

export type ComplexColumn<T> = {
  /**
   * The label to be displayed in the table header
   */
  element: React.ReactNode;

  /**
   * Aligns the component in the table cell
   */
  align?: "inherit" | "left" | "center" | "right" | "justify";

  /**
   * If true, the column will be sortable
   */
  sortable?: boolean;

  /**
   * A function to sort the column, if not provided, the default JS sort function will be used
   * | Return Value | Sort Order                             |
   * |--------------|----------------------------------------|
   * | > 0          | Sort `a` after `b`, e.g. `[b, a]`      |
   * | < 0          | Sort `a` before `b`, e.g. `[a, b]`     |
   * | === 0        | Keep original order of `a` and `b`     |
   * ------------------------------------------------------- |
   */
  sortFunction?: (a: T, b: T) => number;

  /**
   A unit text to be displayed after the column name
   */
  unit?: string;

  /**
   * Custom styles for the table header cell
   */
  sx?: SxProps;
};

export type DataGenerator<T> = (
  rowFrom: number,
  rowTo: number,
) => Promise<T[]> | T[] | { error: string };

export type DataTableDataSource<T extends BaseObject> = {
  /**
   * Data to be displayed in the table as an array of objects (either use this data prop or the dataGenerator prop)
   */
  data?: T[];

  /**
   * If true, a table loading state will be displayed
   */
  loading?: boolean;

  /**
   * If true, a table error state will be displayed
   */
  error?: string;

  /**
   * An array of keys or groupBy functions to group the data by
   * Grouping function works just like Object.groupBy() in JS. Grouping calls this provided grouping function once for each element in the data[].
   * The callback function should return a string (PropertyKey) indicating the group of the associated element.
   */
  groupBy?: GroupingStrategy<T, string>[];

  /**
   * Display names mapped to keys corresponding the group keys created in the groupBy.
   */
  groupDisplayNames?: Record<PropertyKey, string>;
};

export type DataTableProps<T extends BaseObject> = {
  /**
   * The data to be displayed in the table, either as an array of objects or as a function that generates the data
   */
  dataSource: DataTableDataSource<T>;

  /**
   * A custom expandable element to be displayed under any row
   * @param row The row to be expanded
   * @returns A React element to be displayed under the row
   */
  expandableRowRenderer?: (row: T) => React.ReactNode | null;

  /**
   * A function to be called when a row is clicked
   * @param row
   */
  onRowClick?: (row: T) => void;

  /**
   * Any custom element to be displayed in the table body instead of the dataRows
   */
  customBodyRender?: (dataSource: DataTableDataSource<T>) => React.ReactNode;

  /**
   * A unique key for each row used for React reconciliation, if not provided, the index of the row will be used
   */
  rowKey?: keyof T;

  /**
   * The columns to be displayed in the table, based on the keys of the data object
   */
  columns: {
    [key in keyof T]?:
      | ComplexColumn<T>
      | React.ReactElement
      | string
      | number
      | boolean;
  };

  /**
   * Make the first column sticky to the left of the table while scrolling
   */
  stickyFirstColumn?: boolean;

  /**
   * On hover highlight the row
   */
  hoverable?: boolean;

  /**
   * Optional render functions to render a specific column
   */
  rowRenderers?: RowRenderers<T>;

  pagination?: {
    /**
     * The number of rows to be displayed in the table
     */
    defaultRowsPerPage: number;
    /**
     * The number of rows options to be displayed in the table (ex: 10, 25, 50, 100)
     */
    rowsPerPageOptions: number[];

    /**
     * The text to be displayed in the pagination component
     */
    itemsPerPageText?: string;

    /**
     * Any custom element to be displayed in the pagination component
     */
    extraContent?: React.ReactNode;
  };

  /**
   * Custom styles for the most outer component
   */
  sx?: SxProps;

  /**
   * Maximum height of the table
   */
  maxHeight?: string;
};
