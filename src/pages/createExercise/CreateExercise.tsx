import { CategoryDifficultySelect } from "@/components/CategoryDifficultySelect.tsx";
import { AlertDialog } from "@/components/Dialog.tsx";
import { HelpingQuestions } from "@/components/HelpingQuestions/HelpingQuestions.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import { UploadWithPreview } from "@/components/UploadWithPreview.tsx";
import {
  ExerciseInput,
  useCreateExerciseMutation,
} from "@/generated/graphql.tsx";
import { createExerciseInitialValue } from "@/pages/createExercise/createExerciseInitialValue.ts";
import { Leaves } from "@/util/objectLeavesType.ts";
import { toBase64 } from "@/util/toBase64.ts";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { PropsWithChildren, useState } from "react";
import { KaTeX } from "../../components/Katex.tsx";
import { MultiSelect } from "../../components/MultiSelect.tsx";

const Section = (props: PropsWithChildren<{ text: string }>) => {
  return (
    <Stack gap={1}>
      <Typography>{props.text}</Typography>
      {props.children}
    </Stack>
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
  const clearForm = () => {
    setShowSuccessDialog(false);
    setValues(createExerciseInitialValue);
  };

  const {
    values,
    setFieldValue: setFormikFieldValues,
    submitForm,
    setValues,
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
          Feladat léterhozása
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
              <KaTeX textExpression={values.description} />
            </Grid>
            <Grid item xs={12}>
              <Section text="Feladat képe">
                <UploadWithPreview
                  onChange={async (file) => {
                    if (!file) return setFieldValue("exerciseImage", null);
                    setFieldValue("exerciseImage", await toBase64(file));
                  }}
                />
              </Section>
            </Grid>
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
                  <UploadWithPreview
                    onChange={async (file) => {
                      if (!file) return setFieldValue("solutionImage", null);
                      setFieldValue("solutionImage", await toBase64(file));
                    }}
                  />
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
                  <UploadWithPreview
                    onChange={async (file) => {
                      if (!file) return setFieldValue("solveIdeaImage", null);
                      setFieldValue("solveIdeaImage", await toBase64(file));
                    }}
                  />
                </SimpleAccordion>
              </Section>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <Typography>Címkék, alcímkék</Typography>
                <MultiSelect
                  items={tags}
                  onChange={(items) => {
                    //TODO: We have to send tagID to the server
                    setFieldValue("tags", items);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Typography>Korcsoport szerinti nehézség</Typography>
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
    </Box>
  );
};
