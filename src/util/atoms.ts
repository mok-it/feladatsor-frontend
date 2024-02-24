import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { User as TotalUser } from "@/generated/graphql.tsx";

type User = Omit<Omit<TotalUser, "exercises">, "__typename">;

const storage = createJSONStorage<User | undefined>(() => sessionStorage);
export const userAtom = atomWithStorage<User | undefined>(
  "user",
  undefined,
  storage,
);

const tokenStore = createJSONStorage<string | undefined>(() => sessionStorage);
export const tokenAtom = atomWithStorage<string | undefined>(
  "jwtToken",
  undefined,
  tokenStore,
);
