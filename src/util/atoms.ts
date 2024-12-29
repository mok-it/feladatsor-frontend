import { User as TotalUser } from "@/generated/graphql.tsx";
import { ExerciseFieldsType } from "@/types/ExerciseFieldsType";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { keys, times, uniqueId } from "lodash";
import { mock, mock3 } from "./mocks";
import { ageGroups, ExerciseCardData } from "./types";

type UserAtomType = { isLoggedIn: boolean; user: User | null } | undefined;
const storage = createJSONStorage<UserAtomType>(() => sessionStorage);
export const userAtom = atomWithStorage<UserAtomType>(
  "user",
  undefined,
  storage,
);
type User = Omit<Omit<TotalUser, "exercises">, "__typename">;

const tokenStore = createJSONStorage<string | null>(() => sessionStorage);
export const tokenAtom = atomWithStorage<string | null>(
  "jwtToken",
  null,
  tokenStore,
);

export const exerciseCardsAtom = atomWithImmer<ExerciseCardData[]>([
  mock,
  mock3,
]);
const composeAtomDefault: Record<
  string,
  { id: UniqueIdentifier | null; cardId: string }[]
> = {
  talon: [{ id: "2024361", cardId: uniqueId() }],
};

const difficultyItemCount: Record<number, number> = {
  0: 5,
  1: 5,
  2: 4,
  3: 3,
};
for (let i = 0; i < 4; i++) {
  keys(ageGroups).forEach((ageGroup) => {
    composeAtomDefault[`${ageGroup}-${i}`] = times(difficultyItemCount[i]).map(
      () => ({ id: null, cardId: uniqueId() }),
    );
  });
}

export const composeAtom =
  atomWithImmer<
    Record<string, { id: UniqueIdentifier | null; cardId: string }[]>
  >(composeAtomDefault);

export const useComposeAtom = () => {
  const [items, setItems] = useAtom(composeAtom);
  const reset = () => {
    setItems(composeAtomDefault);
  };
  return { items, setItems, reset };
};

export const createExerciseAtom = atomWithStorage<ExerciseFieldsType | null>(
  "createExercise",
  null,
  createJSONStorage(() => localStorage),
);
