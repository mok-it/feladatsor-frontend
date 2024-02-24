import { Exercise } from "@/generated/graphql";
import { ageGroups } from "@/util/types";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { entries } from "lodash";
import { FC } from "react";

const ExerciseCard: FC<{ exercise: Exercise & { fakeId: string } }> = ({
  exercise,
}) => {
  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          <Typography variant="caption">{exercise.fakeId}</Typography>
          <Stack
            direction="row"
            justifyContent={"space-evenly"}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {entries(ageGroups).map(([key]) => (
              <Typography key={key}>
                {
                  exercise.difficulty.find((d) => d.ageGroup === key)
                    ?.difficulty
                }
              </Typography>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
