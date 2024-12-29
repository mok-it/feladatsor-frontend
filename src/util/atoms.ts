import { User as TotalUser } from "@/generated/graphql.tsx";
import { ageGroupTexts, difficultyItemCount } from "@/util/const";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { keys, times, uniqueId } from "lodash";
import { mock, mock3 } from "./mocks";
import { ExerciseCardData, ExerciseFieldsType } from "./types";

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
