import { FC } from "react";
import { Typography, Select, MenuItem, Stack, Tooltip } from "@mui/material";
import { IoHourglassOutline } from "react-icons/io5";
import { MdCheckCircle, MdOutlineDelete, MdSend } from "react-icons/md";
import { ExerciseStatus, useUpdateExerciseMutation } from "@/generated/graphql";
import { ExerciseStatusEnum } from "@/util/types";
import { useSnackbar } from "notistack";
import { useRoleBasedAccess } from "@/util/auth.ts";

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

  const { canFinalizeExercises } = useRoleBasedAccess();

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
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

        <MenuItem
          value={ExerciseStatusEnum.APPROVED}
          disabled={!canFinalizeExercises}
        >
          <Tooltip
            title={
              !canFinalizeExercises
                ? "Nincs jogosultságod feladatok véglegesítéséhez. Szükséges jogosultság: FINALIZE_EXERCISE"
                : ""
            }
            arrow
            placement="top"
          >
            <span>
              <Stack direction="row" alignItems="center" gap={1}>
                <MdCheckCircle color="green" />
                Kész
              </Stack>
            </span>
          </Tooltip>
        </MenuItem>

        <MenuItem
          value={ExerciseStatusEnum.DELETED}
          disabled={!canFinalizeExercises}
        >
          <Tooltip
            title={
              !canFinalizeExercises
                ? "Nincs jogosultságod feladatok véglegesítéséhez. Szükséges jogosultság: FINALIZE_EXERCISE"
                : ""
            }
            arrow
            placement="top"
          >
            <span>
              <Stack direction="row" alignItems="center" gap={1}>
                <MdOutlineDelete color="red" />
                Törölve
              </Stack>
            </span>
          </Tooltip>
        </MenuItem>
      </Select>
    </Stack>
  );
};
