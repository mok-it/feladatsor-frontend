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
  const isMobile = useMediaQuery("(max-width: 1200px)");

  return (
    <Box sx={{ overflowX: isMobile ? "hidden" : "auto", mx: -2 }}>
      <Table
        sx={{
          width: "100%",
          mt: 4,
          overflow: "hidden",
          tableLayout: "fixed",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <StyledTableRow>
            {isMobile && (
              <StyledTableCell sx={{ width: "100%" }}>
                <Select
                  native
                  size="small"
                  value={orderBy}
                  sx={{ mr: 1, bgcolor: "background.paper" }}
                  onChange={(e) => {
                    setOrderBy(
                      e.target.value as keyof ExerciseListElemFragment,
                    );
                    setOrder("asc");
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
                  sx={{ mr: 1, bgcolor: "background.paper" }}
                  onChange={() => {
                    setOrder(order === "asc" ? "desc" : "asc");
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
