import { ExerciseView, composeStore } from "@/util/composeStore";
import {
  Box,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";
import Compose from "./Compose";
import { useParams } from "react-router";
import { useExerciseSheetQuery } from "@/generated/graphql.tsx";

const styles = { fontWeight: 500 };

const ComposePage: FC = () => {
  const { id } = useParams();

  const exerciseSheetResult = useExerciseSheetQuery({
    variables: {
      exerciseSheetId: id ?? "",
    },
  });

  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const setValue = composeStore((state) => state.setValue);
  const setView = composeStore((state) => state.setView);

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Feladatsor-összeállítás: {exerciseSheetResult.data?.exerciseSheet?.name}
      </Typography>
      <Stack direction="row" alignItems={"start"}>
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
        <ToggleButtonGroup
          sx={{ mt: 1 }}
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
      </Stack>
      <Compose />
    </>
  );
};

export default ComposePage;
