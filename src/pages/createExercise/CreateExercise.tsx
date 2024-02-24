import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { KaTeX } from "../../components/Katex.tsx";
import { MultiSelect } from "../../components/MultiSelect.tsx";
import { HelpingQuestions } from "@/components/HelpingQuestions/HelpingQuestions.tsx";
import { UploadWithPreview } from "@/components/UploadWithPreview.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import { CategoryDifficultySelect } from "@/components/CategoryDifficultySelect.tsx";
import { Formik, useFormikContext } from "formik";
import {
  ExerciseInput,
  useCreateExerciseMutation,
} from "@/generated/graphql.tsx";
import { Leaves } from "@/util/objectLeavesType.ts";
import { createExerciseInitialValue } from "@/pages/createExercise/createExerciseInitialValue.ts";
import { toBase64 } from "@/util/toBase64.ts";
import { AlertDialog } from "@/components/Dialog.tsx";

const Section = (props: PropsWithChildren<{ text: string }>) => {
  return (
    <>
      <Typography>{props.text}</Typography>
      <Divider sx={{ m: 1, mb: 2 }} />
      {props.children}
    </>
  );
};

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

const tags = ["Geometria", "Algebra"];

const CreateExerciseForm = () => {
  const {
    values,
    setFieldValue: setFormikFieldValues,
    submitForm,
  } = useFormikContext<ExerciseInput>();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const setFieldValue = <T extends Leaves<ExerciseInput>>(
    field: T,
    values: ExerciseInput[T],
    shouldValidate?: boolean,
  ) => {
    return setFormikFieldValues(field, values, shouldValidate);
  };
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Card>
          <Stack
            width="100%"
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            pr={2}
          >
            <CardHeader title="Feladat létrehozása" />
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
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Section text="Feladat leírása">
                  <TextField
                    id="outlined-required"
                    value={values.description}
                    onChange={(event) =>
                      setFieldValue("description", event.target.value)
                    }
                    minRows={10}
                    maxRows={13}
                    margin="none"
                    multiline
                    fullWidth
                  />
                </Section>
              </Grid>
              <Grid item xs={6}>
                <KaTeX textExpression={"$\\LaTeX{}$ fordítás"} />
                <Divider sx={{ m: 1, mb: 2 }} />
                <KaTeX textExpression={values.description} />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography>Ábra feltöltés</Typography>
              <UploadWithPreview
                onChange={async (file) => {
                  if (!file) return setFieldValue("exerciseImage", null);
                  setFieldValue("exerciseImage", await toBase64(file));
                }}
              />
            </Box>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Section text="Feladat megoldása">
                  <TextField
                    id="outlined-required"
                    value={values.solution}
                    onChange={(event) =>
                      setFieldValue("solution", event.target.value)
                    }
                    margin="none"
                    multiline
                    maxRows={1}
                    fullWidth
                  />
                  <SimpleAccordion summary="File feltöltés">
                    <Box mt={2}>
                      <UploadWithPreview
                        onChange={async (file) => {
                          if (!file)
                            return setFieldValue("solutionImage", null);
                          setFieldValue("solutionImage", await toBase64(file));
                        }}
                      />
                    </Box>
                  </SimpleAccordion>
                </Section>
              </Grid>
              <Grid item xs={6}>
                <Section text="Ötlet a megoldáshoz (opcionális)">
                  <TextField
                    id="outlined-required"
                    value={values.solveIdea}
                    onChange={(event) =>
                      setFieldValue("solveIdea", event.target.value)
                    }
                    maxRows={1}
                    margin="none"
                    multiline
                    fullWidth
                  />
                  <SimpleAccordion summary="File feltöltés">
                    <Box mt={2}>
                      <UploadWithPreview
                        onChange={async (file) => {
                          if (!file)
                            return setFieldValue("solveIdeaImage", null);
                          setFieldValue("solveIdeaImage", await toBase64(file));
                        }}
                      />
                    </Box>
                  </SimpleAccordion>
                </Section>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Typography>Címkék, alcímkék</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <MultiSelect
                  items={tags}
                  onChange={(items) => {
                    //TODO: We have to send tagID to the server
                    setFieldValue("tags", items);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Korcsoport szerinti nehézség</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <CategoryDifficultySelect
                  values={values.difficulty}
                  onChange={(value) => {
                    setFieldValue("difficulty", value);
                  }}
                />
              </Grid>
            </Grid>
            <HelpingQuestions
              onChange={(value) => {
                setFieldValue(
                  "helpingQuestions",
                  value.map((v) => v.label),
                );
              }}
            />
          </Box>
        </Card>
      </Grid>
      <AlertDialog
        description={"Sikeresen elküldve"}
        handleClose={() => setShowSuccessDialog(false)}
        secondaryClick={() => setShowSuccessDialog(false)}
        primaryClick={() => setShowSuccessDialog(false)}
        open={showSuccessDialog}
      />
      ;
    </Grid>
  );
};
