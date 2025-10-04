import { Page404 } from "@/components/404";
import {
  ExerciseAgeGroup,
  UpdateExerciseSheetInput,
  useExerciseSheetQuery,
  useUpdateExerciseSheetMutation,
} from "@/generated/graphql.tsx";
import { composeAtom, useResetComposeAtom } from "@/util/atoms";
import { composeStore } from "@/util/composeStore";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid2, IconButton, Input, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useStore } from "jotai";
import { entries, sortBy, uniqueId } from "lodash";
import { useSnackbar } from "notistack";
import { FC, useCallback } from "react";
import { MdDone, MdEdit } from "react-icons/md";
import { useParams } from "react-router";
import { useToggle } from "react-use";
import Compose from "./Compose";
import { SheetOperations } from "./SheetOperations";

export const ExerciseSheetPage: FC = () => {
  const { id } = useParams();

  const store = useStore();
  const { reset, setItems } = useResetComposeAtom();
  const { data, loading } = useExerciseSheetQuery({
    variables: {
      exerciseSheetId: id ?? "",
    },
    onCompleted: (data) => {
      if (!data.exerciseSheet) return;
      setName(data.exerciseSheet?.name ?? "");
      reset();
      setItems((draft) => {
        data.exerciseSheet?.sheetItems?.forEach((item) => {
          item.exercises.forEach((exercise) => {
            const key = `${item.ageGroup}-${item.level}`;
            if (!draft[key]) {
              return;
            }
            draft[key][exercise.order] = {
              id: exercise.exercise.id,
              cardId: uniqueId(),
            };
          });
        });
        return draft;
      });
      setItems((draft) => {
        draft["talon"] = [];
        sortBy(data.exerciseSheet?.talonItems, "order")?.forEach((exercise) => {
          draft["talon"].push({
            id: exercise.exercise.id,
            cardId: uniqueId(),
          });
        });
      });
    },
  });
  const [mutate, mutationState] = useUpdateExerciseSheetMutation();

  const name = composeStore((state) => state.name);
  const setName = composeStore((state) => state.setName);
  const setView = composeStore((state) => state.setView);
  const [isNameEditing, toggleNameEditing] = useToggle(false);
  const snack = useSnackbar();

  const save = useCallback(async () => {
    const data: UpdateExerciseSheetInput = {
      name,
      sheetItems: [],
    };
    const items = store.get(composeAtom);
    entries(items).forEach(([key, exercises]) => {
      const [ageGroup, level] = key.split("-");
      if (ageGroup === "talon") return;
      data.sheetItems?.push({
        ageGroup: ageGroup as ExerciseAgeGroup,
        level: parseInt(level),
        exercises: exercises
          .map((item, i) => ({
            exerciseID: item.id ? item.id.toString() : "",
            order: i,
          }))
          .filter((x) => x.exerciseID && x.exerciseID.length > 0),
      });
    });
    await mutate({
      variables: {
        updateExerciseSheetId: id!,
        sheetData: data,
      },
    });
    snack.enqueueSnackbar("Mentve", { variant: "success" });
    toggleNameEditing(false);
  }, [id, mutate, name, snack, store, toggleNameEditing]);

  if (data && !data.exerciseSheet) {
    return <Page404 />;
  }

  return (
    <>
      <Stack direction="row" alignItems={"center"} mb={1}>
        {isNameEditing ? (
          <form onSubmit={toggleNameEditing}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={2}
              px={2}
              py={1}
            >
              <Input
                sx={{ flexGrow: 1 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <IconButton onClick={toggleNameEditing}>
                <MdDone />
              </IconButton>
            </Stack>
          </form>
        ) : (
          <Stack direction={"row"} alignItems={"center"} gap={2} px={2} py={1}>
            <Typography variant="h2">{name}</Typography>
            <IconButton onClick={toggleNameEditing}>
              <MdEdit />
            </IconButton>
          </Stack>
        )}
        <Box flexGrow={1} />
        <Stack direction={"row"} gap={2}>
          {/* <ToggleButtonGroup
            value={exerciseView}
            exclusive
            onChange={(_, value) => {
              setValue({ exerciseView: value });
              clear();
            }}
            sx={{ background: "background" }}
          >
            <ToggleButton
              size="small"
              sx={{ px: 2 }}
              value={ExerciseView.CARD}
              selected={exerciseView === ExerciseView.CARD}
            >
              Kártya
            </ToggleButton>
            <ToggleButton
              size="small"
              sx={{ px: 2 }}
              value={ExerciseView.LIST}
              selected={exerciseView === ExerciseView.LIST}
            >
              Lista
            </ToggleButton>
          </ToggleButtonGroup> */}
          <LoadingButton
            onClick={save}
            variant="contained"
            loading={mutationState.loading}
          >
            Mentés
          </LoadingButton>
        </Stack>
      </Stack>
      {!loading && data?.exerciseSheet && (
        <Grid2 container spacing={2} pb={10}>
          <Grid2 size={{ xs: 12, md: 12, lg: 7 }}>
            <Card sx={{ borderRadius: { xs: 0, md: 1 } }}>
              <Compose
                onViewChange={(view) => {
                  setView(view);
                }}
              />
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12, lg: 5 }}>
            <SheetOperations sheet={data?.exerciseSheet} />
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
