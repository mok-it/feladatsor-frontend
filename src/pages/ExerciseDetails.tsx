import { ExerciseOperations } from "@/components/exercise/ExerciseOperations";
import { SameGroupExerciseCard } from "@/components/exercise/SameGroupExerciseCard";
import FakeId from "@/components/FakeId";
import Section from "@/components/Section";
import {
  SelectExerciseQuery,
  useCloneExerciseToNewMutation,
  useSelectExerciseQuery,
  useUpdateExerciseMutation,
} from "@/generated/graphql";
import { createExerciseInitialValue } from "@/util/const";
import { ExerciseFieldsType } from "@/util/types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Card,
  Divider,
  Grid2,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { AlertColor } from "@mui/material/Alert/Alert";
import { Box, Stack } from "@mui/system";
import { Formik, useFormikContext } from "formik";
import { useSnackbar } from "notistack";
import { FC, useCallback, useMemo, useState } from "react";
import { MdSave } from "react-icons/md";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
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
              sameLogicGroup: formDataToSend.sameLogicGroup,
              description: formDataToSend.description,
              difficulty: formDataToSend.difficulty.map((d) => ({
                ageGroup: d.ageGroup,
                difficulty: d.difficulty,
              })),
              helpingQuestions: formDataToSend.helpingQuestions,
              isCompetitionFinal: formDataToSend.isCompetitionFinal,
              solution: formDataToSend.solution,
              solutionOptions: formDataToSend.solutionOptions,
              solveIdea: formDataToSend.solveIdea,
              source: formDataToSend.source,
              tags: (formDataToSend.tags.filter((a) => a) as string[]) || [],

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

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [duplicateExercise] = useCloneExerciseToNewMutation({
    onCompleted: (data) => {
      if (data.cloneExerciseToNew) {
        navigate(`/exercise/${data.cloneExerciseToNew.id}`);
        enqueueSnackbar({
          variant: "success",
          message: "Feladat sikeresen duplikálva",
        });
      }
    },
  });

  const { loading, data: fetchedExercise } = useSelectExerciseQuery({
    variables: { exerciseId: id! },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (!data.exercise) return;
      setValues({
        ...data.exercise,
        initial: false,
        status: "CREATED",
        sameLogicGroup: "",
        solutionOptions: data.exercise.solutionOptions,
        exerciseImageUrl: data.exercise.exerciseImage?.url,
        solutionImageUrl: data.exercise.solutionImage?.url,
        solveIdeaImageUrl: data.exercise.solveIdeaImage?.url,
        exerciseImage: data.exercise.exerciseImage?.id,
        solutionImage: data.exercise.solutionImage?.id,
        solveIdeaImage: data.exercise.solveIdeaImage?.id,
        contributors: data.exercise.contributors.map((c) => c.id),
        source: data.exercise.source,
        tags: data.exercise.tags.map((tag) => tag.id),
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

  if (!loading && !exercise) return <div>Exercise not found</div>;
  if (!exercise) return <div>Exercise not found</div>;

  const similarExercises =
    fetchedExercise?.exercise?.sameLogicExerciseGroup?.exercises.filter(
      (ex) => ex.id !== exercise.id,
    );

  return (
    <>
      <Stack
        mb={2}
        px={{ xs: 2, md: 2 }}
        direction={"row"}
        gap={1}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Typography variant="h4">Feladat</Typography>
        <FakeId>{id}</FakeId>
        <Box flexGrow={1} />
        <Button
          onClick={() =>
            duplicateExercise({
              variables: {
                cloneExerciseToNewId: id ?? "",
              },
            })
          }
          variant="contained"
          endIcon={<ContentCopyIcon />}
        >
          Duplikálás
        </Button>
        <Button onClick={submitForm} variant="contained" endIcon={<MdSave />}>
          Mentés
        </Button>
      </Stack>
      <Grid2 container spacing={2} pb={10}>
        <Grid2 size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderRadius: { xs: 0, md: 1 } }}>
            <Stack gap={2} p={2}>
              {exercise.alert && (
                <Alert
                  severity={
                    exercise.alert.severity.toLocaleLowerCase() as AlertColor
                  }
                >
                  {exercise.alert.description}
                </Alert>
              )}
              <Box>
                <ExerciseFields />
              </Box>
              {similarExercises && similarExercises.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="subtitle1">Hasonló feladatok</Typography>
                  {similarExercises.map((exercise) => (
                    <SameGroupExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                    />
                  ))}
                </>
              )}
            </Stack>
          </Card>
        </Grid2>
        {operations}
      </Grid2>
    </>
  );
};

export default ExerciseDetails;
