import React, { createContext, useEffect, useState } from "react";

import {
  BaseObject,
  ComplexColumn,
  DataTableDataSource,
  DataTableProps,
} from "../DataTable.types";
import { getKeys } from "./getKeys";
import { groupByMultiple, GroupByMultipleReturn } from "./groupBy";

type ColumnSortingArray = {
  columnKey: keyof BaseObject;
  direction: "asc" | "desc" | null;
}[];

type DataTableContextType<T extends BaseObject> = {
  dataSource: DataTableDataSource<T>;

  currentPage: number;
  totalDataLength: number;

  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;

  displayRowsFrom: number;
  displayRowsTo: number;
  dataSlice: GroupByMultipleReturn<T, ["", ""]> | T[];
  loading: boolean;
  error: string | null;

  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;

  columnSorting: ColumnSortingArray;
  sortColumn: (columnKey: keyof T) => void;
};
const DataTableContext = createContext(
  null as unknown as DataTableContextType<BaseObject>,
);

export const DataTableContextProvider = <T extends BaseObject>(
  props: DataTableProps<T> & { children: React.ReactNode },
) => {
  const totalDataLength =
    "data" in props.dataSource && props.dataSource.data
      ? props.dataSource.data.length
      : props.dataSource.totalRows;

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, _setRowsPerPage] = useState(
    props.pagination?.defaultRowsPerPage ??
      props.pagination?.rowsPerPageOptions[0] ??
      totalDataLength,
  );
  const [dataSlice, setDataSlice] = useState<
    GroupByMultipleReturn<T, ["", ""]> | T[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState(
    Array.isArray(props.dataSource.data)
      ? [...props.dataSource.data]
      : undefined,
  );

  //An array storing the sorting columns, and directions, sorting is done in the order of the array, meaning the last element in the array will be the most significant sorting column
  const [columnSorting, setColumnSorting] = useState<ColumnSortingArray>(
    getKeys(props.columns).map((key) => ({
      columnKey: key as keyof BaseObject,
      direction: null,
    })),
  );

  //Each time any column is sorted by the user, change the sorting direction of the column, and move it to the end of the array, creating that column the most significant sorting column
  const sortColumn = (columnKey: keyof T) => {
    setColumnSorting((colSort) => {
      const colSortIndex = colSort.findIndex(
        (item) => item.columnKey === columnKey,
      );
      const colSortCopy = [...columnSorting];

      const sortDirs = ["asc", "desc", null];
      colSortCopy[colSortIndex].direction = sortDirs[
        (sortDirs.indexOf(colSortCopy[colSortIndex].direction) + 1) % 3
      ] as "asc" | "desc" | null;

      // Remove the element at the specified index and move it to the end of the array
      const itemToMove = colSortCopy.splice(colSortIndex, 1)[0];
      colSortCopy.push(itemToMove);
      return colSortCopy;
    });
  };

  const setRowsPerPage = (rowsPerPage: number) => {
    _setRowsPerPage(rowsPerPage);
    setCurrentPage(0);
  };

  const maxPage = Math.ceil(totalDataLength / rowsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => (prev + 1 >= maxPage ? prev : prev + 1));
  const prevPage = () =>
    setCurrentPage((prev) => (prev - 1 < 0 ? prev : prev - 1));
  const firstPage = () => setCurrentPage(0);
  const lastPage = () => setCurrentPage(maxPage - 1);

  const displayRowsFrom = currentPage * rowsPerPage;
  const displayRowsTo = (currentPage + 1) * rowsPerPage;

  /*
   * Slicing the data into pages
   */
  useEffect(() => {
    if (data && "data" in props.dataSource) {
      const dataSlice = data.slice(displayRowsFrom, displayRowsTo);
      const grouped = props.dataSource.groupBy
        ? groupByMultiple(dataSlice, props.dataSource.groupBy)
        : dataSlice;
      setDataSlice(grouped);
    }
  }, [data, props.dataSource.data, displayRowsFrom, displayRowsTo]);

  /*
   * Generate data with the dataGenerator function
   */
  useEffect(() => {
    if (props.dataSource["dataGenerator"] !== undefined) {
      (async () => {
        setLoading(true);
        const res = await props.dataSource.dataGenerator?.(
          displayRowsFrom,
          displayRowsTo,
        );
        if (res) {
          if ("error" in res) setError(res.error);
          else setDataSlice(res);
        }
        setLoading(false);
      })();
    }
  }, [displayRowsFrom, displayRowsTo, props.dataSource.dataGenerator]);

  /*
   *  Sorting the data
   */
  useEffect(() => {
    const _data = Array.isArray(props.dataSource.data)
      ? [...props.dataSource.data]
      : undefined;
    if (_data) {
      for (const colSort of columnSorting) {
        const column = props.columns[colSort.columnKey] as ComplexColumn<T>;
        //This column is complex, meaning it can be sorted
        if (typeof column == "object" && "element" in column) {
          if (!column.sortable) continue;

          //Sort the data based on the column's sorting function
          _data.sort((a, b) => {
            let res = 0;
            if (column.sortFunction) res = column.sortFunction(a, b);
            else {
              if (typeof a[colSort.columnKey] === "string")
                res = (a[colSort.columnKey] as string).localeCompare(
                  b[colSort.columnKey] as string,
                );
              else if (typeof a[colSort.columnKey] === "number")
                res =
                  (a[colSort.columnKey] as number) -
                  (b[colSort.columnKey] as number);
              else if (typeof a[colSort.columnKey] === "boolean")
                res = (a[colSort.columnKey] as boolean) ? 1 : -1;
            }
            if (colSort.direction === "desc") return res * -1;
            return res;
          });
        }
      }
      setData(_data);
    }
  }, [columnSorting, props.columns, props.dataSource]);

  return (
    <DataTableContext.Provider
      value={{
        currentPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
        rowsPerPage,
        setRowsPerPage,
        totalDataLength,
        displayRowsFrom,
        displayRowsTo,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dataSource: props.dataSource,
        dataSlice,
        loading,
        error,
        columnSorting,
        sortColumn,
      }}
    >
      {props.children}
    </DataTableContext.Provider>
  );
};

export const useDataTable = <T extends BaseObject>() => {
  const context = React.useContext(DataTableContext);
  if (!context)
    throw new Error(
      "useDataTable must be used within DataTableContextProvider",
    );
  return context as DataTableContextType<T>;
};
