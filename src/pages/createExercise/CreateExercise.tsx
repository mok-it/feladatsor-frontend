import { KaTeX } from "@/components/Katex.tsx";
import { useCreateExerciseMutation } from "@/generated/graphql.tsx";
import { createExerciseAtom } from "@/util/atoms.ts";
import { createExerciseInitialValue } from "@/util/const.ts";
import { ExerciseFieldsType, ExerciseStatusEnum } from "@/util/types.ts";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { useAtomValue, useSetAtom } from "jotai";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce, useToggle } from "react-use";
import ExerciseFields from "./ExerciseFields.tsx";

export const CreateExercise = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createExercise] = useCreateExerciseMutation();
  const persistedValues = useAtomValue(createExerciseAtom);
  const setPersistedValues = useSetAtom(createExerciseAtom);

  const [showConfirmDialog, setShowConfirmDialog] = useToggle(false);
  const [loadingSubmit, toggleLoadingSubmit] = useToggle(false);
  const [formDataToSend, setFormDataToSend] =
    useState<ExerciseFieldsType | null>(null);
  const navigate = useNavigate();

  const send = useCallback(async () => {
    if (!formDataToSend) return;
    toggleLoadingSubmit(true);
    try {
      const createResult = await createExercise({
        variables: {
          input: {
            description: formDataToSend.description,
            difficulty: formDataToSend.difficulty,
            helpingQuestions: formDataToSend.helpingQuestions,
            isCompetitionFinal: formDataToSend.isCompetitionFinal,
            solution: formDataToSend.solution,
            solutionOptions: formDataToSend.solutionOptions,
            solveIdea: formDataToSend.solveIdea,
            source: formDataToSend.source,
            status: formDataToSend.status || ExerciseStatusEnum.CREATED,
            tags: formDataToSend.tags,

            exerciseImage: formDataToSend.exerciseImage,
            solutionImage: formDataToSend.solutionImage,
            solveIdeaImage: formDataToSend.solveIdeaImage,

            contributors: formDataToSend.contributors,
          },
        },
      });
      if (createResult.errors) {
        console.log(createResult.errors);
        return;
      }
      setPersistedValues(createExerciseInitialValue);
      enqueueSnackbar({
        variant: "success",
        message: "Sikeresen beküldted a feladatot!",
      });
      navigate("/exercise/" + createResult.data?.createExercise.id);
    } finally {
      toggleLoadingSubmit(false);
    }
  }, [
    createExercise,
    enqueueSnackbar,
    formDataToSend,
    navigate,
    setPersistedValues,
    toggleLoadingSubmit,
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
      <Formik<ExerciseFieldsType>
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
  const { submitForm, values, setFieldValue } =
    useFormikContext<ExerciseFieldsType>();
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
        alignItems="center"
        flexWrap={"wrap"}
        p={2}
        gap={2}
      >
        <Typography variant="h2" sx={{ flexGrow: 1 }}>
          Feladat létrehozása
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={0.5}
          flexWrap={"nowrap"}
        >
          <Checkbox
            id="draft"
            checked={values.status === ExerciseStatusEnum.DRAFT}
            onChange={() => {
              setFieldValue(
                "status",
                values.status === ExerciseStatusEnum.DRAFT
                  ? ExerciseStatusEnum.CREATED
                  : ExerciseStatusEnum.DRAFT,
              );
            }}
          />
          <label htmlFor="draft" style={{ cursor: "pointer" }}>
            Piszkozat
          </label>
        </Stack>
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
      <Card sx={{ borderRadius: { xs: 0, md: 1 } }}>
        <Box p={2}>
          <ExerciseFields />
        </Box>
      </Card>
    </Box>
  );
};
