import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { KaTeX } from "../components/Katex";
import { MultiSelect } from "../components/MultiSelect";
import HelpingQuestions from "../components/HelpingQuestions/HelpingQuestions.tsx";
import { UploadWithPreview } from "@/components/UploadWithPreview.tsx";
import { AccordionExpandIcon } from "@/components/AccordionExpandIcon.tsx";
import { CategoryDifficultySelect } from "@/components/CategoryDifficultySelect.tsx";

export const CreateExercise = () => {
  const [exerciseDescription, setExerciseDescription] = useState("");

  const [exerciseSolution, setExerciseSolution] = useState("");

  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Feladat létrehozása" />
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Feladat szövege</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <TextField
                  id="outlined-required"
                  value={exerciseDescription}
                  onChange={(event) =>
                    setExerciseDescription(event.target.value)
                  }
                  minRows={10}
                  maxRows={13}
                  margin="none"
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <KaTeX texExpression={"$\\LaTeX{}$ fordítás"} />
                <Divider sx={{ m: 1, mb: 2 }} />
                <KaTeX texExpression={exerciseDescription} />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography>Ábra feltöltés</Typography>
              <UploadWithPreview />
            </Box>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Typography>Feladat megoldása</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <TextField
                  id="outlined-required"
                  value={exerciseSolution}
                  onChange={(event) => setExerciseSolution(event.target.value)}
                  margin="none"
                  multiline
                  maxRows={1}
                  fullWidth
                />
                <AccordionExpandIcon
                  summary={"file feltöltés"}
                  details={
                    <Box mt={2}>
                      <UploadWithPreview />
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Ötlet a megoldáshoz (opcionális)</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <TextField
                  id="outlined-required"
                  value={exerciseDescription}
                  onChange={(event) =>
                    setExerciseDescription(event.target.value)
                  }
                  maxRows={1}
                  margin="none"
                  multiline
                  fullWidth
                />
                <AccordionExpandIcon
                  summary={"file feltöltés"}
                  details={
                    <Box mt={2}>
                      <UploadWithPreview />
                    </Box>
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Typography>Címkék, alcímkék</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <MultiSelect items={tags} onchange={() => {}} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Korcsoport szerinti nehézség</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <CategoryDifficultySelect />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography>Címkék</Typography>
              <MultiSelect items={tags} onchange={() => {}} />
            </Box>
            <HelpingQuestions />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

const tags = ["Geometria", "Algebra"];
