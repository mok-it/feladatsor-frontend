import { KaTeX } from "@/components/Katex.tsx";
import {
  ExerciseInput,
  useCreateExerciseMutation,
} from "@/generated/graphql.tsx";
import { createExerciseAtom } from "@/util/atoms.ts";
import { useUploadImage } from "@/util/useUploadImage.ts";
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
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce, useToggle } from "react-use";
import ExerciseFields from "./ExerciseFields.tsx";
import { createExerciseInitialValue } from "./createExerciseInitialValue.ts";

export const CreateExercise = () => {
  const [createExercise] = useCreateExerciseMutation();
  const persistedValues = useAtomValue(createExerciseAtom);
  const setPersistedValues = useSetAtom(createExerciseAtom);

  const [showConfirmDialog, setShowConfirmDialog] = useToggle(false);
  const [loadingSubmit, toggleLoadingSubmit] = useToggle(false);
  const [formDataToSend, setFormDataToSend] = useState<ExerciseInput | null>(
    null,
  );
  const navigate = useNavigate();
  const uploadImage = useUploadImage();

  const send = useCallback(async () => {
    console.log(formDataToSend);
    if (!formDataToSend) return;
    toggleLoadingSubmit(true);
    try {
      const images: Partial<ExerciseInput> = {
        exerciseImage:
          formDataToSend.exerciseImage &&
          (await uploadImage(formDataToSend.exerciseImage)),
        solutionImage:
          formDataToSend.solutionImage &&
          (await uploadImage(formDataToSend.solutionImage)),
        solveIdeaImage:
          formDataToSend.solveIdeaImage &&
          (await uploadImage(formDataToSend.solveIdeaImage)),
      };

      const createResult = await createExercise({
        variables: {
          input: {
            alternativeDifficultyParent:
              formDataToSend.alternativeDifficultyParent,
            description: formDataToSend.description,
            difficulty: formDataToSend.difficulty,
            exerciseImage: images.exerciseImage,
            helpingQuestions: formDataToSend.helpingQuestions,
            isCompetitionFinal: formDataToSend.isCompetitionFinal,
            sameLogicParent: formDataToSend.sameLogicParent,
            solution: formDataToSend.solution,
            solutionImage: images.solutionImage,
            solutionOptions: formDataToSend.solutionOptions,
            solveIdea: formDataToSend.solveIdea,
            solveIdeaImage: images.solveIdeaImage,
            source: formDataToSend.source,
            status: formDataToSend.status,
            tags: formDataToSend.tags,
          },
        },
      });
      if (createResult.errors) {
        console.log(createResult.errors);
        return;
      }
      setPersistedValues(createExerciseInitialValue);
      navigate("/list-exercises");
    } finally {
      toggleLoadingSubmit(false);
    }
  }, [
    createExercise,
    formDataToSend,
    navigate,
    setPersistedValues,
    toggleLoadingSubmit,
    uploadImage,
  ]);

  useEffect(() => {
    if (persistedValues === null) {
      const id = setTimeout(() => {
        setPersistedValues(createExerciseInitialValue);
      }, 100);
      return () => clearTimeout(id);
    }
  }, [persistedValues, setPersistedValues]);

  if (persistedValues === null) {
    return "Loading...";
  }

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
        initialValues={persistedValues}
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
  const { submitForm, values } = useFormikContext<ExerciseInput>();
  const setPersistedValues = useSetAtom(createExerciseAtom);

  useDebounce(
    () => {
      setPersistedValues(values);
    },
    500,
    [values],
  );

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
