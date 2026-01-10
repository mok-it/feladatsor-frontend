import { ExerciseStatusBadge } from "@/components/exercise/ExerciseStatusBadge.tsx";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import {
  ExerciseAgeGroup,
  ExerciseListElemFragment,
} from "@/generated/graphql";
import {
  Box,
  Chip,
  Stack,
  TableCell,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryDifficulties } from "../CategoryDifficulties";
import { Checks } from "../Checks";
import { KaTeX } from "../Katex";

const ExerciseRow: FC<{
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  data: ExerciseListElemFragment;
}> = ({ isSelected: isSelectedProp, data, onSelect }) => {
  const [isSelected, setSelected] = useState(isSelectedProp);
  useEffect(() => {
    setSelected(isSelectedProp);
  }, [isSelectedProp]);

  const isMobile = useMediaQuery("(max-width: 1200px)");
  const difficulties: Record<ExerciseAgeGroup, number> = {
    KOALA: 0,
    MEDVEBOCS: 0,
    KISMEDVE: 0,
    NAGYMEDVE: 0,
    JEGESMEDVE: 0,
  };

  data.difficulty.forEach((difficulty) => {
    difficulties[difficulty.ageGroup] = difficulty.difficulty;
  });

  return (
    <StyledTableRow>
      {isMobile ? (
        <Link
          target="_blank"
          style={{ textDecoration: "none" }}
          to={`/exercise/${data.id}`}
        >
          <TableCell>
            <Stack spacing={1}>
              <Stack
                direction="row"
                alignItems={"center"}
                flexWrap={"wrap"}
                rowGap={1}
                spacing={1}
              >
                <Box sx={{ whiteSpace: "nowrap" }}>{"#" + data.id}</Box>
                {ExerciseStatusBadge(data)}
                <Checks data={data.checks} />
                <Box flexGrow={1} />
                <div style={{ margin: 0 }}>
                  <CategoryDifficulties value={difficulties} />
                </div>
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                gap={1}
                flexWrap="wrap"
              >
                {data.tags.map((tag, index) => (
                  <Chip size="small" key={index} label={tag.name} />
                ))}
              </Stack>
              <Tooltip title={<KaTeX fixNewLines value={data.description} />}>
                <Box
                  sx={{
                    fontSize: 14,
                    maxHeight: 40,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <KaTeX value={data.description} />
                </Box>
              </Tooltip>
              <Typography variant="caption">
                {dayjs(+data.createdAt).format("YYYY. MM. DD.")}
              </Typography>
            </Stack>
          </TableCell>
        </Link>
      ) : (
        <>
          <TableCell sx={{ minWidth: 100 }}>
            {onSelect && (
              <Checkbox
                checked={isSelected}
                onChange={() => {
                  setSelected(true);
                  onSelect(data.id);
                }}
              />
            )}
            <Link target="_blank" to={`/exercise/${data.id}`}>
              {"#" + data.id}
            </Link>
          </TableCell>
          <TableCell sx={{ minWidth: 260 }}>
            <CategoryDifficulties value={difficulties} />
          </TableCell>
          <TableCell sx={{ verticalAlign: "middle" }}>
            <ExerciseStatusBadge status={data.status} />
          </TableCell>
          <TableCell>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Checks data={data.checks} />
            </Stack>
          </TableCell>
          <TableCell>
            {data.tags.map((tag, index) => (
              <Chip
                size="small"
                key={index}
                label={tag.name}
                sx={{ margin: 0.5 }}
              />
            ))}
          </TableCell>
          <TableCell sx={{ minWidth: 300 }}>
            <Tooltip title={<KaTeX fixNewLines value={data.description} />}>
              <Box
                sx={{
                  maxHeight: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                <KaTeX value={data.description} />
              </Box>
            </Tooltip>
          </TableCell>
          <TableCell sx={{ verticalAlign: "left" }}>
            {dayjs(+data.createdAt).format("YYYY. MM. DD.")}
          </TableCell>
        </>
      )}
    </StyledTableRow>
  );
};

const MemoizedExerciseRow = memo(ExerciseRow);

export { MemoizedExerciseRow as ExerciseRow };
