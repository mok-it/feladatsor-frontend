import {
  ExerciseAgeGroup,
  ExerciseListElemFragment,
} from "@/generated/graphql";
import { Box, Chip, TableCell, Tooltip } from "@mui/material";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryDifficulties } from "../CategoryDifficulties";
import { KaTeX } from "../Katex";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import dayjs from "dayjs";
import { exerciseStatusToHuman } from "@/util/const.ts";

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
    <StyledTableRow
      onClick={() => navigate(`/exercise/${data.id}`)}
      sx={{
        cursor: "pointer",
      }}
    >
      <TableCell sx={{ minWidth: 100 }}>
        <Chip label={"#" + data.id} />
      </TableCell>
      <TableCell sx={{ minWidth: 210 }}>
        <CategoryDifficulties value={difficulties} />
      </TableCell>
      <TableCell sx={{ verticalAlign: "middle" }}>
        <Chip
          variant="outlined"
          color={exerciseStatusToHuman[data.status].color}
          label={exerciseStatusToHuman[data.status].text}
        />
      </TableCell>
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
      <TableCell sx={{ verticalAlign: "left" }}>
        {dayjs(+data.createdAt).format("YYYY. MM. DD.")}
      </TableCell>
    </StyledTableRow>
  );
};

const MemoizedExerciseRow = memo(ExerciseRow);

export { MemoizedExerciseRow as ExerciseRow };
