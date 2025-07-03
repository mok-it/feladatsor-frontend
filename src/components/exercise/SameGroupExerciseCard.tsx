import ExerciseId from "@/components/ExerciseId.tsx";
import { SameLogicExerciseFragment } from "@/generated/graphql.tsx";
import { ageGroupTexts } from "@/util/const";
import { Card, Divider, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Box, Stack } from "@mui/system";
import { entries } from "lodash";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";

export const SameGroupExerciseCard: FC<{
  exercise: SameLogicExerciseFragment;
}> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const difficultiesElem = useMemo(
    () => (
      <Stack
        direction="row"
        justifyContent={"space-evenly"}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {entries(ageGroupTexts).map(([group]) => {
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
    [props.exercise.difficulty],
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
            padding: { xs: 0.75, sm: 1 },
            paddingBottom: { xs: 1, sm: 1.5 },
            cursor: "pointer",
            borderColor: "divider",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <Stack gap={{ xs: 0.75, sm: 1 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"start"}
              alignItems={{ xs: "stretch", sm: "center" }}
              gap={1}
            >
              <Stack 
                direction="row" 
                alignItems="center" 
                gap={1}
                sx={{ 
                  overflow: "hidden",
                  minWidth: 0,
                  flexWrap: isMobile ? "wrap" : "nowrap"
                }}
              >
                <ExerciseId>{props.exercise.id}</ExerciseId>
                {props.exercise.tags.slice(0, isMobile ? 2 : 4).map((tag) => (
                  <Chip key={tag.id} size="small" label={tag.name} />
                ))}
                {props.exercise.tags.length > (isMobile ? 2 : 4) && (
                  <Typography variant="caption" color="text.secondary">
                    +{props.exercise.tags.length - (isMobile ? 2 : 4)}
                  </Typography>
                )}
              </Stack>
              <Box flexGrow={1} />
              <Box sx={{ flexShrink: 0 }}>
                {difficultiesElem}
              </Box>
            </Stack>

            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              gap={2}
              alignItems={{ xs: "stretch", sm: "flex-start" }}
            >
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: isMobile ? 3 : 2,
                  flexGrow: 1,
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
                    height: { xs: "2cm", sm: "3cm" },
                    width: { xs: "2cm", sm: "3cm" },
                    borderRadius: 1,
                    alignSelf: { xs: "center", sm: "flex-start" }
                  }}
                >
                  <img 
                    src={props.exercise.exerciseImage?.url || ""} 
                    alt="Exercise illustration"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </Box>
              )}
            </Stack>
          </Stack>
        </Card>
      </Tooltip>
    </Link>
  );
};
