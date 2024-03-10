import ProfileCard from "@/components/profile/ProfileCard.tsx";
import { useAtomValue } from "jotai/index";
import { userAtom } from "@/util/atoms.ts";

export const ProfilePage = () => {
  const user = useAtomValue(userAtom);
  return (
    <ProfileCard
      user={user}
      name={user && user.user ? user.user.name : " - "}
      dt1={"mainUser.dt1"}
      dt2={"mainUser.dt2"}
      dt3={"mainUser.dt3"}
    ></ProfileCard>
  );
};
