import { FC } from "react";
import { StatsQuery } from "@/generated/graphql.tsx";
import {
  Avatar,
  Table,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import { StyledTableCell } from "@/components/StyledTableCell.tsx";
import { Stack } from "@mui/system";
import { FaCrown } from "react-icons/fa";
import { StatCard } from "@/components/StatCard.tsx";

export const LeaderBoardCard: FC<{
  loading: boolean;
  stats?: StatsQuery["globalStats"];
}> = (props) => {
  const winnerPodium = [
    {
      rank: 1,
      color: "gold",
    },
    {
      rank: 2,
      color: "orange",
    },
    {
      rank: 3,
      color: "gray",
    },
  ];
  return (
    <StatCard title="Leaderboard">
      {props.loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer
          sx={{
            maxHeight: 500,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow
                sx={{
                  position: "sticky",
                }}
              >
                <StyledTableCell
                  sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                  }}
                >
                  <Typography variant="body1" textAlign="center">
                    Név
                  </Typography>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                  }}
                >
                  <Typography variant="body1" textAlign="center">
                    Beküldött feladatok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>

            {props.stats?.userLeaderboard.map((item) => (
              <StyledTableRow key={item.user.id}>
                <StyledTableCell size="small">
                  <Stack direction="row" alignItems="center" gap={2}>
                    {winnerPodium.map(
                      (podium) =>
                        item.rank === podium.rank && (
                          <FaCrown color={podium.color} size="28px" />
                        ),
                    )}
                    {!winnerPodium.map((a) => a.rank).includes(item.rank) && (
                      <div style={{ width: "28px" }} />
                    )}

                    <Avatar
                      sx={{ position: "unset" }}
                      src={item.user.avatarUrl ?? undefined}
                    />

                    <Typography variant="body1">{item.user.name}</Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell size="small">
                  <Typography variant="body1" textAlign="center">
                    {item.submittedExerciseCount}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </Table>
        </TableContainer>
      )}
    </StatCard>
  );
};
