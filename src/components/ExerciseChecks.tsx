import {
  ExerciseCheckFragment,
  ExerciseCheckType,
  useCreateExerciseCheckMutation,
} from "@/generated/graphql";
import { translateCheck } from "@/util/translateCheck";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useState } from "react";
import { useToggle } from "react-use";

export const ExerciseChecks: FC<{
  exerciseId: string;
  onCheck: (check: ExerciseCheckFragment) => void;
}> = ({ exerciseId, onCheck }) => {
  const [createExerciseCheck] = useCreateExerciseCheckMutation();
  const [checkModal, setCheckModal] = useToggle(false);
  const [loadingCheck, setLoadingCheck] = useToggle(false);
  const [checkType, setCheckType] = useState<ExerciseCheckType>("GOOD");

  return (
    <>
      <Button onClick={setCheckModal} variant="contained" color="success">
        Ellenőrzöm
      </Button>
      <Modal open={checkModal} onClose={setCheckModal} keepMounted>
        <Stack
          position={"absolute"}
          sx={{ inset: 0 }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={setCheckModal}
        >
          <Card sx={{ width: 300 }}>
            <Stack gap={2} p={2} onClick={(e) => e.stopPropagation()}>
              <Typography variant="h6" component="h2">
                Ellenőrzés
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={checkType}
                exclusive
                onChange={(_, value) =>
                  setCheckType(value as ExerciseCheckType)
                }
                aria-label="check"
                sx={{ width: "100%" }}
              >
                <ToggleButton value="TO_DELETE">
                  {translateCheck("TO_DELETE")}
                </ToggleButton>
                <ToggleButton value="CHANGE_REQUIRED">
                  {translateCheck("CHANGE_REQUIRED")}
                </ToggleButton>
                <ToggleButton value="GOOD">
                  {translateCheck("GOOD")}
                </ToggleButton>
              </ToggleButtonGroup>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={setCheckModal}>Mégse</Button>
                <LoadingButton
                  variant="contained"
                  loading={loadingCheck}
                  onClick={() => {
                    setLoadingCheck(true);
                    createExerciseCheck({
                      variables: {
                        input: {
                          exerciseId,
                          type: checkType,
                        },
                      },
                    })
                      .then((res) => {
                        if (res.data?.createExerciseCheck)
                          onCheck(res.data?.createExerciseCheck);
                      })
                      .finally(() => {
                        setLoadingCheck(false);
                        setCheckModal(false);
                      });
                  }}
                >
                  Mentés
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Modal>
    </>
  );
};
