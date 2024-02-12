import { Box, Card, CardHeader, Grid } from "@mui/material";

export const CreateExercise = () => {
  return (
    <Grid container gap={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardHeader title="Feladat létrehozása" />
          <Box pt={1}></Box>
        </Card>
      </Grid>
    </Grid>
  );
};
