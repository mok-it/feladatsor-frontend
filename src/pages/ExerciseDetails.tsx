import { ExerciseOperations } from "@/components/ExerciseOperations";
import FakeId from "@/components/FakeId";
import { SameGroupExerciseCard } from "@/components/SameGroupExerciseCard.tsx";
import Section from "@/components/Section";
import {
  SelectExerciseQuery,
  useSelectExerciseQuery,
  useUpdateExerciseMutation,
} from "@/generated/graphql";
import { ExerciseFieldsType } from "@/types/ExerciseFieldsType";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid2,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import dayjs from "dayjs";
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
              sameLogicGroup: formDataToSend.sameLogicGroup,
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
              tags: (formDataToSend.tags.filter((a) => a) as string[]) || [],

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
        solutionOptions: [],
        exerciseImageUrl: data.exercise.exerciseImage?.url,
        solutionImageUrl: data.exercise.solutionImage?.url,
        solveIdeaImageUrl: data.exercise.solveIdeaImage?.url,
        exerciseImage: data.exercise.exerciseImage?.id,
        solutionImage: data.exercise.solutionImage?.id,
        solveIdeaImage: data.exercise.solveIdeaImage?.id,
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
            <Stack gap={2} p={2}>
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
              <Divider />
              <Box>
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: "text.primary" }}
                    >
                      Beküldő:{" "}
                    </Typography>
                    <Avatar
                      src={exercise.createdBy.avatarUrl ?? undefined}
                      sx={{ height: 24, width: 24 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {exercise.createdBy.name}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", textAlign: "right" }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: "text.primary" }}
                    >
                      Készült:{" "}
                    </Typography>
                    {dayjs(+exercise?.createdAt).format("YYYY. MM. DD. HH.mm")}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Grid2>
        {operations}
      </Grid2>
    </>
  );
};

export default ExerciseDetails;
