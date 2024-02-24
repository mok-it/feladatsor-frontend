import { User } from "firebase/auth";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<User | null | undefined>(() => sessionStorage)
export const userAtom = atomWithStorage<User | null | undefined>("user", undefined, storage)