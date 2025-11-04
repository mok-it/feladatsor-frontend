import { ExerciseListElemFragment } from "@/generated/graphql";
import { composeAtom } from "@/util/atoms";
import { ageGroupTexts } from "@/util/const";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Divider, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAtomValue } from "jotai";
import { entries } from "lodash";
import { FC } from "react";

export const Difficulties: FC<{
  exercise: ExerciseListElemFragment;
  items?: Record<
    string,
    {
      id: UniqueIdentifier | null;
      cardId: string;
    }[]
  >;
}> = ({ exercise, items }) => {
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {entries(ageGroupTexts).map(([group]) => {
        const value = exercise.difficulty.find(
          (d) => d.ageGroup === group,
        )?.difficulty;

        let count = 0;
        if (items) {
          for (let i = 0; i < 4; i++) {
            count += items[`${group}-${i}`].filter(
              (e) => e.id === exercise.id,
            ).length;
          }
        }
        const isMissing = items && value && count === 0;

        return (
          <Stack
            key={group}
            width={20}
            height={20}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={50}
            sx={{
              backgroundColor: isMissing ? red[500] : "transparent",
              borderRadius: 50,
              transition: ".5s",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                opacity: value ? 1 : 0.2,
                ...(isMissing && { color: "white" }),
              }}
            >
              {value}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export const DifficultiesWithWarnings: FC<{
  exercise: ExerciseListElemFragment;
}> = ({ exercise }) => {
  const items = useAtomValue(composeAtom);
  return <Difficulties exercise={exercise} items={items} />;
};
