import ProfileCard from "@/components/profile/ProfileCard.tsx";
import { useAtomValue } from "jotai/index";
import { userAtom } from "@/util/atoms.ts";

export const ProfilePage = () => {
  const user = useAtomValue(userAtom);
  return <ProfileCard id={user?.user?.id}></ProfileCard>;
};
