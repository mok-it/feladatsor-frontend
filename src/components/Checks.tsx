import { ExerciseCheckFragment } from "@/generated/graphql";
import { times } from "lodash";
import { FC } from "react";
import Check from "./Check";

export const Checks: FC<{ data: ExerciseCheckFragment[] }> = ({ data }) => {
  return (
    <>
      {data.map((check) => (
        <Check
          key={check.id}
          response={check.type}
          userName={check.user.name}
          timestamp={check.createdAt}
        />
      ))}
      {data.length <= 3 &&
        times(3 - data.length, (i) => (
          <Check key={i} response={null} userName={""} timestamp={""} />
        ))}
    </>
  );
};
