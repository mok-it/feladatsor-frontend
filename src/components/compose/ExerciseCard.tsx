import { ExerciseAgeGroup, SelectExerciseQuery } from "@/generated/graphql";
import { exercisePlacementsAtom } from "@/util/atoms";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { ageGroups } from "@/util/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  Box,
  Card,
  Chip,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { entries } from "lodash";
import { FC, memo, useContext, useMemo } from "react";
import { MdEdit, MdStar } from "react-icons/md";
import FakeId from "../FakeId";
import { ContainerContext } from "./Container";

const ExerciseCard: FC<{
  id: UniqueIdentifier;
  isTalon?: boolean;
  isDragging?: boolean;
  exercise: SelectExerciseQuery["exercise"] & { id: string };
}> = ({ exercise, isTalon, isDragging }) => {
  const containerId = useContext(ContainerContext);
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const placements = useAtomValue(exercisePlacementsAtom);
  const isSingleView = view !== "all";
  const isDetailedView = exerciseView === ExerciseView.LIST;
  const ageGroup = containerId?.split("-")[0];
  const countInGroup = placements[exercise.id]?.[ageGroup as ExerciseAgeGroup];
  const isAgeGroupBad = useMemo(
    () =>
      (!isTalon &&
        exercise.difficulty.find((d) => d.ageGroup === ageGroup)?.difficulty ===
          0) ||
      countInGroup > 1,
    [ageGroup, exercise.difficulty, isTalon, countInGroup],
  );

  const difficultiesElem = (
    <Stack
      direction="row"
      justifyContent={"space-evenly"}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {entries(ageGroups).map(([group]) => {
        const value = exercise.difficulty.find(
          (d) => d.ageGroup === group,
        )?.difficulty;
        const isMissing =
          !isTalon &&
          placements[exercise.id]?.[group as ExerciseAgeGroup] === 0 &&
          value;

        return (
          <Stack
            key={group}
            width={20}
            height={20}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={50}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: isMissing ? "600" : "400",
                opacity: value ? 1 : 0.2,
              }}
            >
              {value}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );

  return (
    <Tooltip title={!isDetailedView && !isDragging && exercise.description}>
      <Card
        sx={{
          alignSelf: "stretch",
          borderRadius: 1,
          padding: 1,
          paddingBottom: 1.5,
          cursor: "pointer",
          userSelect: isDetailedView ? "auto" : "none",
          opacity: isDragging ? 0.5 : 1,
          borderColor: isAgeGroupBad ? "red" : "divider",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <Stack gap={1} p={isSingleView ? 1 : 0}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={1}
          >
            {isDetailedView ? (
              <FakeId>{exercise.id}</FakeId>
            ) : (
              <Typography variant="caption" whiteSpace={"nowrap"}>
                #{exercise.id}
              </Typography>
            )}
            <Box flexShrink={0}>
              <MdStar color="gold" />
            </Box>
            {isSingleView &&
              exercise.tags.map((tag) => (
                <Chip key={tag.id} size="small" label={tag.name} />
              ))}
            {/* <Typography variant="caption">{id}</Typography> */}
            <Box flexGrow={1} />
            {isSingleView && difficultiesElem}
            {isSingleView && (
              <IconButton size="small">
                <MdEdit />
              </IconButton>
            )}
          </Stack>
          {isSingleView && (
            <>
              <Stack direction={"row"} gap={2}>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    ...(!isDetailedView && { WebkitLineClamp: "3" }),
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {exercise.description}
                </Typography>
                <Box
                  overflow={"hidden"}
                  sx={{
                    flexGrow: 0,
                    flexShrink: 0,
                    height: "3cm",
                    width: "3cm",
                  }}
                >
                  <img src={exercise.exerciseImage?.url || ""}></img>
                </Box>
              </Stack>
              {isDetailedView && (
                <>
                  <Grid2 container columns={2} spacing={2}>
                    {exercise.helpingQuestions.length > 0 && (
                      <Grid2 size={1}>
                        <Typography variant="body2">Segítőkérdések:</Typography>
                        <ul>
                          {exercise.helpingQuestions.map((question) => (
                            <li>
                              <Typography key={question} variant="body2">
                                {question}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Grid2>
                    )}
                    {exercise.solutionOptions.length > 0 && (
                      <Grid2 size={1}>
                        <Typography variant="body2">Válaszopciók:</Typography>
                        <ul>
                          {exercise.solutionOptions.map((question) => (
                            <li>
                              <Typography key={question} variant="body2">
                                {question}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Grid2>
                    )}
                  </Grid2>
                  <Typography variant="body2">
                    Megoldás: <b>{exercise.solution}</b>
                  </Typography>
                </>
              )}
            </>
          )}
          {!isSingleView && difficultiesElem}
        </Stack>
      </Card>
    </Tooltip>
  );
};

const MemoizedExerciseCard = memo(ExerciseCard);
export default MemoizedExerciseCard;
