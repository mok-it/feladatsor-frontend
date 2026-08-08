import { ExerciseRow } from "@/components/InfiniteLoad/ExerciseRow";
import { InfiniteLoad } from "@/components/InfiniteLoad/InfiniteLoad";
import { StyledTableCell } from "@/components/StyledTableCell.tsx";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import { ExerciseListElemFragment } from "@/generated/graphql.tsx";
import { TableOrder } from "@/util/useTableOrder";
import {
  Box,
  Select,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
  useMediaQuery,
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
    id: "checks",
    label: "Ellenőrzések",
    sortable: false,
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
    onRowSelect?: (id: string) => void;
    selectedId?: string;
  }
> = ({
  data,
  fetchMore,
  hasMore,
  loading,
  order,
  orderBy,
  selectedId,
  setSorting,
  onRowSelect,
}) => {
  const isMobile = useMediaQuery("(max-width: 1200px)");

  return (
    <Box sx={{ overflowX: isMobile ? "hidden" : "auto", mx: -2 }}>
      <Table
        sx={{
          width: "100%",
          overflow: "hidden",
          tableLayout: "fixed",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <StyledTableRow>
            {isMobile && (
              <StyledTableCell sx={{ width: "100%", pb: 1 }}>
                <Select
                  native
                  size="small"
                  value={orderBy ?? ""}
                  sx={{ mr: 1, mb: 1, bgcolor: "background.paper" }}
                  onChange={(e) => {
                    setSorting(
                      e.target.value as keyof ExerciseListElemFragment,
                      "asc",
                    );
                  }}
                >
                  {headCells
                    .filter((cell) => cell.sortable)
                    .map((headCell) => (
                      <option key={headCell.id} value={headCell.id}>
                        {headCell.label}
                      </option>
                    ))}
                </Select>
                <Select
                  native
                  size="small"
                  value={order}
                  sx={{ mr: 1, mb: 1, bgcolor: "background.paper" }}
                  onChange={() => {
                    setSorting(orderBy, order === "asc" ? "desc" : "asc");
                  }}
                >
                  <option value="asc">Növekvő</option>
                  <option value="desc">Csökkenő</option>
                </Select>
              </StyledTableCell>
            )}
            {!isMobile &&
              headCells.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{
                    pl: headCell.id === "tags" ? 2.5 : 2,
                    width: headCell.id === "difficulty" ? 170 : "auto",
                  }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => {
                        setSorting(
                          headCell.id,
                          orderBy === headCell.id && order === "asc"
                            ? "desc"
                            : "asc",
                        );
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
            asTableRows
            colSpan={isMobile ? 1 : headCells.length}
            fetchNextPage={async () => {
              await fetchMore();
            }}
          >
            {(row) => {
              return (
                <ExerciseRow
                  key={row.id}
                  data={row}
                  onSelect={onRowSelect}
                  isSelected={selectedId === row.id}
                />
              );
            }}
          </InfiniteLoad>
        </TableBody>
      </Table>
    </Box>
  );
};
