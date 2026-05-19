import { FC, Fragment, memo, useCallback, useMemo } from "react";

import { CommentSection } from "@/components/CommentSection";
import { useComposeKeys } from "@/components/compose/useComposeKeys";
import { composeAtom, sheetIdAtom, sheetItemIdsAtom } from "@/util/atoms";
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
import { Box, Button, Grid2, Stack, Tooltip, Typography } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { keys, times, values } from "lodash";
import Container from "../../components/compose/Container";

const ComposeComponent: FC<{ onViewChange: (view: ComposeView) => void }> = ({
  onViewChange,
}) => {
  const view = composeStore((state) => state.view);
  const sheetId = useAtomValue(sheetIdAtom);
  const sheetItemIds = useAtomValue(sheetItemIdsAtom);
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
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        minHeight={36}
                        pl={1}
                      >
                        <Typography fontSize={14} fontWeight={"500"}>
                          {levels[i / 5].name}
                        </Typography>
                        {view !== "all" && sheetId && (
                          <Tooltip title="Komment a kategóriához">
                            <Box display="flex">
                              <CommentSection
                                targetId={
                                  sheetItemIds[`${view}-${i / 5}`] ||
                                  `sheet-${sheetId}-${view}-${i / 5}`
                                }
                                mode={
                                  sheetItemIds[`${view}-${i / 5}`]
                                    ? "graphql-sheet"
                                    : "local-context"
                                }
                                sheetId={sheetId}
                                sheetCommentTarget="SheetItem"
                                iconSize="small"
                              />
                            </Box>
                          </Tooltip>
                        )}
                      </Box>
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
