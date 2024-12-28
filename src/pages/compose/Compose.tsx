import { FC, Fragment } from "react";

import { useComposeAtom } from "@/util/atoms";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { entries, keys, times } from "lodash";
import Container from "../../components/compose/Container";

const Compose: FC = () => {
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const { items } = useComposeAtom();

  return (
    <LayoutGroup>
      <Stack direction={"row"} gap={4} p={2}>
        <Grid2 container columns={6} size={"grow"} spacing={2}>
          {view === "all" && (
            <>
              <Grid2 size={1} />
              {times(5).map((i) => (
                <Grid2 key={i} size={1}>
                  <Typography variant="body1" textAlign={"center"}>
                    {
                      keys(items)
                        .filter((key) => key !== "talon")
                        // eslint-disable-next-line no-unexpected-multiline
                        [i].split("-")[0]
                    }
                  </Typography>
                </Grid2>
              ))}
            </>
          )}
          {entries(items)
            .filter(([key]) => key !== "talon")
            .map(([key, items], index) => {
              return (
                <Fragment key={key}>
                  {index % 5 === 0 && (
                    <Grid2 size={1} component={"div"}>
                      <Box position={"sticky"} top={12}>
                        <Stack height={"100%"} justifyContent={"start"} pt={4}>
                          <Typography variant="body1" textAlign={"center"}>
                            {index === 0 && "Zöld"}
                            {index === 5 && "Bronz"}
                            {index === 10 && "Ezüst"}
                            {index === 15 && "Arany"}
                          </Typography>
                        </Stack>
                      </Box>
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
            <Stack justifyContent={"start"} pb={2}>
              <Typography variant="body1" textAlign={"center"}>
                Talon
              </Typography>
            </Stack>
            <Container id={"talon"} items={items["talon"]} />
          </Box>
        )}
      </Stack>
    </LayoutGroup>
  );
};

export default Compose;
