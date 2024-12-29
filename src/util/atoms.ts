import { User as TotalUser } from "@/generated/graphql.tsx";
import { ageGroupTexts, difficultyItemCount } from "@/util/const";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSetAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { keys, times, uniqueId } from "lodash";
import { ExerciseFieldsType } from "./types";

type UserAtomType = { isLoggedIn: boolean; user: User | null } | undefined;
const storage = createJSONStorage<UserAtomType>(() => sessionStorage);
export const userAtom = atomWithStorage<UserAtomType>(
  "user",
  undefined,
  storage,
);
type User = Omit<TotalUser, "exercises" | "__typename" | "comments" | "stats">;

const tokenStore = createJSONStorage<string | null>(() => sessionStorage);
export const tokenAtom = atomWithStorage<string | null>(
  "jwtToken",
  null,
  tokenStore,
);

const composeAtomDefault: Record<
  string,
  { id: UniqueIdentifier | null; cardId: string }[]
> = {
  talon: [],
};

for (let i = 0; i < 4; i++) {
  keys(ageGroupTexts).forEach((ageGroup) => {
    composeAtomDefault[`${ageGroup}-${i}`] = times(difficultyItemCount[i]).map(
      () => ({ id: null, cardId: uniqueId() }),
    );
  });
}

export const composeAtom =
  atomWithImmer<
    Record<string, { id: UniqueIdentifier | null; cardId: string }[]>
  >(composeAtomDefault);

export const useResetComposeAtom = () => {
  const setItems = useSetAtom(composeAtom);
  const reset = () => {
    setItems(composeAtomDefault);
  };
  return { setItems, reset };
};

export const createExerciseAtom = atomWithStorage<ExerciseFieldsType | null>(
  "createExercise",
  null,
  createJSONStorage(() => localStorage),
);
