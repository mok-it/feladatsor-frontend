import { ExerciseListElemFragment } from "@/generated/graphql";
import { composeStore, ExerciseView } from "@/util/composeStore";
import { COMPOSE_HEIGHT } from "@/util/const";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  Box,
  Card,
  Chip,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, memo, useContext, useMemo } from "react";
import { MdEdit, MdStar } from "react-icons/md";
import { Link } from "react-router-dom";
import FakeId from "../FakeId";
import { ContainerContext } from "./Container";
import { Difficulties, DifficultiesWithWarnings } from "./Difficulties";

const ExerciseCardComponent: FC<{
  id: UniqueIdentifier;
  exercise: ExerciseListElemFragment;
}> = ({ exercise }) => {
  const containerId = useContext(ContainerContext);
  const isTalon = containerId === "talon";
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const isSingleView = view !== "all";
  const isDetailedView = exerciseView === ExerciseView.LIST && view !== "all";

  const difficultiesElem = useMemo(
    () =>
      isTalon ? (
        <Difficulties exercise={exercise} />
      ) : (
        <DifficultiesWithWarnings exercise={exercise} />
      ),
    [exercise, isTalon],
  );

  const height =
    exerciseView === ExerciseView.CARD
      ? view === "all"
        ? COMPOSE_HEIGHT.SHORT - 4
        : COMPOSE_HEIGHT.TALL - 4
      : "fit-content";

  return (
    <Tooltip
      enterDelay={1000}
      enterNextDelay={1000}
      title={!isDetailedView && exercise.description}
    >
      <Card
        sx={{
          width: "100%",
          height: height,
          alignSelf: "stretch",
          borderRadius: 1,
          padding: 1,
          paddingBottom: 1.5,
          cursor: exerciseView === ExerciseView.CARD ? "pointer" : "default",
          userSelect: isDetailedView ? "auto" : "none",
          borderColor: "divider",
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
            {exerciseView === ExerciseView.LIST ? (
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
              <Link to={`/exercise/${exercise.id}`}>
                <IconButton size="small">
                  <MdEdit />
                </IconButton>
              </Link>
            )}
          </Stack>
          <>
            <Stack direction={"row"} gap={2}>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp:
                    view === "all"
                      ? "1"
                      : exerciseView === ExerciseView.LIST
                        ? "3"
                        : "unset",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {exercise.description}
              </Typography>
              {exercise.exerciseImage?.url && (
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
              )}
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
          {!isSingleView && difficultiesElem}
        </Stack>
      </Card>
    </Tooltip>
  );
};

const ExerciseCard = memo(ExerciseCardComponent);
export default ExerciseCard;
