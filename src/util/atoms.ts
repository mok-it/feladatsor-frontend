import { User } from "firebase/auth";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<User | undefined>(() => sessionStorage)
export const userAtom = atomWithStorage<User | undefined>("user", undefined, storage)