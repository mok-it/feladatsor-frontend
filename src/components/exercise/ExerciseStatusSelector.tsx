import { FC } from "react";
import {
  Typography,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { IoHourglassOutline } from "react-icons/io5";
import {
  MdCheckCircle,
  MdOutlineDelete,
  MdSend,
} from "react-icons/md";
import { ExerciseStatus, useUpdateExerciseMutation } from "@/generated/graphql";
import { ExerciseStatusEnum } from "@/util/types";
import { useSnackbar } from "notistack";

interface ExerciseStatusSelectorProps {
  exerciseId: string;
  currentStatus: ExerciseStatus;
}

export const ExerciseStatusSelector: FC<ExerciseStatusSelectorProps> = ({
  exerciseId,
  currentStatus,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateExercise] = useUpdateExerciseMutation();

  const handleStatusChange = async (newStatus: ExerciseStatus) => {
    await updateExercise({
      variables: {
        id: exerciseId,
        input: {
          status: newStatus,
        },
      },
    });
    enqueueSnackbar({
      variant: "success",
      message: "Státusz frissítve",
    });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h5">Státusz</Typography>
      <Select
        size="small"
        defaultValue={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value as ExerciseStatus)}
      >
        <MenuItem value={ExerciseStatusEnum.DRAFT}>
          <Stack direction="row" alignItems="center" gap={1}>
            <IoHourglassOutline color="orange" />
            Vázlat
          </Stack>
        </MenuItem>
        <MenuItem value={ExerciseStatusEnum.CREATED}>
          <Stack direction="row" alignItems="center" gap={1}>
            <MdSend />
            Beküldve
          </Stack>
        </MenuItem>
        <MenuItem value={ExerciseStatusEnum.APPROVED}>
          <Stack direction="row" alignItems="center" gap={1}>
            <MdCheckCircle color="green" />
            Kész
          </Stack>
        </MenuItem>
        <MenuItem value={ExerciseStatusEnum.DELETED}>
          <Stack direction="row" alignItems="center" gap={1}>
            <MdOutlineDelete color="red" />
            Törölve
          </Stack>
        </MenuItem>
      </Select>
    </Stack>
  );
};