import { CategoryDifficultySelect } from "@/components/CategoryDifficultySelect.tsx";
import { HelpingQuestions } from "@/components/HelpingQuestions/HelpingQuestions.tsx";
import { Required } from "@/components/Required.tsx";
import Section from "@/components/Section.tsx";
import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import { UploadWithPreview } from "@/components/UploadWithPreview.tsx";
import { useFlatExerciseTagsQuery } from "@/generated/graphql.tsx";
import { ExerciseFieldsType } from "@/util/types.ts";
import {
  Box,
  Grid2,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { sortBy } from "lodash";
import { FC, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { KaTeX } from "../../components/Katex.tsx";
import { MultiSelect } from "../../components/MultiSelect.tsx";
import { SolutionOptions } from "@/components/SolutionOptions/SolutionOptions.tsx";
import { ContributorsSelector } from "@/components/ContributorsSelector.tsx";

const ExerciseFields: FC = () => {
  const { values, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ExerciseFieldsType>();

  const { data: tags, loading: tagsLoading } = useFlatExerciseTagsQuery();

  const categoryDifficultySelect = useMemo(() => {
    return (
      <CategoryDifficultySelect
        difficulty={values.difficulty}
        onChange={(value) => setFieldValue("difficulty", value)}
      />
    );
  }, [setFieldValue, values.difficulty]);

  const [debouncedDescription, setDebouncedDescription] = useState("");
  const [debouncedDescriptionSolution, setDebouncedDescriptionSolution] =
    useState("");

  useDebounce(
    () => {
      setDebouncedDescription(values.description);
    },
    500,
    [values.description],
  );

  useDebounce(
    () => {
      setDebouncedDescriptionSolution(values.solution);
    },
    500,
    [values.solution],
  );

  const katex = useMemo(() => {
    return <KaTeX value={debouncedDescription} />;
  }, [debouncedDescription]);

  const katexSolution = useMemo(() => {
    return <KaTeX value={debouncedDescriptionSolution} />;
  }, [debouncedDescriptionSolution]);

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
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
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              minRows={10}
              maxRows={13}
              margin="none"
              multiline
              fullWidth
            />
          </Section>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <KaTeX value={"$\\LaTeX{}$ fordítás"} />
          <Box mt={1} py={2} maxHeight={310} overflow={"auto"}>
            {katex}
          </Box>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
          }}
        >
          <Section text={<>Feladat képe</>}>
            <UploadWithPreview
              defaultUrl={values.exerciseImageUrl}
              onChange={({ id, url }) => {
                setFieldValue("exerciseImage", id);
                setFieldValue("exerciseImageUrl", url);
              }}
              title="Feladat képe"
            />
          </Section>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
          }}
        >
          <SolutionOptions
            value={values.solutionOptions}
            onChange={(value) => {
              setFieldValue("solutionOptions", value);
            }}
          />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
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
              value={values.solution}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="none"
              size="small"
              multiline
              maxRows={1}
              fullWidth
            />
          </Section>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <KaTeX value={"$\\LaTeX{}$ megoldás fordítás"} />
          <Box mt={2} maxHeight={100} overflow={"auto"}>
            {katexSolution}
          </Box>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
          }}
        >
          <SimpleAccordion
            summary="Megoldás kép"
            defaultExpanded={values.solutionImageUrl !== undefined}
          >
            <UploadWithPreview
              defaultUrl={values.solutionImageUrl}
              onChange={({ id, url }) => {
                setFieldValue("solutionImage", id);
                setFieldValue("solutionImageUrl", url);
              }}
              title="Megoldás kép"
            />
          </SimpleAccordion>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Section text="Ötlet a megoldáshoz">
            <TextField
              name="solveIdea"
              size="small"
              value={values.solveIdea || undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              maxRows={1}
              margin="none"
              multiline
              fullWidth
            />
          </Section>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Section text="Ötlet a megoldáshoz kép">
            <SimpleAccordion
              summary="Megoldás ötlet"
              defaultExpanded={values.solveIdeaImageUrl !== undefined}
            >
              <UploadWithPreview
                defaultUrl={values.solveIdeaImageUrl}
                onChange={({ id, url }) => {
                  setFieldValue("solveIdeaImage", id);
                  setFieldValue("solveIdeaImageUrl", url);
                }}
                title="Megoldás ötlet"
                imageMaxWidth="100%"
              />
            </SimpleAccordion>
          </Section>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} mt={2} mb={2}>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography>Címkék, alcímkék</Typography>
              {tagsLoading && (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
              {tags && (
                <MultiSelect<{ id: string; name: string }>
                  items={sortBy(
                    tags.flatExerciseTags.filter(
                      (tag) => !values.tags.some((id) => id === tag.id),
                    ),
                    "name",
                  )}
                  value={values.tags.map((tag) => ({
                    id: tag ?? "",
                    name:
                      tags.flatExerciseTags.find((t) => t.id === tag)?.name ??
                      "",
                  }))}
                  getItemLabel={(item) => item.name}
                  getItemKey={(item) => item.id}
                  onChange={(items) => {
                    setFieldValue(
                      "tags",
                      items.map((item) => item.id),
                    );
                  }}
                />
              )}
            </Stack>
            <Stack spacing={1}>
              <Typography>Forrás</Typography>
              <TextField
                name="source"
                size="small"
                value={values.source || undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                maxRows={1}
                margin="none"
                multiline
                fullWidth
              />
            </Stack>
          </Stack>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Typography>
            Korcsoport szerinti nehézség <Required />
          </Typography>
          {categoryDifficultySelect}
        </Grid2>
      </Grid2>
      <Stack gap={2}>
        <HelpingQuestions
          value={values.helpingQuestions}
          onChange={(value) => {
            setFieldValue("helpingQuestions", value);
          }}
        />
        <SimpleAccordion summary="Közreműködő felhasználók">
          <ContributorsSelector
            onChange={(user) => {
              setFieldValue(
                "contributors",
                user.map((u) => u.id),
              );
            }}
            selectedUsers={values.contributors}
          />
        </SimpleAccordion>
      </Stack>
    </Box>
  );
};

export default ExerciseFields;
