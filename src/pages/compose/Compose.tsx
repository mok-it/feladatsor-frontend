import type { UniqueIdentifier } from "@dnd-kit/core";
import { FC, Fragment, useEffect } from "react";

import Talon from "@/components/compose/Talon";
import { ExerciseSheetQuery } from "@/generated/graphql";
import { composeAtom } from "@/util/atoms";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { entries, keys, times } from "lodash";
import { useImmer } from "use-immer";
import Container from "../../components/compose/Container";

const Compose: FC<{
  exerciseSheet?: ExerciseSheetQuery["exerciseSheet"] | null;
}> = ({ exerciseSheet }) => {
  const [talon] = useImmer<UniqueIdentifier[]>(["1", "2", "3"]);
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const [items, setItems] = useAtom(composeAtom);

  useEffect(() => {
    setItems((draft) => {
      exerciseSheet?.sheetItems?.forEach(
        (item) => {
          draft[`${item.ageGroup}-${item.level}`] = item.exercises.map(
            (exercise) => exercise.id,
          );
        },
        [exerciseSheet],
      );
      return draft;
    });
  }, [exerciseSheet, exerciseSheet?.sheetItems, setItems]);

  return (
    <Stack direction={"row"} gap={4} p={2}>
      <Grid2 container columns={6} size={"grow"} spacing={2}>
        {view === "all" && (
          <>
            <Grid2 size={1} />
            {times(5).map((i) => (
              <Grid2 key={i} size={1}>
                <Typography variant="body1" textAlign={"center"}>
                  {keys(items)[i].split("-")[0]}
                </Typography>
              </Grid2>
            ))}
          </>
        )}
        {entries(items).map(([key, items], index) => {
          return (
            <Fragment key={key}>
              {index % 5 === 0 && (
                <Grid2 size={1} component={"div"}>
                  <Stack height={"100%"} justifyContent={"center"} pb={4}>
                    <Typography variant="body1" textAlign={"center"}>
                      {index === 0 && "Zöld"}
                      {index === 5 && "Bronz"}
                      {index === 10 && "Ezüst"}
                      {index === 15 && "Arany"}
                    </Typography>
                  </Stack>
                </Grid2>
              )}
              {(view === "all" || key.split("-")[0] === view) && (
                <Grid2
                  size={view === "all" ? 1 : 5}
                  borderBottom={"1px solid"}
                  borderColor={"divider"}
                  component={"div"}
                >
                  <Container id={key} items={items} />
                </Grid2>
              )}
            </Fragment>
          );
        })}
      </Grid2>
      {exerciseView !== ExerciseView.LIST && (
        <Box maxWidth={"40%"}>
          <Talon items={talon} />
        </Box>
      )}
    </Stack>
  );
};

export default Compose;
