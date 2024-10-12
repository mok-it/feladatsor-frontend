import {
  ExerciseAgeGroup,
  ExerciseListElemFragment,
} from "@/generated/graphql";
import { Box, Chip, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryDifficulties } from "../CategoryDifficulties";

export const ExerciseRow: FC<{ data: ExerciseListElemFragment }> = ({
  data,
}) => {
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
      sx={{ cursor: "pointer" }}
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
          <Chip key={index} label={tag.name} />
        ))}
      </TableCell>
      <TableCell sx={{ minWidth: 300 }}>
        <Box
          sx={{
            overflow: "hidden",
            maxHeight: 100,
          }}
        >
          {data.description}
        </Box>
      </TableCell>
    </TableRow>
  );
};
