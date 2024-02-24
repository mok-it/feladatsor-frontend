import { User as TotalUser } from "@/generated/graphql.tsx";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<User | null | undefined>(
  () => sessionStorage,
);
export const userAtom = atomWithStorage<User | null | undefined>(
  "user",
  null,
  storage,
);
type User = Omit<Omit<TotalUser, "exercises">, "__typename">;

const tokenStore = createJSONStorage<string | null>(() => sessionStorage);
export const tokenAtom = atomWithStorage<string | null>(
  "jwtToken",
  null,
  tokenStore,
);
