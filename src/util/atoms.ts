import { User as TotalUser } from "@/generated/graphql.tsx";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<User | null | undefined>(() => sessionStorage)
export const userAtom = atomWithStorage<User | null | undefined>("user", undefined, storage)
type User = Omit<Omit<TotalUser, "exercises">, "__typename">;

