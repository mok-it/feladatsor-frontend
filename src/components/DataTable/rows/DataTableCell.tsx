import { Box, IconButton, Stack, SxProps, TableCell } from "@mui/material";
import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { ensureSxArray } from "@/util/ensureSxArray.ts";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

type DataTableCellProps = {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  isSticky?: boolean;
  backgroundColor?: string;
  sx?: SxProps;
  expandable?: boolean;
  expanded?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export const DataTableCell: FC<PropsWithChildren<DataTableCellProps>> = (
  props,
) => {
  const stickyConfig: SxProps = props.isSticky
    ? {
        position: "sticky",
        left: 0,
        zIndex: 10,
      }
    : {};
  return (
    <TableCell
      align={props.align}
      height="40px"
      sx={[
        {
          p: 0,
          whiteSpace: "nowrap",
          background: "transparent",
          ...stickyConfig,
        },
        ...ensureSxArray(props.sx),
      ]}
    >
      <Stack direction="row" alignItems="center">
        {props.expandable && (
          <IconButton
            sx={{
              justifySelf: "start",
              alignSelf: "start",
            }}
            data-testid=""
            onClick={props.onClick}
          >
            {props.expanded ? <FaAngleDown /> : <FaAngleRight />}
          </IconButton>
        )}
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent={props.align}
          alignItems="center"
          sx={{ px: 2, backgroundColor: props.backgroundColor ?? "white" }}
        >
          {props.children}
        </Box>
        {props.isSticky && (
          <Box
            width="16px"
            height="40px"
            sx={{
              justifySelf: "end",
              background:
                "linear-gradient(90deg, rgba(32, 35, 60, 0.10) 0%, rgba(32, 35, 60, 0) 100%)",
              borderLeft: "1px #DFE0E7 solid",
            }}
          ></Box>
        )}
      </Stack>
    </TableCell>
  );
};
