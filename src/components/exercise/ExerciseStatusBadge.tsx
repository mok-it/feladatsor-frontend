import { FC } from "react";
import { ExerciseStatus } from "@/generated/graphql.tsx";
import { Chip } from "@mui/material";
import { exerciseStatus } from "@/util/const.ts";

export const ExerciseStatusBadge: FC<{ status: ExerciseStatus }> = ({
  status,
}) => (
  <Chip
    size="small"
    variant="outlined"
    color={exerciseStatus[status].color}
    label={exerciseStatus[status].text}
  />
);
