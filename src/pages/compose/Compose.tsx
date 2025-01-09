import { FC, Fragment, memo, useMemo } from "react";

import { composeStore, ExerciseView } from "@/util/composeStore";
import { ageGroupTexts } from "@/util/const";
import { Box, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { keys, times } from "lodash";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useToggle } from "react-use";
import Container from "../../components/compose/Container";
import { TalonModal } from "./TalonModal";

const ComposeComponent: FC = () => {
  const { id } = useParams();
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const [openTalon, toggleOpenTalon] = useToggle(false);

  const containerKeys = useMemo(() => {
    const res: string[] = [];
    for (let i = 0; i < 4; i++) {
      keys(ageGroupTexts).forEach((key) => {
        res.push(`${key}-${i}`);
      });
    }
    return res;
  }, []);

  return (
    <LayoutGroup>
      <Stack direction={"row"} p={2} gap={4} alignItems={"start"}>
        <Grid2 container columns={6} size={"grow"} spacing={2}>
          {view === "all" && (
            <>
              <Grid2 size={1} />
              {times(5).map((i) => (
                <Grid2 key={i} size={1}>
                  <Typography variant="body1" textAlign={"center"}>
                    {keys(ageGroupTexts)[i]}
                  </Typography>
                </Grid2>
              ))}
            </>
          )}
          {containerKeys.map((key, index) => {
            return (
              <Fragment key={key}>
                {index % 5 === 0 && (
                  <Grid2 size={1} component={"div"}>
                    <Box position={"sticky"} top={12}>
                      <Stack justifyContent={"start"} pt={4}>
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
                    <Container id={key} />
                  </Grid2>
                )}
              </Fragment>
            );
          })}
        </Grid2>
        {exerciseView !== ExerciseView.LIST && (
          <Box maxWidth={view === "all" ? "20%" : "40%"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              pb={1.5}
              mt={-0.5}
              gap={1}
            >
              <IconButton sx={{ visibility: "hidden" }}>
                <MdEdit size={16} />
              </IconButton>
              <Typography variant="body1" textAlign={"center"}>
                Talon
              </Typography>
              <IconButton onClick={toggleOpenTalon}>
                <MdEdit size={16} />
              </IconButton>
              <TalonModal
                sheetId={id!}
                open={openTalon}
                onClose={() => toggleOpenTalon(false)}
              />
            </Stack>
            <Box minWidth={140}>
              <Container id={"talon"} />
            </Box>
          </Box>
        )}
      </Stack>
    </LayoutGroup>
  );
};

const Compose = memo(ComposeComponent);
export default Compose;
