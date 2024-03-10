import { IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { useDataTable } from "./context/DataTableContext";
import Chip from "@mui/material/Chip";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import { grey } from "@/theme/palette.ts";

type PaginationProps = {
  rowsPerPageOptions: number[];
  disabled?: boolean;
  itemsPerPageText?: string;
};

export type DataTablePaginationRowProps = {
  pagination: PaginationProps;
  itemsPerPageText?: string;
};

const RowsPerPage = (props: PaginationProps) => {
  const { rowsPerPage, setRowsPerPage } = useDataTable();
  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Typography
        variant="body1"
        color={props.disabled ? "textDisabled" : undefined}
        sx={{ fontSize: 16 }}
      >
        {props.itemsPerPageText ?? "Sorok száma oldalanként:"}
      </Typography>
      {props.rowsPerPageOptions.map((option) => (
        <Chip
          key={option}
          sx={{ fontSize: 16 }}
          variant={rowsPerPage === option ? undefined : "filled"}
          label={option.toString()}
          onClick={() => setRowsPerPage(option)}
          color={
            !props.disabled && rowsPerPage === option ? "primary" : undefined
          }
        />
      ))}
    </Stack>
  );
};

const PaginationButtonGroup = (props: { disabled?: boolean }) => {
  const { nextPage, prevPage, firstPage, lastPage } = useDataTable();
  return (
    <Stack direction="row" alignItems="center" sx={{ color: "primary" }}>
      <IconButton
        disabled={props.disabled}
        onClick={firstPage}
        sx={{ fontSize: 16 }}
      >
        <FaAnglesLeft />
      </IconButton>
      <IconButton
        disabled={props.disabled}
        onClick={prevPage}
        sx={{ fontSize: 16 }}
      >
        <FaAngleLeft />
      </IconButton>
      <IconButton
        disabled={props.disabled}
        onClick={nextPage}
        sx={{ fontSize: 16 }}
      >
        <FaAngleRight />
      </IconButton>
      <IconButton
        disabled={props.disabled}
        onClick={lastPage}
        sx={{ fontSize: 16 }}
      >
        <FaAnglesRight />
      </IconButton>
    </Stack>
  );
};

export const DataTablePaginationRow: React.FC<
  PropsWithChildren<DataTablePaginationRowProps>
> = (props) => {
  const { totalDataLength, displayRowsFrom, displayRowsTo, loading } =
    useDataTable();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={props.children ? "space-between" : "end"}
      width="100%"
      p={1}
      boxSizing="border-box"
      borderTop="1px solid"
      borderColor={grey[300]}
    >
      {props.children}
      <Stack direction="row" alignItems="center" gap={2}>
        <RowsPerPage
          disabled={loading}
          rowsPerPageOptions={props.pagination.rowsPerPageOptions}
          itemsPerPageText={props.itemsPerPageText}
        />
        {loading && <Skeleton width={100} height={5} variant="rounded" />}
        {!loading && (
          <Typography variant="body1" sx={{ fontSize: 16 }}>
            {displayRowsFrom + 1}–{Math.min(displayRowsTo, totalDataLength)}{" "}
            a(z) {totalDataLength} sorból
          </Typography>
        )}
        <PaginationButtonGroup disabled={loading} />
      </Stack>
    </Stack>
  );
};
