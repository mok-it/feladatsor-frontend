import {
  ExerciseSheetStatus,
  useUpdateExerciseSheetMutation,
} from "@/generated/graphql";
import { useRoleBasedAccess } from "@/util/auth.ts";
import { ExerciseSheetStatusEnum } from "@/util/types";
import { MenuItem, Select, Stack, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { IoHourglassOutline } from "react-icons/io5";
import { MdCheckCircle, MdOutlineDelete, MdSend } from "react-icons/md";

export const SheetStatusSelector: FC<{
  sheetId: string;
  currentStatus: ExerciseSheetStatus;
}> = ({ sheetId, currentStatus }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateSheet] = useUpdateExerciseSheetMutation();

  const handleStatusChange = async (newStatus: ExerciseSheetStatus) => {
    await updateSheet({
      variables: {
        updateExerciseSheetId: sheetId,
        sheetData: {
          status: newStatus,
        },
      },
    });
    enqueueSnackbar({
      variant: "success",
      message: "Státusz frissítve",
    });
  };

  const { canProofreadExerciseSheets } = useRoleBasedAccess();

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h5">Státusz</Typography>
      <Select
        size="small"
        defaultValue={currentStatus}
        onChange={(e) =>
          handleStatusChange(e.target.value as ExerciseSheetStatus)
        }
      >
        <MenuItem value={ExerciseSheetStatusEnum.DRAFT}>
          <Stack direction="row" alignItems="center" gap={1}>
            <IoHourglassOutline color="orange" />
            Vázlat
          </Stack>
        </MenuItem>
        <MenuItem value={ExerciseSheetStatusEnum.CREATED}>
          <Stack direction="row" alignItems="center" gap={1}>
            <MdSend />
            Beküldve
          </Stack>
        </MenuItem>

        <MenuItem
          value={ExerciseSheetStatusEnum.APPROVED}
          disabled={!canProofreadExerciseSheets}
        >
          <Tooltip
            title={
              !canProofreadExerciseSheets
                ? "Nincs jogosultságod feladatok véglegesítéséhez. Szükséges jogosultság: PROOFREAD_EXERCISE_SHEET"
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
          value={ExerciseSheetStatusEnum.DELETED}
          disabled={!canProofreadExerciseSheets}
        >
          <Tooltip
            title={
              !canProofreadExerciseSheets
                ? "Nincs jogosultságod feladatok véglegesítéséhez. Szükséges jogosultság: PROOFREAD_EXERCISE_SHEET"
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
