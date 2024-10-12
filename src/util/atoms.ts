import { User as TotalUser } from "@/generated/graphql.tsx";
import { UniqueIdentifier } from "@dnd-kit/core";
import { atomWithImmer } from 'jotai-immer';
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { mock, mock2, mock3 } from "./mocks";
import { ExerciseCardData, ExercisePlacements } from "./types";

type UserAtomType = { isLoggedIn: boolean; user: User | null } | undefined;
const storage = createJSONStorage<UserAtomType>(
  () => sessionStorage,
);
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

export const exerciseCardsAtom = atomWithImmer<ExerciseCardData[]>([mock, mock2, mock3])
export const composeAtom = atomWithImmer<{
  [key in string]: UniqueIdentifier[];
}>({
  "KOALA-0": [],
  "MEDVEBOCS-0": [],
  "KISMEDVE-0": [],
  "NAGYMEDVE-0": [],
  "JEGESMEDVE-0": [],

  "KOALA-1": [],
  "MEDVEBOCS-1": [],
  "KISMEDVE-1": [],
  "NAGYMEDVE-1": [],
  "JEGESMEDVE-1": [],

  "KOALA-2": [],
  "MEDVEBOCS-2": [],
  "KISMEDVE-2": [],
  "NAGYMEDVE-2": [],
  "JEGESMEDVE-2": [],

  "KOALA-3": [],
  "MEDVEBOCS-3": [],
  "KISMEDVE-3": [],
  "NAGYMEDVE-3": [],
  "JEGESMEDVE-3": [],
})

export const exercisePlacementsAtom = atomWithImmer<ExercisePlacements>({})


