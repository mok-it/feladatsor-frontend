import { Box, Card, CardHeader, Grid, TextField } from "@mui/material";
import { useState } from "react";
import Latex from "react-latex";

export const CreateExercise = () => {
  const [exerciseDescription, setExerciseDescription] = useState("");
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Feladat létrehozása" />
          <Box pt={3}>
            <Grid container gap={2}>
              <Grid item xs={5}>
                <TextField
                  id="outlined-required"
                  label="Feladat szöveg"
                  value={exerciseDescription}
                  onChange={(event) =>
                    setExerciseDescription(event.target.value)
                  }
                  minRows={4}
                  maxRows={8}
                  margin="none"
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Latex displayMode children={exerciseDescription} />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
