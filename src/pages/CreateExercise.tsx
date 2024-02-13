import { Box, Card, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { KaTeX } from "../components/Katex";

export const CreateExercise = () => {
  const [exerciseDescription, setExerciseDescription] = useState("");
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Feladat létrehozása" />
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-required"
                  label="Feladat szöveg"
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
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
