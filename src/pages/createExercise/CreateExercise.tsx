import { KaTeX } from "@/components/Katex.tsx";
import {
  ExerciseInput,
  useCreateExerciseMutation,
} from "@/generated/graphql.tsx";
import { createExerciseInitialValue } from "@/pages/createExercise/createExerciseInitialValue.ts";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import ExerciseFields from "./ExerciseFields.tsx";

export const CreateExercise = () => {
  const [createExercise] = useCreateExerciseMutation();
  const [showConfirmDialog, setShowConfirmDialog] = useToggle(false);
  const [loadingSubmit, toggleLoadingSubmit] = useToggle(false);
  const [formDataToSend, setFormDataToSend] = useState<ExerciseInput | null>(
    null,
  );
  const navigate = useNavigate();

  const send = useCallback(async () => {
    console.log(formDataToSend);
    if (!formDataToSend) return;
    toggleLoadingSubmit(true);
    try {
      const createResult = await createExercise({
        variables: {
          input: formDataToSend,
        },
      });
      if (createResult.errors) {
        console.log(createResult.errors);
        return;
      }
      navigate("/list-exercises");
    } finally {
      toggleLoadingSubmit(false);
    }
  }, [createExercise, formDataToSend, navigate, toggleLoadingSubmit]);

  return (
    <>
      <Dialog open={showConfirmDialog}>
        <DialogTitle>Biztosan beküldöd?</DialogTitle>
        <DialogContent dividers>
          <KaTeX value={formDataToSend?.description || ""} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Mégse</Button>
          <LoadingButton loading={loadingSubmit} onClick={send}>
            Mentés
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Formik<ExerciseInput>
        initialValues={createExerciseInitialValue}
        onSubmit={(values) => {
          setFormDataToSend(values);
          setShowConfirmDialog(true);
        }}
        validateOnChange={false}
      >
        <CreateExerciseForm />
      </Formik>
    </>
  );
};

const CreateExerciseForm = () => {
  const { submitForm } = useFormikContext<ExerciseInput>();

  return (
    <Box pb={16}>
      <Stack
        width="100%"
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        pr={2}
        pt={2}
      >
        <Typography variant="h2" m={2}>
          Feladat létrehozása
        </Typography>
        <Button
          onClick={() => {
            submitForm();
          }}
          variant="contained"
          color="success"
        >
          Beküldés
        </Button>
      </Stack>
      <Card>
        <Box p={2}>
          <ExerciseFields />
        </Box>
      </Card>
    </Box>
  );
};
