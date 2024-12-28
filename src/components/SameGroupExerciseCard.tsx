import { FC, useMemo } from "react";
import { SameLogicExerciseFragment } from "@/generated/graphql.tsx";
import { Card, Divider, Tooltip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import FakeId from "@/components/FakeId.tsx";
import Chip from "@mui/material/Chip";
import { entries } from "lodash";
import { ageGroups } from "@/util/types.ts";
import { Link } from "react-router-dom";

export const SameGroupExerciseCard: FC<{
  exercise: SameLogicExerciseFragment;
}> = (props) => {
  const difficultiesElem = useMemo(
    () => (
      <Stack
        direction="row"
        justifyContent={"space-evenly"}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {entries(ageGroups).map(([group]) => {
          const value = props.exercise.difficulty.find(
            (d) => d.ageGroup === group,
          )?.difficulty;
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
                  fontWeight: "400",
                  opacity: value ? 1 : 0.2,
                }}
              >
                {value}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    ),
    [props.exercise.difficulty, props.exercise.id],
  );

  return (
    <Link
      to={`/exercise/${props.exercise.id}`}
      style={{ textDecoration: "none" }}
    >
      <Tooltip title={props.exercise.description} placement="top">
        <Card
          sx={{
            width: "100%",
            alignSelf: "stretch",
            borderRadius: 1,
            padding: 1,
            paddingBottom: 1.5,
            cursor: "pointer",
            borderColor: "divider",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <Stack gap={1}>
            <Stack
              direction={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              gap={1}
              sx={{ overflow: "scroll" }}
            >
              <FakeId>{props.exercise.id}</FakeId>
              {props.exercise.tags.map((tag) => (
                <Chip key={tag.id} size="small" label={tag.name} />
              ))}
              <Box flexGrow={1} />
              {difficultiesElem}
            </Stack>

            <>
              <Stack direction="row" gap={2}>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {props.exercise.description}
                </Typography>
                {props.exercise.exerciseImage?.url && (
                  <Box
                    overflow={"hidden"}
                    sx={{
                      flexGrow: 0,
                      flexShrink: 0,
                      height: "3cm",
                      width: "3cm",
                    }}
                  >
                    <img src={props.exercise.exerciseImage?.url || ""}></img>
                  </Box>
                )}
              </Stack>
            </>
          </Stack>
        </Card>
      </Tooltip>
    </Link>
  );
};
