import { User as TotalUser } from "@/generated/graphql.tsx";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

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
