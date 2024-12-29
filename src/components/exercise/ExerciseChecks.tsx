import {
  ExerciseCheckFragment,
  ExerciseCheckType,
  useCreateExerciseCheckMutation,
} from "@/generated/graphql";
import { translateCheck } from "@/util/const";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useState } from "react";
import { useToggle } from "react-use";
import Section from "../Section";

export const ExerciseChecks: FC<{
  exerciseId: string;
  onCheck: (check: ExerciseCheckFragment) => void;
}> = ({ exerciseId, onCheck }) => {
  const [createExerciseCheck] = useCreateExerciseCheckMutation();
  const [checkModal, setCheckModal] = useToggle(false);
  const [loadingCheck, setLoadingCheck] = useToggle(false);
  const [checkType, setCheckType] = useState<ExerciseCheckType>("GOOD");
  const [comment, setComment] = useState<string>("");

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
          <Card>
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
                <ToggleButton value="TO_DELETE" color="error">
                  {translateCheck("TO_DELETE")}
                </ToggleButton>
                <ToggleButton value="CHANGE_REQUIRED" color="warning">
                  {translateCheck("CHANGE_REQUIRED")}
                </ToggleButton>
                <ToggleButton value="GOOD" color="success">
                  {translateCheck("GOOD")}
                </ToggleButton>
              </ToggleButtonGroup>
              <Section text="Komment (opcionális)">
                <TextField
                  fullWidth
                  size="small"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Section>
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
                          comment,
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
