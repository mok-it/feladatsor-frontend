import Check from "@/components/Check";
import FakeId from "@/components/FakeId";
import History from "@/components/History";
import { MultiSelect } from "@/components/MultiSelect.tsx";
import Section from "@/components/Section";
import { ExerciseInput, useSelectExerciseQuery } from "@/generated/graphql";
import ExerciseFields from "@/pages/createExercise/ExerciseFields";
import { useUploadImage } from "@/util/useUploadImage";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Formik, useFormikContext } from "formik";
import { motion } from "framer-motion";
import { FC, useCallback, useState } from "react";
import {
  MdArrowDownward,
  MdCheck,
  MdCheckCircle,
  MdOutlineDelete,
  MdSave,
  MdSend,
} from "react-icons/md";
import { useParams } from "react-router";
import { useToggle } from "react-use";
import { createExerciseInitialValue } from "./createExercise/createExerciseInitialValue";

const ExerciseDetails: FC = () => {
  //const [createExercise] = useCreateExerciseMutation();
  const [showConfirmDialog, setShowConfirmDialog] = useToggle(false);
  const [loadingSubmit, toggleLoadingSubmit] = useToggle(false);
  const [formDataToSend, setFormDataToSend] = useState<ExerciseInput | null>(
    null,
  );
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

      const variables = {
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
      };
      return variables;
      // const createResult = await createExercise({
      //   variables,
      // });
      // if (createResult.errors) {
      //   console.log(createResult.errors);
      //   return;
      // }
    } finally {
      toggleLoadingSubmit(false);
    }
  }, [formDataToSend, toggleLoadingSubmit, uploadImage]);

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
                <TextField fullWidth size="small" />
              </Section>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={setShowConfirmDialog}>Mégse</Button>
                <LoadingButton
                  variant="contained"
                  loading={loadingSubmit}
                  onClick={send}
                >
                  Mentés
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Modal>
      <Formik<ExerciseInput>
        initialValues={createExerciseInitialValue}
        onSubmit={(values) => {
          setFormDataToSend(values);
          setShowConfirmDialog(true);
        }}
      >
        <ExerciseDetailsForm />
      </Formik>
    </div>
  );
};

const ExerciseDetailsForm = () => {
  const { setValues, submitForm } = useFormikContext<ExerciseInput>();
  const { fakeId } = useParams();
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const { loading, data } = useSelectExerciseQuery({
    variables: { exerciseId: fakeId! },
    onCompleted: (data) => {
      if (!data.exercise) return;
      setValues({
        ...data.exercise,
        status: "CREATED",
        solutionOptions: [],
        exerciseImage: data.exercise.exerciseImage?.url,
        solutionImage: data.exercise.solutionImage?.url,
        solveIdeaImage: data.exercise.solveIdeaImage?.url,
        tags: data.exercise.tags.map((tag) => tag.name),
      });
    },
  });

  if (loading && !data) return <div>Loading...</div>;

  return (
    <>
      <Stack mb={2} direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h4">Feladat</Typography>
        <FakeId>{fakeId}</FakeId>
        <Box flexGrow={1} />
        <Button onClick={submitForm} variant="contained" endIcon={<MdSave />}>
          Mentés
        </Button>
        <Button variant="contained" color="success" endIcon={<MdCheck />}>
          Ellenőriztem
        </Button>
      </Stack>
      <Grid container spacing={2} pb={10}>
        <Grid item xs={12} lg={7}>
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
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card>
            <Stack p={2} gap={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="body1">Státusz</Typography>
                <Select size="small" defaultValue={1}>
                  <MenuItem value={1}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <MdSend />
                      Beküldve
                    </Stack>
                  </MenuItem>
                  <MenuItem value={2}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <MdCheckCircle color="green" />
                      Kész
                    </Stack>
                  </MenuItem>
                  <MenuItem value={2}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <MdOutlineDelete color="red" />
                      Törölve
                    </Stack>
                  </MenuItem>
                </Select>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                <Typography variant="body1" mr={1}>
                  Ellenőrzések
                </Typography>
                <Check
                  response={"accepted"}
                  userName="Minta János"
                  timestamp={"2024-02-02"}
                />
                <Check
                  response={"rejected"}
                  userName="Minta János"
                  timestamp={"2024-02-02"}
                />
                <Check
                  response={"problematic"}
                  userName="Minta János"
                  timestamp={"2024-02-02"}
                />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                <Typography variant="body1" mr={1}>
                  Lektorálások
                </Typography>
                <Check />
                <Check />
              </Stack>
              <Section text="Komment">
                <Stack direction={"row"} gap={1}>
                  <Box flexGrow={1}>
                    <TextField fullWidth size="small"></TextField>
                  </Box>
                  <Button variant="contained" endIcon={<MdSend />}>
                    Küld
                  </Button>
                </Stack>
              </Section>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography variant="h5">Történet</Typography>
                <Box flexGrow={1} />
                <motion.div
                  animate={{
                    transform:
                      sort === "asc" ? "rotate(0deg)" : "rotate(-180deg)",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      setSort((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                  >
                    <MdArrowDownward />
                  </IconButton>
                </motion.div>
              </Stack>
              <Stack spacing={2} py={2}>
                <History />
                <History />
                <History />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ExerciseDetails;
