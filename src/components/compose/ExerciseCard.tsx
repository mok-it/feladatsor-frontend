import { ExerciseCopy } from "@/pages/ExcerciseCompose";
import { composeStore } from "@/util/composeStore";
import { ageGroups } from "@/util/types";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { entries } from "lodash";
import { FC, useContext } from "react";
import { SortableItemContext } from "./SortableItem";

const ExerciseCard: FC<{
  isTalon?: boolean;
  exercise: ExerciseCopy;
}> = ({ exercise, isTalon }) => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  const { highlightedFakeId } = composeStore();

  return (
    <Card
      ref={ref}
      {...attributes}
      {...listeners}
      sx={{
        width: 120,
        borderRadius: 1,
        padding: 1,
        paddingBottom: 1.5,
        cursor: "grab",
        userSelect: "none",
        backgroundColor:
          highlightedFakeId === exercise.data.fakeId ? "lightblue" : "white",
      }}
      // onMouseEnter={() => {
      //   setHighlightedFakeId(exercise.fakeId);
      // }}
      // onMouseLeave={() => {
      //   setHighlightedFakeId(null);
      // }}
    >
      <Stack gap={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="caption">{exercise.data.fakeId}</Typography>
          {/* <Typography variant="caption">{exercise.id}</Typography> */}
        </Stack>
        <Stack
          direction="row"
          justifyContent={"space-evenly"}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {entries(ageGroups).map(([key], index) => (
            <Stack
              key={key}
              bgcolor={!isTalon && index > 2 ? "red" : "none"}
              width={20}
              height={20}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={50}
            >
              <Typography
                key={key}
                variant="caption"
                sx={{
                  color: !isTalon && index > 2 ? "white" : "black",
                  fontWeight: !isTalon && index === 1 ? "600" : "400",
                  opacity: isTalon && index === 1 ? "1" : "0.8",
                }}
              >
                {
                  exercise.data.difficulty.find((d) => d.ageGroup === key)
                    ?.difficulty
                }
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ExerciseCard;
