import { AlertDialog } from "@/components/Dialog.tsx";
import {
  ExerciseSheetsDocument,
  useCreateExerciseSheetMutation,
  useDeleteExerciseSheetMutation,
  useExerciseSheetsQuery,
} from "@/generated/graphql.tsx";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { FC, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const ExerciseSheets: FC = () => {
  const { data, loading } = useExerciseSheetsQuery();
  const [createExerciseSheet, createExerciseSheetData] =
    useCreateExerciseSheetMutation({
      refetchQueries: [ExerciseSheetsDocument],
    });
  const [deleteExerciseSheet] = useDeleteExerciseSheetMutation();
  const navigate = useNavigate();

  const [newSheetName, setNewSheetName] = useState("");
  const [sheetToDelete, setSheetToDelete] = useState<string | null>(null);

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
      <AlertDialog
        open={sheetToDelete !== null}
        title="Biztosan törlöd ezt a feladatsort?"
        description={
          data?.exerciseSheets.find((sheet) => sheet.id === sheetToDelete)
            ?.name || ""
        }
        secondaryClick={() => setSheetToDelete(null)}
        primaryClick={async () => {
          await deleteExerciseSheet({
            variables: { deleteExerciseSheetId: sheetToDelete! },
            refetchQueries: [ExerciseSheetsDocument],
          });
          enqueueSnackbar({
            variant: "success",
            message: "Feladatsor törölve",
          });
          setSheetToDelete(null);
        }}
      />
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
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Card>
                <CardActionArea
                  onClick={() => navigate(`/exercise-compose/${sheet.id}`)}
                >
                  <CardContent>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"start"}
                      gap={1}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {sheet.name}
                      </Typography>
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          setSheetToDelete(sheet.id);
                        }}
                      >
                        <MdOutlineDelete color="red" />
                      </IconButton>
                    </Stack>
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
