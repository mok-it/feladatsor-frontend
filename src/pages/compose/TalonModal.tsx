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
import { useExerciseFilters } from "@/util/useExerciseFilters";
import { useTableOrder } from "@/util/useTableOrder";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Grid2,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { uniqueId } from "lodash";
import { useSnackbar } from "notistack";
import { FC, memo, useCallback, useEffect } from "react";

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

  const fetch: (skip: number) => Promise<ExerciseListElemFragment[]> =
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
        return res.data?.searchExercises.exercises || [];
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

  const { data, fetchMore, hasMore, reset } =
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
              sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}
            >
              <Stack gap={4} p={4}>
                <Typography variant="h2">Kész feladatok</Typography>
                {filterComponents}
              </Stack>
              <Stack px={4}>
                <ContainerContext.Provider value={"talon"}>
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
                          <Box
                            key={item.id}
                            sx={{
                              pb: 2,
                            }}
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
                            <motion.div layout layoutId={item.id}>
                              <ExerciseCard id={item.id} exercise={item} />
                            </motion.div>
                          </Box>
                        )
                      );
                    }}
                  </InfiniteLoad>
                </ContainerContext.Provider>
              </Stack>
            </Grid2>
            <Grid2 size={1} p={4} sx={{ height: "100%", overflowY: "auto" }}>
              <Stack>
                <Typography variant="h2" mb={4}>
                  Talon
                </Typography>
                <ContainerContext.Provider value={"talon"}>
                  {talon.map((t) => (
                    <Box key={t.id} sx={{ pb: 2 }}>
                      <MemoizedItem key={t.id} id={t.id!.toString()} />
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

const TalonItem: FC<{ id: string }> = ({ id }) => {
  return <Item cardId={id} id={id} order={0} />;
};

const MemoizedItem = memo(TalonItem);
