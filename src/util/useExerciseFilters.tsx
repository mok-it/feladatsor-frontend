import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import {
  ExerciseAgeGroup,
  useFlatExerciseTagsQuery,
} from "@/generated/graphql";
import { DifficultySelectorList } from "@/pages/ExerciseListPage/DifficultySelectorList.tsx";
import { TagSelector } from "@/pages/ExerciseListPage/TagSelector.tsx";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { entries } from "lodash";
import { useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParam } from "react-use";
import { useImmer } from "use-immer";
import { searchDefaultValues } from "./const";
import { ExerciseQuery } from "./types";

export const useExerciseFilters = () => {
  const paramTag = useSearchParam("tag");
  const [exerciseQuery, setExerciseQuery] = useImmer<ExerciseQuery>({
    ...searchDefaultValues,
    ...(paramTag ? { includeTags: [paramTag] } : {}),
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
    exerciseQuery.difficulty,
    exerciseQuery.excludeTags,
    exerciseQuery.includeTags,
    exerciseQuery.searchQuery,
    paramTag,
    setExerciseQuery,
    tags,
  ]);

  return { exerciseQuery, setExerciseQuery, difficulty, filterComponents };
};
