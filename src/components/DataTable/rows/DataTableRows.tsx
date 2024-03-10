import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren, useState } from "react";

import { getKeys } from "../context/getKeys";
import { GroupByMultipleReturn } from "../context/groupBy";
import { BaseObject, DataTableProps, RowRenderers } from "../DataTable.types";
import { DataTableCell } from "./DataTableCell";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { palette, primary } from "@/theme/palette.ts";
import { useDataTable } from "@/components/DataTable/context/DataTableContext.tsx";

type TableDataRowsProps<T extends BaseObject> = {
  rowKey?: keyof T;
  orderedColumnKeys: (keyof T)[];
  rowRenderers?: RowRenderers<T>;
  expandableRowRenderer: DataTableProps<T>["expandableRowRenderer"];
  columns: DataTableProps<T>["columns"];
  groupDisplayNames?: Record<string, string>;
  stickyFirstColumn?: boolean;
  hoverable?: boolean;
};
export const DataTableRows = <T extends BaseObject>(
  props: TableDataRowsProps<T>,
) => {
  const { dataSlice } = useDataTable<T>();

  return (
    <DataTableRowsRecursive
      {...props}
      dataSlice={dataSlice}
      indentLevel={0}
      groupDisplayNames={props.groupDisplayNames}
    />
  );
};

const DataTableRowsRecursive = <T extends BaseObject>(
  props: TableDataRowsProps<T> & {
    dataSlice: GroupByMultipleReturn<T, ["", ""]> | T[];
    groupDisplayNames?: Record<string, string>;
    indentLevel: number;
  },
) => {
  return Array.isArray(props.dataSlice) ? (
    <>
      {props.dataSlice.map((row, id) => (
        //props.rowKey ? String(props.row[props.rowKey]) : id
        <DataTableDataRow<T>
          expandableRowRenderer={props.expandableRowRenderer}
          key={props.rowKey ? String(row[props.rowKey]) : id}
          row={row}
          orderedColumnKeys={props.orderedColumnKeys}
          rowRenderers={props.rowRenderers}
          columns={props.columns}
          color="white"
          stickyFirstColumn={props.stickyFirstColumn}
          hoverable={props.hoverable}
        />
      ))}
    </>
  ) : (
    <>
      {getKeys(props.dataSlice).map((key) => (
        <DataTableCollapseRow
          key={key}
          name={key}
          indentLevel={props.indentLevel}
          groupDisplayNames={props.groupDisplayNames}
        >
          <DataTableRowsRecursive
            {...props}
            indentLevel={props.indentLevel + 1}
            dataSlice={(props.dataSlice as Record<string, never>)[key]}
          />
        </DataTableCollapseRow>
      ))}
    </>
  );
};

type DataTableCollapseRowProps = {
  name: string;
  indentLevel: number;
  groupDisplayNames?: Record<string, string>;
};

const DataTableCollapseRow: React.FC<
  PropsWithChildren<DataTableCollapseRowProps>
> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{
          borderBottom: "unset",
          p: 0,
          height: "40px",
        }}
      >
        <TableCell
          sx={{
            p: 0,
            pl: props.indentLevel * 2,
            position: "sticky",
            left: 0,
          }}
          colSpan={1000}
        >
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpen((o) => !o);
            }}
          >
            {open ? <FaAngleDown /> : <FaAngleRight />}
          </IconButton>
          <Typography variant="body1">
            {(props.groupDisplayNames
              ? props.groupDisplayNames[props.name]
              : null) ?? props.name}
          </Typography>
        </TableCell>
      </TableRow>
      {open && props.children}
    </>
  );
};

type DataTableDataRowProps<T extends BaseObject> = {
  row: T;
  expandableRowRenderer: DataTableProps<T>["expandableRowRenderer"];
  orderedColumnKeys: (keyof T)[];
  rowRenderers?: RowRenderers<T>;
  columns: DataTableProps<T>["columns"];
  color?: string;
  stickyFirstColumn?: boolean;
  hoverable?: boolean;
};

const DataTableDataRow = <T extends BaseObject>(
  props: DataTableDataRowProps<T>,
) => {
  const align = getKeys(props.columns).reduce(
    (acc, key) => {
      if (
        props.columns[key] &&
        typeof props.columns[key] === "object" &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "align" in props.columns[key]
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[key] = props.columns[key]?.align;
      }
      return acc;
    },
    {} as { [key in keyof T]?: "left" | "center" | "right" },
  );

  const [hovered, setHovered] = useState(false);
  const bgColor = hovered ? primary.lighter : props.color;

  const [expanded, setExpanded] = useState(false);
  const ExpandedChild = props.expandableRowRenderer
    ? props.expandableRowRenderer(props.row)
    : null;
  return (
    <>
      <TableRow
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded((e) => !e)}
        sx={{
          backgroundColor: bgColor,
          overflow: "sroll",
          cursor: ExpandedChild ? "pointer" : undefined,
        }}
      >
        {props.orderedColumnKeys.map((columnKey, colIndex) => {
          const rowRenderer =
            props.rowRenderers && props.rowRenderers[columnKey];
          const isSticky = props.stickyFirstColumn ? colIndex === 0 : false;
          return (
            <DataTableCell
              key={columnKey.toString()}
              align={align[columnKey] ?? "center"}
              isSticky={isSticky}
              backgroundColor={bgColor}
              expandable={colIndex === 0 && !!ExpandedChild}
              expanded={expanded}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setExpanded((e) => !e);
              }}
            >
              {rowRenderer
                ? rowRenderer(props.row[columnKey], props.row)
                : String(props.row[columnKey])}
            </DataTableCell>
          );
        })}
      </TableRow>
      {ExpandedChild && (
        <TableRow>
          <TableCell
            sx={{
              p: 0,
              pl: 2,
              border: expanded ? undefined : "unset",
              backgroundColor: palette().background.default,
            }}
            colSpan={1000}
          >
            <Collapse in={expanded}>{ExpandedChild}</Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
