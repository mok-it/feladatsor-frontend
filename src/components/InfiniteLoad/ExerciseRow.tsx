import {
  ExerciseAgeGroup,
  ExerciseListElemFragment,
} from "@/generated/graphql";
import { palette } from "@/theme/palette";
import { Box, Chip, TableCell, TableRow, Tooltip } from "@mui/material";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryDifficulties } from "../CategoryDifficulties";
import { KaTeX } from "../Katex";

const ExerciseRow: FC<{ data: ExerciseListElemFragment }> = ({ data }) => {
  const navigate = useNavigate();
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
    <TableRow
      onClick={() => navigate(`/exercise/${data.id}`)}
      sx={{
        cursor: "pointer",
        ":nth-child(even)": { background: palette().background.neutral },
      }}
    >
      <TableCell sx={{ minWidth: 100 }}>
        <Chip label={data.id} />
      </TableCell>
      <TableCell sx={{ minWidth: 200 }}>
        <CategoryDifficulties value={difficulties} />
      </TableCell>
      <TableCell sx={{ verticalAlign: "middle" }}>{data.status}</TableCell>
      <TableCell>
        {data.tags.map((tag, index) => (
          <Chip key={index} label={tag.name} sx={{ margin: 0.5 }} />
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
    </TableRow>
  );
};

const MemoizedExerciseRow = memo(ExerciseRow);

export { MemoizedExerciseRow as ExerciseRow };
