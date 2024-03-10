import { CategoryDifficultySelect } from "@/components/CategoryDifficultySelect.tsx";
import { HelpingQuestions } from "@/components/HelpingQuestions/HelpingQuestions.tsx";
import Section from "@/components/Section.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import { UploadWithPreview } from "@/components/UploadWithPreview.tsx";
import { ExerciseInput } from "@/generated/graphql.tsx";
import { Leaves } from "@/util/objectLeavesType.ts";
import { toBase64 } from "@/util/toBase64.ts";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FC, useState } from "react";
import { useDebounce } from "react-use";
import { KaTeX } from "../../components/Katex.tsx";
import { MultiSelect } from "../../components/MultiSelect.tsx";

const tags = ["Geometria", "Algebra"];

const ExerciseFields: FC = () => {
  const { values, setFieldValue: setFormikFieldValues } =
    useFormikContext<ExerciseInput>();

  const setFieldValue = <T extends Leaves<ExerciseInput>>(
    field: T,
    values: ExerciseInput[T],
    shouldValidate?: boolean,
  ) => {
    return setFormikFieldValues(field, values, shouldValidate);
  };

  const [debouncedDescription, setDebouncedDescription] = useState("");

  useDebounce(
    () => {
      setDebouncedDescription(values.description);
    },
    500,
    [values.description],
  );

  return (
    <Box>
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
          <Box mt={1}>
            <KaTeX textExpression={debouncedDescription} />
          </Box>
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
  );
};

export default ExerciseFields;
