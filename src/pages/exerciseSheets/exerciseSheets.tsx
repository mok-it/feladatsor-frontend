import { FC, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import {
  ExerciseSheetsDocument,
  useCreateExerciseSheetMutation,
  useExerciseSheetsQuery,
} from "@/generated/graphql.tsx";
import dayjs from "dayjs";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export const ExerciseSheets: FC = () => {
  const { data, loading } = useExerciseSheetsQuery();

  const [newSheetName, setNewSheetName] = useState("");

  const [createExerciseSheet, createExerciseSheetData] =
    useCreateExerciseSheetMutation({
      refetchQueries: [ExerciseSheetsDocument],
    });

  const createSheet = async () => {
    if (newSheetName === "") return;
    await createExerciseSheet({
      variables: {
        sheetData: {
          name: newSheetName,
        },
      },
    });
    setNewSheetName("");
  };

  return (
    <Box mb={16}>
      <Typography variant="h4" style={{ margin: "16px" }}>
        Feladatsorok
      </Typography>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" mb={1}>
          Új feladatsor létrehozása
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
          <TextField
            fullWidth
            size="small"
            label={"Feladatsor neve"}
            value={newSheetName}
            onChange={(e) => {
              setNewSheetName(e.target.value);
            }}
          />
          <LoadingButton
            variant="contained"
            onClick={createSheet}
            loading={createExerciseSheetData.loading}
          >
            Mentés
          </LoadingButton>
        </Stack>

        <Divider sx={{ my: 2 }} />
        {loading ?? "Loading..."}
        <Grid2 container spacing={2}>
          {data?.exerciseSheets.map((sheet) => (
            <Grid2 size={4}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {sheet.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {sheet.createdBy.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", textAlign: "right" }}
                    >
                      Készült:{" "}
                      {dayjs(+sheet.createdAt).format("YYYY. MM. DD. HH.mm")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Card>
    </Box>
  );
};
