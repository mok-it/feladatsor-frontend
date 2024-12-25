import { ExerciseOperations } from "@/components/ExerciseOperations";
import FakeId from "@/components/FakeId";
import { MultiSelect } from "@/components/MultiSelect";
import Section from "@/components/Section";
import {
  SelectExerciseQuery,
  useSelectExerciseQuery,
  useUpdateExerciseMutation,
} from "@/generated/graphql";
import { ExerciseFieldsType } from "@/types/ExerciseFieldsType";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Checkbox,
  Grid2,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Formik, useFormikContext } from "formik";
import { useSnackbar } from "notistack";
import { FC, useCallback, useMemo, useState } from "react";
import { MdSave } from "react-icons/md";
import { useParams } from "react-router";
import { useToggle } from "react-use";
import { createExerciseInitialValue } from "./createExercise/createExerciseInitialValue";
import ExerciseFields from "./createExercise/ExerciseFields";

const ExerciseDetails: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateExercise] = useUpdateExerciseMutation();
  const { id } = useParams();
  const [showConfirmDialog, setShowConfirmDialog] = useToggle(false);
  const [loadingSubmit, toggleLoadingSubmit] = useToggle(false);
  const [formDataToSend, setFormDataToSend] =
    useState<ExerciseFieldsType | null>(null);
  const [comment, setComment] = useState<string>("");
  const [updateSignal, update] = useToggle(false);

  const send = useCallback(
    async (formDataToSend: ExerciseFieldsType | null) => {
      if (!formDataToSend) return;
      toggleLoadingSubmit(true);
      try {
        const createResult = await updateExercise({
          variables: {
            id: id!,
            input: {
              comment: comment.length > 0 ? comment : undefined,
              alternativeDifficultyGroup:
                formDataToSend.alternativeDifficultyGroup,
              description: formDataToSend.description,
              difficulty: formDataToSend.difficulty.map((d) => ({
                ageGroup: d.ageGroup,
                difficulty: d.difficulty,
              })),
              helpingQuestions: formDataToSend.helpingQuestions,
              isCompetitionFinal: formDataToSend.isCompetitionFinal,
              solution: formDataToSend.solution,
              // solutionOptions: formDataToSend.solutionOptions,
              solveIdea: formDataToSend.solveIdea,
              source: formDataToSend.source,
              status: formDataToSend.status,
              // tags: (formDataToSend.tags.filter((a) => a) as string[]) || [],

              exerciseImage: formDataToSend.exerciseImage,
              solutionImage: formDataToSend.solutionImage,
              solveIdeaImage: formDataToSend.solveIdeaImage,
            },
          },
        });
        if (createResult.errors) {
          console.log(createResult.errors);
          return;
        }
        enqueueSnackbar({ variant: "success", message: "Sikeresen mentve" });
        setShowConfirmDialog(false);
        setComment("");
        update();
      } finally {
        toggleLoadingSubmit(false);
      }
    },
    [
      toggleLoadingSubmit,
      updateExercise,
      id,
      comment,
      enqueueSnackbar,
      setShowConfirmDialog,
      update,
    ],
  );

  return (
    <div>
      <Modal
        open={showConfirmDialog}
        onClose={setShowConfirmDialog}
        keepMounted
      >
        <Stack
          position={"absolute"}
          sx={{ inset: 0 }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={setShowConfirmDialog}
        >
          <Card sx={{ width: 500 }}>
            <Stack gap={2} p={2} onClick={(e) => e.stopPropagation()}>
              <Typography variant="h6" component="h2">
                Változtatások mentése
              </Typography>
              <Section text="Komment (opcionális)">
                <TextField
                  fullWidth
                  size="small"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Section>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={setShowConfirmDialog}>Mégse</Button>
                <LoadingButton
                  variant="contained"
                  loading={loadingSubmit}
                  onClick={() => send(formDataToSend)}
                >
                  Mentés
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Modal>
      <Formik<ExerciseFieldsType & { initial: boolean }>
        initialValues={{ ...createExerciseInitialValue, initial: true }}
        onSubmit={(values) => {
          setFormDataToSend(values);
          setShowConfirmDialog(true);
        }}
      >
        <ExerciseDetailsForm updateSignal={updateSignal} />
      </Formik>
    </div>
  );
};

const ExerciseDetailsForm: FC<{ updateSignal: boolean }> = ({
  updateSignal,
}) => {
  const { values, setValues, submitForm } = useFormikContext<
    ExerciseFieldsType & { initial: boolean }
  >();
  const { id } = useParams();
  const [exercise, setExercise] = useState<
    SelectExerciseQuery["exercise"] | null
  >(null);

  const { loading } = useSelectExerciseQuery({
    variables: { exerciseId: id! },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (!data.exercise) return;
      setValues({
        ...data.exercise,
        initial: false,
        status: "CREATED",
        solutionOptions: [],
        exerciseImageUrl: data.exercise.exerciseImage?.url,
        solutionImageUrl: data.exercise.solutionImage?.url,
        solveIdeaImageUrl: data.exercise.solveIdeaImage?.url,
        exerciseImage: data.exercise.exerciseImage?.id,
        solutionImage: data.exercise.solutionImage?.id,
        solveIdeaImage: data.exercise.solveIdeaImage?.id,
        tags: data.exercise.tags.map((tag) => tag.name),
      });
      setExercise(data.exercise);
    },
  });

  const operations = useMemo(() => {
    return (
      <Grid2 size={{ xs: 12, lg: 5 }}>
        <ExerciseOperations updateSignal={updateSignal} exercise={exercise} />
      </Grid2>
    );
  }, [exercise, updateSignal]);

  if (loading || values.initial) return <div>Loading...</div>;

  return (
    <>
      <Stack mb={2} direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h4">Feladat</Typography>
        <FakeId>{id}</FakeId>
        <Box flexGrow={1} />
        <Button onClick={submitForm} variant="contained" endIcon={<MdSave />}>
          Mentés
        </Button>
      </Stack>
      <Grid2 container spacing={2} pb={10}>
        <Grid2 size={{ xs: 12, lg: 7 }}>
          <Card>
            <Box p={2}>
              <ExerciseFields />
            </Box>
            <Box p={2}>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography>Döntő</Typography>
                <Checkbox />
              </Stack>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography>Talonba rakom</Typography>
                <MultiSelect
                  sx={{ width: "80%" }}
                  items={["Gellért hegy", "Városliget"]}
                />
              </Stack>
            </Box>
          </Card>
        </Grid2>
        {operations}
      </Grid2>
    </>
  );
};

export default ExerciseDetails;
