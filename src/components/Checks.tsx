import { ExerciseCheckFragment } from "@/generated/graphql";
import { orderBy, times, uniqBy } from "lodash";
import { FC } from "react";
import Check from "./Check";

export const Checks: FC<{ data: ExerciseCheckFragment[] }> = ({ data }) => {
  const checks = uniqBy(
    orderBy(data, "createdAt", "desc"),
    (item) => item.user.id,
  );

  return (
    <>
      {checks.map((check) => (
        <Check
          key={check.id}
          response={check.type}
          userName={check.user.name}
          timestamp={check.createdAt}
        />
      ))}
      {checks.length <= 3 &&
        times(3 - checks.length, (i) => (
          <Check key={i} response={null} userName={""} timestamp={""} />
        ))}
    </>
  );
};
