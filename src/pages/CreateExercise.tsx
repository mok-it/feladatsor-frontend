import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { KaTeX } from "../components/Katex";
import { UploadDialog } from "../components/UploadDialog";
import { MultiSelect } from "../components/MultiSelect";
import { BiPlus } from "react-icons/bi";

export const CreateExercise = () => {
  const [exerciseDescription, setExerciseDescription] = useState("");

  const [exerciseSolution, setExerciseSolution] = useState("");
  const [value, setValue] = React.useState(0);

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
              <UploadDialog
                setFile={(file) => {
                  console.log(file);
                }}
              />
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
                <UploadDialog
                  setFile={(file) => {
                    console.log(file);
                  }}
                />
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
                <UploadDialog
                  setFile={(file) => {
                    console.log(file);
                  }}
                />
              </Grid>
            </Grid>
            <Stack gap={4}>
              <Box mt={2}>
                <Typography>Címkék</Typography>
                <MultiSelect items={tags} onchange={() => {}} />
              </Box>
              <Box>
                <Typography>Korcsoport szerinti nehézség</Typography>
                <Divider sx={{ m: 1, mb: 2 }} />
                <Grid container xs={12} md={6}>
                  <DifficultySelector
                    ageGroup={"Koala"}
                    difficulty={value}
                    setDifficulty={(value) => setValue(value)}
                    onNewRowClick={() => {}}
                    isLastRow={true}
                  />
                </Grid>
              </Box>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

const DifficultySelector = (props: {
  ageGroup: string;
  difficulty: number;
  setDifficulty: (difficulty: number) => void;
  onNewRowClick: () => void;
  isLastRow: boolean;
}) => {
  return (
    <Stack direction="row" gap={2} alignItems="center" sx={{ flexGrow: 1 }}>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label={props.ageGroup}
      />
      <Slider
        name={"Nehézség"}
        sx={{ width: "100%" }}
        value={props.difficulty}
        onChange={(_, value) => props.setDifficulty(value as number)}
        step={1}
        marks
        min={0}
        max={4}
        valueLabelDisplay="auto"
      />
      {props.isLastRow && (
        <IconButton color="primary" onClick={() => props.onNewRowClick()}>
          <BiPlus />
        </IconButton>
      )}
    </Stack>
  );
};

const tags = ["Geometria", "Algebra"];
