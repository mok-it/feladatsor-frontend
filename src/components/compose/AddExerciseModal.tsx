import { useInfiniteLoad } from "@/components/InfiniteLoad/useInfiniteLoad";
import {
  ExerciseListElemFragment,
  useSearchExercisesLazyQuery,
} from "@/generated/graphql.tsx";
import { addExerciseModalAtom, composeAtom } from "@/util/atoms";
import { ExerciseStatusEnum } from "@/util/types";
import { useExerciseFilters } from "@/util/useExerciseFilters";
import { useTableOrder } from "@/util/useTableOrder";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Modal, Stack, Typography } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { uniqueId } from "lodash";
import { useSnackbar } from "notistack";
import { FC, useCallback, useEffect, useState } from "react";
import { ExerciseTable } from "../exercise/ExerciseTable";

export const AddExerciseModal: FC = () => {
  const [atom, setAtom] = useAtom(addExerciseModalAtom);
  const open = !!atom;
  const onClose = useCallback(() => {
    setAtom(null);
  }, [setAtom]);

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
              statuses: [ExerciseStatusEnum.APPROVED],
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

  const snackbar = useSnackbar();
  const [selected, setSelected] = useState<ExerciseListElemFragment | null>(
    null,
  );
  const onSelect = (id: string) => {
    setSelected(data.find((item) => item.id === id) ?? null);
    snackbar.enqueueSnackbar("Kiválasztva", { variant: "success" });
  };

  const setItems = useSetAtom(composeAtom);
  const onSave = () => {
    if (!atom || !selected) return;
    setItems((draft) => {
      draft[atom.containerId][atom.order] = {
        id: selected?.id,
        cardId: uniqueId(),
      };
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        position={"absolute"}
        sx={{ inset: 0, p: 4 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Card sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Stack
            direction={"column"}
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
          >
            <Typography px={3} pt={2} variant="h2">
              Kész feladatok
              {!!totalCount && (
                <Typography sx={{ display: "inline", ml: 2 }} variant="body1">
                  {totalCount} db
                </Typography>
              )}
            </Typography>
            <Box sx={{ p: 2 }}>{filterComponents}</Box>
            <Box
              sx={{ p: 2, width: "100%", height: "100%", overflowY: "auto" }}
            >
              <ExerciseTable
                data={data}
                fetchMore={fetchMore}
                hasMore={hasMore}
                loading={loading}
                onRowClick={onSelect}
                {...tableOrder}
              />
            </Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              p={2}
              gap={2}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <Button variant="contained" color="error" onClick={onClose}>
                Mégse
              </Button>
              <Box flexGrow={1} />
              {selected && (
                <>
                  Kiválasztva:
                  <Typography fontWeight={600}>{selected.id}</Typography>
                  <LoadingButton variant="contained" onClick={onSave}>
                    Hozzáad
                  </LoadingButton>
                </>
              )}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Modal>
  );
};
