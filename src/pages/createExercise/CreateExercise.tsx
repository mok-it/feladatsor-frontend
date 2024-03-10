import { AlertDialog } from "@/components/Dialog.tsx";
import {
  ExerciseInput,
  useCreateExerciseMutation,
} from "@/generated/graphql.tsx";
import { createExerciseInitialValue } from "@/pages/createExercise/createExerciseInitialValue.ts";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { useCallback, useState } from "react";
import ExerciseFields from "./ExerciseFields.tsx";

export const CreateExercise = () => {
  const [createExercise] = useCreateExerciseMutation();

  const submit = async (values: ExerciseInput) => {
    const createResult = await createExercise({
      variables: {
        input: values,
      },
    });
    console.log(createResult);
  };

  return (
    <Formik<ExerciseInput>
      initialValues={createExerciseInitialValue}
      onSubmit={submit}
    >
      <CreateExerciseForm />
    </Formik>
  );
};

const CreateExerciseForm = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { submitForm, setValues } = useFormikContext<ExerciseInput>();

  const clearForm = useCallback(() => {
    setShowSuccessDialog(false);
    setValues(createExerciseInitialValue);
  }, [setValues]);

  return (
    <Box pb={16}>
      <AlertDialog
        description={"Sikeresen elküldve"}
        handleClose={() => clearForm()}
        secondaryClick={() => clearForm()}
        primaryClick={() => clearForm()}
        open={showSuccessDialog}
      />
      <Stack
        width="100%"
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        pr={2}
        pt={2}
      >
        <Typography variant="h4" m={2}>
          Feladat létrehozása
        </Typography>
        <Button
          onClick={() => {
            submitForm();
            setShowSuccessDialog(true);
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
