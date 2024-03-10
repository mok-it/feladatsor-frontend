import { Exercise } from "@/generated/graphql";
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
import { entries } from "lodash";
import { FC } from "react";
import { MdEdit, MdStar } from "react-icons/md";

const ExerciseCard: FC<{
  id: UniqueIdentifier;
  isTalon?: boolean;
  isDragging?: boolean;
  exercise: Exercise & { fakeId: string };
}> = ({ exercise, isTalon, isDragging }) => {
  const highlightedFakeId = composeStore((state) => state.highlightedFakeId);
  const view = composeStore((state) => state.view);
  const exerciseView = composeStore((state) => state.exerciseView);
  const isSingleView = view !== "all";
  const isDetailedView = exerciseView === ExerciseView.LIST;
  const tags = ["Geometria"];

  const difficulties = (
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
            {exercise.difficulty.find((d) => d.ageGroup === key)?.difficulty}
          </Typography>
        </Stack>
      ))}
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
            highlightedFakeId === exercise.fakeId ? "lightblue" : "white",
          opacity: isDragging ? 0.5 : 1,
        }}
        // onMouseEnter={() => {
        //   setHighlightedFakeId(exercise.fakeId);
        // }}
        // onMouseLeave={() => {
        //   setHighlightedFakeId(null);
        // }}
      >
        <Stack gap={1} p={isSingleView ? 1 : 0}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={1}
          >
            <Typography variant="caption" whiteSpace={"nowrap"}>
              #{exercise.fakeId}
            </Typography>
            <MdStar color="gold" />
            {isSingleView &&
              tags.map((tag) => <Chip key={tag} size="small" label={tag} />)}
            {/* <Typography variant="caption">{id}</Typography> */}
            <Box flexGrow={1} />
            {isSingleView && difficulties}{" "}
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
                  height={50}
                  width={50}
                  overflow={"hidden"}
                  sx={{ flexShrink: 0, aspectRatio: "1 / 1" }}
                >
                  <img src={exercise.exerciseImage || ""}></img>
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
          {!isSingleView && difficulties}
        </Stack>
      </Card>
    </Tooltip>
  );
};

export default ExerciseCard;
