import { ageGroupTexts, difficultyItemCount } from "@/util/const";
import { UniqueIdentifier } from "@dnd-kit/core";
import { atom, useSetAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { keys, times, uniqueId } from "lodash";
import { ExerciseFieldsType } from "./types";

const composeAtomDefault: Record<
  string,
  { id: UniqueIdentifier | null; cardId: string }[]
> = {};

for (let i = 0; i < 4; i++) {
  keys(ageGroupTexts).forEach((ageGroup) => {
    composeAtomDefault[`${ageGroup}-${i}`] = times(difficultyItemCount[i]).map(
      () => ({ id: null, cardId: uniqueId() }),
    );
  });
}

export const composeAtom =
  atomWithImmer<
    Record<
      string,
      { id: UniqueIdentifier | null; cardId: string }[]
    >
  >(composeAtomDefault);

export const sheetItemIdsAtom = atom<Record<string, string>>({});
export const sheetIdAtom = atom<string | null>(null);

export const useResetComposeAtom = () => {
  const setItems = useSetAtom(composeAtom);
  const setSheetItemIds = useSetAtom(sheetItemIdsAtom);
  const setSheetId = useSetAtom(sheetIdAtom);
  const reset = () => {
    setItems(composeAtomDefault);
    setSheetItemIds({});
    setSheetId(null);
  };
  return { setItems, reset, setSheetItemIds, setSheetId };
};

export const addExerciseModalAtom = atom<{
  containerId: string;
  order: number;
} | null>(null);

export const createExerciseAtom = atomWithStorage<ExerciseFieldsType | null>(
  "createExercise",
  null,
  createJSONStorage(() => localStorage),
);
