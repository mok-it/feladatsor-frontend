import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useCallback, useMemo } from "react";
import { useSelectExercisesQuery } from "@/generated/graphql.tsx";
import { useSearchParams } from "react-router-dom";
import {
  formatLocalDate,
  getQuickReportDateRange,
  parseLocalDate,
  parseReportDateRange,
  type QuickDateRange,
  type ReportDateRange,
  writeReportDateRange,
} from "./reportDateParams";

interface UserExerciseStats {
  userId: string;
  userName: string;
  avatarUrl?: string | null;
  totalExercises: number;
  soloExercises: number;
  collaborativeExercises: number;
  score: number;
}

const calculateUserStats = (
  exercises: Array<{
    id: string;
    createdBy: {
      id: string;
      name: string;
      userName: string;
      avatarUrl?: string | null;
    } | null;
    contributors?: Array<{
      id: string;
      name: string;
      userName: string;
      avatarUrl?: string | null;
    }> | null;
  }>,
): UserExerciseStats[] => {
  const statsMap = new Map<string, UserExerciseStats>();
  const exerciseUserCount = new Map<string, number>();

  // First pass: count total users per exercise
  exercises.forEach((exercise) => {
    const userCount = 1 + (exercise.contributors?.length ?? 0);
    exerciseUserCount.set(exercise.id, userCount);
  });

  // Second pass: calculate stats per user
  exercises.forEach((exercise) => {
    const totalUsers = exerciseUserCount.get(exercise.id) ?? 1;
    const pointsPerUser = 1 / totalUsers;
    const isSolo = totalUsers === 1;

    // Process creator
    if (exercise.createdBy) {
      const userId = exercise.createdBy.id;
      if (!statsMap.has(userId)) {
        statsMap.set(userId, {
          userId,
          userName: exercise.createdBy.name || exercise.createdBy.userName,
          avatarUrl: exercise.createdBy.avatarUrl,
          totalExercises: 0,
          soloExercises: 0,
          collaborativeExercises: 0,
          score: 0,
        });
      }
      const stats = statsMap.get(userId)!;
      stats.totalExercises++;
      stats.score += pointsPerUser;
      if (isSolo) {
        stats.soloExercises++;
      } else {
        stats.collaborativeExercises++;
      }
    }

    // Process contributors
    exercise.contributors?.forEach((contributor) => {
      const userId = contributor.id;
      if (!statsMap.has(userId)) {
        statsMap.set(userId, {
          userId,
          userName: contributor.name || contributor.userName,
          avatarUrl: contributor.avatarUrl,
          totalExercises: 0,
          soloExercises: 0,
          collaborativeExercises: 0,
          score: 0,
        });
      }
      const stats = statsMap.get(userId)!;
      stats.totalExercises++;
      stats.score += pointsPerUser;
      stats.collaborativeExercises++;
    });
  });

  return Array.from(statsMap.values()).sort((a, b) => b.score - a.score);
};

export const ExerciseReportingByUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateRange = useMemo(
    () => parseReportDateRange(searchParams),
    [searchParams],
  );

  const setDateRange = useCallback(
    (range: ReportDateRange) => {
      const nextParams = new URLSearchParams(searchParams);
      writeReportDateRange(nextParams, range);
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  const handleQuickDateRange = useCallback(
    (range: QuickDateRange) => {
      setDateRange(getQuickReportDateRange(range));
    },
    [setDateRange],
  );

  const { data, loading } = useSelectExercisesQuery({
    variables: {
      skip: 0,
      take: 10_000,
      createdAtFrom: (() => {
        const d = new Date(dateRange.startDate);
        d.setHours(0, 0, 0, 0);
        return d.toISOString();
      })(),
      createdAtTo: (() => {
        const d = new Date(dateRange.endDate);
        d.setHours(23, 59, 59, 999);
        return d.toISOString();
      })(),
    },
  });

  const userStats = useMemo(() => {
    if (!data?.exercises) return [];
    return calculateUserStats(data.exercises);
  }, [data]);

  return (
    <>
      <Stack gap={2} mb={2} direction="row">
        <Box display="flex" gap={2}>
          <TextField
            label="Kezdő dátum"
            type="date"
            value={formatLocalDate(dateRange.startDate)}
            onChange={(event) => {
              const startDate = parseLocalDate(event.target.value);
              if (!startDate) return;
              setDateRange({
                startDate,
                endDate:
                  startDate > dateRange.endDate ? startDate : dateRange.endDate,
              });
            }}
            slotProps={{ inputLabel: { shrink: true } }}
            size="small"
          />
          <TextField
            label="Vége dátum"
            type="date"
            value={formatLocalDate(dateRange.endDate)}
            onChange={(event) => {
              const endDate = parseLocalDate(event.target.value);
              if (!endDate) return;
              setDateRange({
                startDate:
                  endDate < dateRange.startDate ? endDate : dateRange.startDate,
                endDate,
              });
            }}
            slotProps={{ inputLabel: { shrink: true } }}
            size="small"
          />
        </Box>
        <ButtonGroup variant="outlined" size="small">
          <Button onClick={() => handleQuickDateRange("today")}>Ma</Button>
          <Button onClick={() => handleQuickDateRange("yesterday")}>
            Tegnap
          </Button>
          <Button onClick={() => handleQuickDateRange("last3days")}>
            Utolsó 3 nap
          </Button>
          <Button onClick={() => handleQuickDateRange("lastWeek")}>
            Utolsó hét
          </Button>
          <Button onClick={() => handleQuickDateRange("lastMonth")}>
            Utolsó hónap
          </Button>
        </ButtonGroup>
      </Stack>
      {loading ? (
        <Typography>Betöltés...</Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Felhasználó</TableCell>
                <TableCell align="right">
                  Összes feladat, amin dolgozott
                </TableCell>
                <TableCell align="right">Teljesen ő csinálta</TableCell>
                <TableCell align="right">Másokkal közösen</TableCell>
                <TableCell align="right">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap={0.5}
                  >
                    Pontszám
                    <Tooltip
                      title={
                        <>
                          Egyedül végzett feladat = 1 pont. <br />
                          Együttműködéses feladat = 1 / (résztvevők száma) pont.
                        </>
                      }
                      arrow
                    >
                      <IconButton size="small" sx={{ padding: 0.5 }}>
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userStats.map((stats) => (
                <TableRow key={stats.userId}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        src={stats.avatarUrl || undefined}
                        sx={{ width: 32, height: 32 }}
                      >
                        {stats.userName[0].toUpperCase()}
                      </Avatar>
                      <Typography>{stats.userName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${stats.totalExercises} db`}
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{stats.soloExercises} db</TableCell>
                  <TableCell align="right">
                    {stats.collaborativeExercises} db
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={stats.score.toFixed(2)}
                      color="secondary"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
