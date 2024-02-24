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
import { UploadDialog } from "../components/UploadDialog";
import { MultiSelect } from "../components/MultiSelect";
import HelpingQuestions from "../components/HelpingQuestions/HelpingQuestions.tsx";

export const CreateExercise = () => {
  const [exerciseDescription, setExerciseDescription] = useState("");

  const [exerciseSolution, setExerciseSolution] = useState("")

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
                  minRows={4}
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
              <Typography>Feladat fájl feltöltése</Typography>
              <UploadDialog setFile={(file) => {
                console.log(file)}} />
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
                  maxRows={3}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Feladat megoldás feltöltése</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <UploadDialog setFile={(file) => {
                  console.log(file)}} />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Typography>Feladat megoldásának kifejtése</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <TextField
                  id="outlined-required"
                  value={exerciseDescription}
                  onChange={(event) =>
                    setExerciseDescription(event.target.value)
                  }
                  minRows={4}
                  maxRows={13}
                  margin="none"
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Feladat megoldás kifejtésének feltöltése
                </Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <UploadDialog setFile={(file) => {
                  console.log(file)}} />
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
