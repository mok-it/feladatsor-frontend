import { FC, Fragment, memo, useCallback, useMemo } from "react";

import { useComposeKeys } from "@/components/compose/useComposeKeys";
import { composeAtom } from "@/util/atoms";
import { composeStore, ComposeView } from "@/util/composeStore";
import { ageGroupTexts, levels } from "@/util/const";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ChevronLeft } from "@mui/icons-material";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { useSetAtom } from "jotai";
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

  useComposeKeys();

  const setItems = useSetAtom(composeAtom);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const a = active.data.current as { containerId: string; order: number };
      const b = over.data.current as { containerId: string; order: number };
      if (!a || !b) return;
      setItems((draft) => {
        const tmp = draft[a.containerId][a.order];
        draft[a.containerId][a.order] = draft[b.containerId][b.order];
        draft[b.containerId][b.order] = tmp;
      });
    },
    [setItems],
  );

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
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
    </DndContext>
  );
};

const Compose = memo(ComposeComponent);
export default Compose;
