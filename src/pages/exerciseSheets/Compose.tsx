import { FC, Fragment, memo, useMemo } from "react";

import { composeStore, ComposeView } from "@/util/composeStore";
import { ageGroupTexts, levels } from "@/util/const";
import { ChevronLeft } from "@mui/icons-material";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { keys, times, values } from "lodash";
import Container from "../../components/compose/Container";

const ComposeComponent: FC<{ onViewChange: (view: ComposeView) => void }> = ({
  onViewChange,
}) => {
  const view = composeStore((state) => state.view);
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
        <Grid2 container columns={5} size={"grow"} spacing={1}>
          {view === "all" ? (
            <>
              {times(5).map((i) => (
                <Grid2 key={i} size={1}>
                  <Button
                    sx={{
                      width: "100%",
                    }}
                    onClick={() => {
                      onViewChange(keys(ageGroupTexts)[i] as ComposeView);
                    }}
                  >
                    {values(ageGroupTexts)[i]}
                  </Button>
                </Grid2>
              ))}
            </>
          ) : (
            <>
              <Button
                startIcon={<ChevronLeft />}
                onClick={() => {
                  onViewChange("all");
                }}
                sx={{ position: "absolute" }}
              >
                Mind
              </Button>
              <Typography
                fontSize={14}
                fontWeight={"500"}
                height={"36px"}
                lineHeight={"36px"}
                width={"100%"}
                textAlign={"center"}
              >
                {ageGroupTexts[view]}
              </Typography>
            </>
          )}
          {containerKeys.map((key, i) => {
            return (
              <Fragment key={key}>
                {i % 5 === 0 && (
                  <Grid2 size={5}>
                    <Typography
                      fontSize={14}
                      paddingLeft={1}
                      fontWeight={"500"}
                    >
                      {levels[i / 5].name}
                    </Typography>
                  </Grid2>
                )}
                {view === "all" ? (
                  <Grid2 size={1} component={"div"}>
                    <Container id={key} />
                  </Grid2>
                ) : (
                  <>
                    {key.split("-")[0] === view && (
                      <Grid2 size={5} component={"div"}>
                        <Container id={key} />
                      </Grid2>
                    )}
                  </>
                )}
              </Fragment>
            );
          })}
        </Grid2>
      </Stack>
    </LayoutGroup>
  );
};

const Compose = memo(ComposeComponent);
export default Compose;
