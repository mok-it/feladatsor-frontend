import { KaTeX } from "@/components/Katex";
import { useSelectExerciseQuery } from "@/generated/graphql.tsx";
import { composeAtom } from "@/util/atoms";
import { GpsFixed } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Link as MuiLink,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { FC, memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

type ExerciseSheetListRow = {
  cardId: string;
  exerciseId: string;
};

const highlightTimers = new WeakMap<HTMLElement, number>();
const HIGHLIGHT_DURATION_MS = 2000;

const CountSkeleton = () => <Skeleton width={24} />;

const ExerciseRowComponent: FC<{ row: ExerciseSheetListRow }> = ({ row }) => {
  const { data, loading } = useSelectExerciseQuery({
    variables: { exerciseId: row.exerciseId },
  });
  const exercise = data?.exercise;
  const scrollToExercise = useCallback(() => {
    const target = document.querySelector<HTMLElement>(
      `[data-card-id="${CSS.escape(row.cardId)}"]`,
    );
    if (!target) return;

    const existingTimer = highlightTimers.get(target);
    if (existingTimer) window.clearTimeout(existingTimer);

    target.dataset.jumpHighlighted = "true";
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = window.setTimeout(() => {
      delete target.dataset.jumpHighlighted;
      highlightTimers.delete(target);
    }, HIGHLIGHT_DURATION_MS);
    highlightTimers.set(target, timer);
  }, [row.cardId]);

  return (
    <TableRow hover>
      <TableCell sx={{ width: 58 }}>
        <MuiLink component={Link} to={`/exercise/${row.exerciseId}`}>
          #{row.exerciseId}
        </MuiLink>
      </TableCell>
      <TableCell sx={{ width: 160, maxWidth: 160 }}>
        {loading ? (
          <Skeleton />
        ) : exercise ? (
          <Tooltip title={exercise.description} placement="top">
            <Typography
              component="div"
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <KaTeX value={exercise.description} />
            </Typography>
          </Tooltip>
        ) : (
          <Typography color="error" variant="body2">
            A feladat nem tölthető be
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        {loading ? <CountSkeleton /> : exercise?.helpingQuestions.length ?? 0}
      </TableCell>
      <TableCell align="center">
        {loading ? <CountSkeleton /> : exercise?.solutionOptions.length ?? 0}
      </TableCell>
      <TableCell align="center" sx={{ width: 44, px: 0.5 }}>
        <Tooltip title={`Ugrás a(z) #${row.exerciseId} feladathoz`}>
          <IconButton
            size="small"
            onClick={scrollToExercise}
            aria-label={`Ugrás a(z) #${row.exerciseId} feladathoz`}
          >
            <GpsFixed fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

const ExerciseRow = memo(ExerciseRowComponent);

export const ExerciseSheetList: FC = () => {
  const items = useAtomValue(composeAtom);
  const rows = useMemo(
    () =>
      Object.values(items).flatMap((exercises) =>
        exercises.flatMap(({ cardId, id }) =>
          id
            ? [
                {
                  cardId,
                  exerciseId: String(id),
                },
              ]
            : [],
        ),
      ),
    [items],
  );

  if (rows.length === 0) {
    return (
      <Box p={2}>
        <Alert severity="info">A feladatsor még nem tartalmaz feladatot.</Alert>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 58 }}>ID</TableCell>
            <TableCell sx={{ width: 160 }}>Leírás</TableCell>
            <TableCell
              align="center"
              sx={{ width: 72, px: 0.5, whiteSpace: "normal" }}
            >
              Segítő kérdések
            </TableCell>
            <TableCell
              align="center"
              sx={{ width: 72, px: 0.5, whiteSpace: "normal" }}
            >
              Válaszopciók
            </TableCell>
            <TableCell sx={{ width: 44, px: 0.5 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <ExerciseRow key={row.cardId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
