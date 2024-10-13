import { Exercise, ExerciseAgeGroup } from "@/generated/graphql";
import { exercisePlacementsAtom } from "@/util/atoms";
import { ExerciseView, composeStore } from "@/util/composeStore";
import { ageGroups } from "@/util/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { entries } from "lodash";
import { FC, useContext, useMemo } from "react";
import { MdEdit, MdStar } from "react-icons/md";
import { ContainerContext } from "./Container";

const ExerciseCard: FC<{
  id: UniqueIdentifier;
  isTalon?: boolean;
  isDragging?: boolean;
  exercise: Exercise & { id: string };
}> = ({ exercise, isTalon, isDragging }) => {
  const containerId = useContext(ContainerContext);
  const highlightedid = composeStore((state) => state.highlightedid);
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const placements = useAtomValue(exercisePlacementsAtom);
  const isSingleView = view !== "all";
  const isDetailedView = exerciseView === ExerciseView.LIST;
  const tags = ["Geometria"];
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
            bgcolor={isMissing ? "red" : "none"}
            width={20}
            height={20}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={50}
          >
            <Typography
              variant="caption"
              sx={{
                color: isMissing ? "white" : "black",
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
          cursor: isDetailedView ? "auto" : "grab",
          userSelect: isDetailedView ? "auto" : "none",
          backgroundColor:
            highlightedid === exercise.id ? "lightblue" : "white",
          opacity: isDragging ? 0.5 : 1,
          border: isAgeGroupBad ? "1px solid red" : "none",
        }}
        // onMouseEnter={() => {
        //   setHighlightedid(exercise.id);
        // }}
        // onMouseLeave={() => {
        //   setHighlightedid(null);
        // }}
      >
        <Stack gap={1} p={isSingleView ? 1 : 0}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={1}
          >
            {isDetailedView ? (
              <id>{exercise.id}</id>
            ) : (
              <Typography variant="caption" whiteSpace={"nowrap"}>
                #{exercise.id}
              </Typography>
            )}
            <MdStar color="gold" />
            {isSingleView &&
              tags.map((tag) => <Chip key={tag} size="small" label={tag} />)}
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
                  <Grid container columns={2} spacing={2}>
                    {exercise.helpingQuestions.length > 0 && (
                      <Grid item xs={1}>
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
                      </Grid>
                    )}
                    {exercise.solutionOptions.length > 0 && (
                      <Grid item xs={1}>
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
                      </Grid>
                    )}
                  </Grid>
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

export default ExerciseCard;
