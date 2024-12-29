import { ExerciseRow } from "@/components/InfiniteLoad/ExerciseRow";
import { InfiniteLoad } from "@/components/InfiniteLoad/InfiniteLoad";
import { StyledTableCell } from "@/components/StyledTableCell.tsx";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import { ExerciseListElemFragment } from "@/generated/graphql.tsx";
import { TableOrder } from "@/util/useTableOrder";
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { FC } from "react";

const headCells: {
  id: keyof ExerciseListElemFragment;
  label: string;
  sortable: boolean;
}[] = [
  {
    id: "id",
    label: "fID",
    sortable: true,
  },
  {
    id: "difficulty",
    label: "Nehézség",
    sortable: false,
  },
  {
    id: "status",
    label: "Státusz",
    sortable: true,
  },
  {
    id: "tags",
    label: "Címkék",
    sortable: false,
  },
  {
    id: "description",
    label: "Feladat",
    sortable: true,
  },
  {
    id: "createdAt",
    label: "Létrehozva",
    sortable: true,
  },
];

export const ExerciseTable: FC<
  TableOrder<ExerciseListElemFragment> & {
    data: ExerciseListElemFragment[];
    fetchMore: () => Promise<void>;
    hasMore: boolean;
    loading: boolean;
  }
> = ({
  data,
  fetchMore,
  hasMore,
  loading,
  order,
  orderBy,
  setOrder,
  setOrderBy,
}) => {
  return (
    <Box sx={{ overflowX: "auto", mx: -2 }}>
      <Table
        sx={{
          minWidth: 650,
          mt: 4,
          overflow: "hidden",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <StyledTableRow>
            {headCells.map((headCell) => (
              <StyledTableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={headCell.id === "tags" ? { pl: 2.5 } : {}}
              >
                {headCell.sortable ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      setOrderBy(headCell.id);
                      setOrder(order === "asc" ? "desc" : "asc");
                    }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <InfiniteLoad<ExerciseListElemFragment>
            data={data}
            hasMore={hasMore}
            isInitialLoading={loading && data.length === 0}
            isFetchingNextPage={loading}
            fetchNextPage={async () => {
              await fetchMore();
            }}
          >
            {(row) => {
              return <ExerciseRow key={row.id} data={row} />;
            }}
          </InfiniteLoad>
        </TableBody>
      </Table>
    </Box>
  );
};
