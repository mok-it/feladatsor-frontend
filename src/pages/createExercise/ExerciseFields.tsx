import { CategoryDifficultySelect } from "@/components/CategoryDifficultySelect.tsx";
import { HelpingQuestions } from "@/components/HelpingQuestions/HelpingQuestions.tsx";
import { Required } from "@/components/Required.tsx";
import Section from "@/components/Section.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import { UploadWithPreview } from "@/components/UploadWithPreview.tsx";
import { ExerciseInput } from "@/generated/graphql.tsx";
import { fromBase64, toBase64 } from "@/util/toBase64.ts";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FC, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { KaTeX } from "../../components/Katex.tsx";
import { MultiSelect } from "../../components/MultiSelect.tsx";

const tags = ["Geometria", "Algebra"];

const ExerciseFields: FC = () => {
  const { values, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ExerciseInput>();

  const categoryDifficultySelect = useMemo(() => {
    return (
      <CategoryDifficultySelect
        difficulty={values.difficulty}
        onChange={(value) => setFieldValue("difficulty", value)}
      />
    );
  }, [setFieldValue, values.difficulty]);

  const [debouncedDescription, setDebouncedDescription] = useState("");

  useDebounce(
    () => {
      setDebouncedDescription(values.description);
    },
    500,
    [values.description],
  );

  const katex = useMemo(() => {
    return <KaTeX value={debouncedDescription} />;
  }, [debouncedDescription]);

  const {
    defaultExerciseImage,
    // defaultElaborationImage,
    defaultSolutionImage,
    defaultSolveIdeaImgae,
  } = useMemo(() => {
    return {
      defaultExerciseImage: values.exerciseImage
        ? fromBase64(values.exerciseImage) || undefined
        : undefined,
      defaultElaborationImage: values.elaborationImage
        ? fromBase64(values.elaborationImage) || undefined
        : undefined,
      defaultSolutionImage: values.solutionImage
        ? fromBase64(values.solutionImage) || undefined
        : undefined,
      defaultSolveIdeaImgae: values.solveIdeaImage
        ? fromBase64(values.solveIdeaImage) || undefined
        : undefined,
    };
  }, [
    values.elaborationImage,
    values.exerciseImage,
    values.solutionImage,
    values.solveIdeaImage,
  ]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Section
            text={
              <>
                Feladat leírása
                <Required />
              </>
            }
          >
            <TextField
              id="outlined-required"
              name="description"
              defaultValue={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              minRows={10}
              maxRows={13}
              margin="none"
              multiline
              fullWidth
            />
          </Section>
        </Grid>
        <Grid item xs={6}>
          <KaTeX value={"$\\LaTeX{}$ fordítás"} />
          <Box mt={1}>{katex}</Box>
        </Grid>
        <Grid item xs={12}>
          <Section text={<>Feladat képe</>}>
            <UploadWithPreview
              defaultValue={defaultExerciseImage}
              onChange={async (file) => {
                if (!file) return setFieldValue("exerciseImage", null);
                setFieldValue("exerciseImage", await toBase64(file));
              }}
            />
          </Section>
        </Grid>
        <Grid item xs={6}>
          <Section
            text={
              <>
                Feladat megoldása
                <Required />
              </>
            }
          >
            <TextField
              name="solution"
              defaultValue={values.solution}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="none"
              multiline
              maxRows={1}
              fullWidth
            />
            <SimpleAccordion
              summary="Fájl feltöltés"
              defaultExpanded={defaultSolutionImage !== undefined}
            >
              <UploadWithPreview
                defaultValue={defaultSolutionImage}
                onChange={async (file) => {
                  if (!file) return setFieldValue("solutionImage", null);
                  setFieldValue("solutionImage", await toBase64(file));
                }}
              />
            </SimpleAccordion>
          </Section>
        </Grid>
        <Grid item xs={6}>
          <Section text="Ötlet a megoldáshoz">
            <TextField
              name="solveIdea"
              defaultValue={values.solveIdea}
              onChange={handleChange}
              onBlur={handleBlur}
              maxRows={1}
              margin="none"
              multiline
              fullWidth
            />
            <SimpleAccordion
              summary="Fájl feltöltés"
              defaultExpanded={defaultSolutionImage !== undefined}
            >
              <UploadWithPreview
                defaultValue={defaultSolveIdeaImgae}
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
          <Typography>
            Korcsoport szerinti nehézség <Required />
          </Typography>
          {categoryDifficultySelect}
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
