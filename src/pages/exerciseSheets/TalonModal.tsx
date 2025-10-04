import { ContainerContext } from "@/components/compose/Container";
import ExerciseCard from "@/components/compose/ExerciseCard";
import { Item } from "@/components/compose/Item";
import { InfiniteLoad } from "@/components/InfiniteLoad/InfiniteLoad";
import { useInfiniteLoad } from "@/components/InfiniteLoad/useInfiniteLoad";
import {
  ExerciseListElemFragment,
  useSearchExercisesLazyQuery,
  useUpdateExerciseSheetMutation,
} from "@/generated/graphql.tsx";
import { composeAtom } from "@/util/atoms";
import { composeStore } from "@/util/composeStore";
import { useExerciseFilters } from "@/util/useExerciseFilters";
import { useTableOrder } from "@/util/useTableOrder";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { uniqueId } from "lodash";
import { useSnackbar } from "notistack";
import { FC, memo, useCallback, useEffect } from "react";
import { MdArrowRightAlt, MdOutlineDelete } from "react-icons/md";

export const TalonModal: FC<{
  sheetId: string;
  open: boolean;
  onClose: () => void;
}> = ({ sheetId, open, onClose }) => {
  const { exerciseQuery, difficulty, filterComponents } = useExerciseFilters();
  const tableOrder = useTableOrder<ExerciseListElemFragment>();
  const { orderBy, order } = tableOrder;

  const [getData, { loading }] = useSearchExercisesLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const fetch: (
    skip: number,
  ) => Promise<{ data: ExerciseListElemFragment[]; totalCount?: number }> =
    useCallback(
      async (skip: number) => {
        const res = await getData({
          variables: {
            query: {
              skip,
              take: 20,
              difficulty,
              queryStr: exerciseQuery.searchQuery,
              orderBy: orderBy,
              orderDirection: order === "asc" ? "ASC" : "DESC",
              includeTags: exerciseQuery.includeTags,
              excludeTags: exerciseQuery.excludeTags,
            },
          },
        });
        return {
          data: res.data?.searchExercises.exercises || [],
          totalCount: res.data?.searchExercises.totalCount,
        };
      },
      [
        getData,
        difficulty,
        exerciseQuery.includeTags,
        exerciseQuery.excludeTags,
        exerciseQuery.searchQuery,
        orderBy,
        order,
      ],
    );

  const { data, fetchMore, hasMore, reset, totalCount } =
    useInfiniteLoad<ExerciseListElemFragment>({
      fetch,
      limit: 20,
    });

  useEffect(() => {
    reset();
  }, [exerciseQuery, difficulty, orderBy, order, reset]);

  const setItems = useSetAtom(composeAtom);
  const items = useAtomValue(composeAtom);
  const talon = items["talon"];

  const snackbar = useSnackbar();
  const [mutate, { loading: mutationLoading }] =
    useUpdateExerciseSheetMutation();
  const save = useCallback(async () => {
    console.log(talon);
    await mutate({
      variables: {
        updateExerciseSheetId: sheetId,
        sheetData: {
          talonItems: talon.map((t, i) => ({
            exerciseID: t.id!.toString(),
            order: i,
          })),
        },
      },
    });
    snackbar.enqueueSnackbar("Talon mentve", { variant: "success" });
    onClose();
  }, [mutate, onClose, sheetId, snackbar, talon]);

  const selectedContainer = composeStore((state) => state.selectedContainer);
  const selectedOrder = composeStore((state) => state.selectedOrder);
  const clear = composeStore((state) => state.clear);

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        position={"absolute"}
        sx={{ inset: 0, p: 4 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Card sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Grid2
            container
            columns={2}
            onClick={(e) => e.stopPropagation()}
            sx={{ height: "calc(100% - 68px)", overflowY: "hidden" }}
          >
            <Grid2
              size={1}
              sx={{
                height: "100%",
                overflowY: "hidden",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack gap={2} p={4}>
                <Typography variant="h2">Kész feladatok</Typography>
                {filterComponents}
                {totalCount !== undefined && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 3, mb: 1, textAlign: "right" }}
                  >
                    {totalCount} db találat
                  </Typography>
                )}
              </Stack>
              <Stack
                px={4}
                sx={{
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <ContainerContext.Provider value={null}>
                  <InfiniteLoad<ExerciseListElemFragment>
                    data={data}
                    fetchNextPage={fetchMore}
                    hasMore={hasMore}
                    isFetchingNextPage={loading}
                    isInitialLoading={loading && data.length === 0}
                    loadingElement={"Betöltés..."}
                  >
                    {(item) => {
                      const isSelected = talon.some((t) => t.id === item.id);
                      return (
                        !isSelected && (
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            key={item.id}
                            sx={{
                              pb: 2,
                            }}
                            gap={2}
                          >
                            <motion.div layout style={{ flexGrow: 1 }}>
                              <ExerciseCard id={item.id} exercise={item} />
                            </motion.div>
                            <IconButton
                              onClick={() => {
                                if (isSelected) return;
                                setItems((draft) => {
                                  draft["talon"].push({
                                    id: item.id,
                                    cardId: uniqueId(),
                                  });
                                });
                              }}
                            >
                              <MdArrowRightAlt size={24} />
                            </IconButton>
                          </Stack>
                        )
                      );
                    }}
                  </InfiniteLoad>
                </ContainerContext.Provider>
              </Stack>
            </Grid2>
            <Grid2
              size={1}
              px={4}
              pt={4}
              sx={{
                height: "100%",
                overflowY: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"start"}
                mb={2}
              >
                <Typography variant="h2">Talon</Typography>
                <IconButton
                  sx={{
                    height: 32,
                    width: 32,
                    "&:disabled": {
                      opacity: 0.5,
                    },
                  }}
                  onClick={() => {
                    setItems((draft) => {
                      draft["talon"] = draft["talon"].filter(
                        (_, i) => i !== selectedOrder,
                      );
                    });
                    clear();
                  }}
                  disabled={selectedContainer !== "talon"}
                >
                  <MdOutlineDelete color="red" size={32} />
                </IconButton>
              </Stack>
              <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
                <ContainerContext.Provider value={"talon"}>
                  {talon.map((t, i) => (
                    <Box key={t.id} sx={{ pb: 2 }}>
                      <MemoizedItem key={t.id} i={i} id={t.id!.toString()} />
                    </Box>
                  ))}
                </ContainerContext.Provider>
              </Stack>
            </Grid2>
          </Grid2>
          <Stack
            direction={"row"}
            p={2}
            gap={2}
            sx={{ border: "1px solid blue", borderColor: "divider" }}
          >
            <Button variant="contained" color="error" onClick={onClose}>
              Mégse
            </Button>
            <Box flexGrow={1} />
            <LoadingButton
              variant="contained"
              onClick={save}
              loading={mutationLoading}
            >
              Mentés
            </LoadingButton>
          </Stack>
        </Card>
      </Stack>
    </Modal>
  );
};

const TalonItem: FC<{ id: string; i: number }> = ({ id, i }) => {
  return <Item cardId={id} id={id} order={i} />;
};

const MemoizedItem = memo(TalonItem);
