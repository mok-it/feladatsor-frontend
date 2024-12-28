import {
  ExerciseAgeGroup,
  UpdateExerciseSheetInput,
  useExerciseSheetQuery,
  useUpdateExerciseSheetMutation,
} from "@/generated/graphql.tsx";
import { composeAtom } from "@/util/atoms";
import { ExerciseView, composeStore } from "@/util/composeStore";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  Input,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useAtomValue } from "jotai";
import { entries } from "lodash";
import { useSnackbar } from "notistack";
import { FC, useCallback } from "react";
import { MdDone, MdEdit } from "react-icons/md";
import { useParams } from "react-router";
import { useToggle } from "react-use";
import Compose from "./Compose";

const styles = { fontWeight: 500 };

const ComposePage: FC = () => {
  const { id } = useParams();

  const setName = composeStore((state) => state.setName);
  const exerciseSheetResult = useExerciseSheetQuery({
    variables: {
      exerciseSheetId: id ?? "",
    },
    onCompleted: (data) => {
      setName(data.exerciseSheet?.name ?? "");
    },
  });
  const [mutate, mutationState] = useUpdateExerciseSheetMutation();

  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const name = composeStore((state) => state.name);
  const setValue = composeStore((state) => state.setValue);
  const setView = composeStore((state) => state.setView);
  const [isNameEditing, toggleNameEditing] = useToggle(false);
  const items = useAtomValue(composeAtom);
  const snack = useSnackbar();

  const save = useCallback(async () => {
    const data: UpdateExerciseSheetInput = {
      name,
      sheetItems: [],
    };
    entries(items).forEach(([key, exercises]) => {
      const [ageGroup, level] = key.split("-");
      if (ageGroup === "talon") return;
      data.sheetItems?.push({
        ageGroup: ageGroup as ExerciseAgeGroup,
        level: parseInt(level),
        exercises: exercises.filter((x) => x.id).map((x) => x.id) as string[],
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
  }, [id, items, mutate, name, snack, toggleNameEditing]);

  return (
    <>
      {isNameEditing ? (
        <form onSubmit={toggleNameEditing}>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
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
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Typography variant="h2">{name}</Typography>
          <IconButton onClick={toggleNameEditing}>
            <MdEdit />
          </IconButton>
        </Stack>
      )}
      <Stack direction="row" alignItems={"start"} mt={2}>
        <Tabs
          sx={{ mb: 2 }}
          value={view}
          onChange={(_, newValue) => setView(newValue)}
        >
          <Tab sx={styles} label={"Mind"} value={"all"} />
          <Tab sx={styles} label={"Koala"} value={"KOALA"} />
          <Tab sx={styles} label={"Medvebocs"} value={"MEDVEBOCS"} />
          <Tab sx={styles} label={"Kismedve"} value={"KISMEDVE"} />
          <Tab sx={styles} label={"Nagymedve"} value={"NAGYMEDVE"} />
          <Tab sx={styles} label={"Jegesmedve"} value={"JEGESMEDVE"} />
        </Tabs>
        <Box flexGrow={1} />
        <Stack direction={"row"} p={1} gap={2}>
          <ToggleButtonGroup
            value={exerciseView}
            exclusive
            onChange={(_, value) => setValue({ exerciseView: value })}
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
          </ToggleButtonGroup>
          <LoadingButton
            onClick={save}
            variant="contained"
            loading={mutationState.loading}
          >
            Mentés
          </LoadingButton>
        </Stack>
      </Stack>
      <Compose exerciseSheet={exerciseSheetResult.data?.exerciseSheet} />
    </>
  );
};

export default ComposePage;
