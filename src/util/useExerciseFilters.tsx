import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import {
  ExerciseAgeGroup,
  useFlatExerciseTagsQuery,
} from "@/generated/graphql";
import { DifficultySelectorList } from "@/pages/ExerciseListPage/DifficultySelectorList.tsx";
import { TagSelector } from "@/pages/ExerciseListPage/TagSelector.tsx";
import {
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { entries } from "lodash";
import { useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParam } from "react-use";
import { useImmer } from "use-immer";
import { searchDefaultValues, translateCheck } from "./const";
import { ExerciseQuery } from "./types";

export const useExerciseFilters = (props?: { checkStatus: boolean }) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const paramTag = useSearchParam("tag");
  const [exerciseQuery, setExerciseQuery] = useImmer<ExerciseQuery>({
    ...searchDefaultValues,
    ...(paramTag ? { includeTags: [paramTag] } : {}),
    ...(props?.checkStatus ? { checkStatus: "" } : {}),
  });
  const { data: tags } = useFlatExerciseTagsQuery();

  const difficulty = useMemo(() => {
    return entries(exerciseQuery.difficulty)
      .filter(([, diff]) => diff.isEnabled)
      .map(([ageGroup, difficulty]) => {
        return {
          ageGroup: ageGroup as ExerciseAgeGroup,
          min: difficulty.difficulty[0],
          max: difficulty.difficulty[1],
        };
      });
  }, [exerciseQuery.difficulty]);

  const filterComponents = useMemo(() => {
    return (
      <Stack gap={1}>
        <TextField
          onChange={(event) => {
            setExerciseQuery((draft) => {
              draft.searchQuery = event.target.value;
            });
          }}
          label="Keresés"
          value={exerciseQuery.searchQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearch />
              </InputAdornment>
            ),
          }}
          size="small"
        />
        {props?.checkStatus && (
          <ToggleButtonGroup
            color="primary"
            exclusive
            aria-label="check status"
            value={exerciseQuery.checkStatus}
            orientation={isMobile ? "vertical" : "horizontal"}
            onChange={(_, value) => {
              setExerciseQuery((draft) => {
                draft.checkStatus = value;
              });
            }}
          >
            <Tooltip
              title={"Nincs még elfogadva, és negatív visszajelzést sem kapott"}
            >
              <ToggleButton value={""} color="primary">
                Ellenőrizendő
              </ToggleButton>
            </Tooltip>
            <Tooltip title={"Legalább hárman elfogadták a feladatot"}>
              <ToggleButton value={"GOOD"} color="success">
                {translateCheck("GOOD")}
              </ToggleButton>
            </Tooltip>
            <Tooltip
              title={
                'Nincs elfogadva, és legalább egy "javítandó" visszajelzést kapott'
              }
            >
              <ToggleButton value={"CHANGE_REQUIRED"} color="warning">
                {translateCheck("CHANGE_REQUIRED")}
              </ToggleButton>
            </Tooltip>
            <Tooltip
              title={
                'Nincs elfogadva, és legalább egy "törlendő" visszajelzést kapott'
              }
            >
              <ToggleButton value={"TO_DELETE"} color="error">
                {translateCheck("TO_DELETE")}
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        )}
        {exerciseQuery.searchQuery}
        <SimpleAccordion summary="Nehézség szűrő">
          <DifficultySelectorList
            difficulties={exerciseQuery.difficulty}
            setExerciseQuery={setExerciseQuery}
          />
        </SimpleAccordion>
        <SimpleAccordion
          summary="Címke szűrő"
          defaultExpanded={paramTag !== null}
        >
          {tags && (
            <TagSelector
              tags={tags?.flatExerciseTags}
              selectedTags={exerciseQuery.includeTags}
              excludeTags={exerciseQuery.excludeTags}
              setFieldValue={setExerciseQuery}
            />
          )}
        </SimpleAccordion>
      </Stack>
    );
  }, [
    exerciseQuery.checkStatus,
    exerciseQuery.difficulty,
    exerciseQuery.excludeTags,
    exerciseQuery.includeTags,
    exerciseQuery.searchQuery,
    paramTag,
    props?.checkStatus,
    setExerciseQuery,
    tags,
  ]);

  return { exerciseQuery, setExerciseQuery, difficulty, filterComponents };
};
