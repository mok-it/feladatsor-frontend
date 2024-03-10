import { userAtom } from "@/util/atoms.ts";
import { useAtomValue } from "jotai";

export const HomePage = () => {
  const user = useAtomValue(userAtom);
  return (
    <div>
      <h1>Szia, {user && user.user ? user.user.name : " - "}</h1>
    </div>
  );
};
