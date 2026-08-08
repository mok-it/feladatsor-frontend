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
import { produce } from "immer";
import { entries } from "lodash";
import { useCallback, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { useImmer, type Updater } from "use-immer";
import { translateCheck } from "./const";
import {
  createDefaultExerciseQuery,
  parseExerciseFilters,
  writeExerciseFilters,
} from "./exerciseSearchParams";
import { ExerciseQuery } from "./types";

export const useExerciseFilters = (props?: {
  checkStatus?: boolean;
  persistInUrl?: boolean;
}) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const [localExerciseQuery, setLocalExerciseQuery] = useImmer<ExerciseQuery>(
    () => createDefaultExerciseQuery(props?.checkStatus),
  );

  const urlExerciseQuery = useMemo(
    () => parseExerciseFilters(searchParams, props?.checkStatus),
    [props?.checkStatus, searchParams],
  );
  const exerciseQuery = props?.persistInUrl
    ? urlExerciseQuery
    : localExerciseQuery;

  const updateUrlExerciseQuery = useCallback(
    (update: Parameters<Updater<ExerciseQuery>>[0], replace: boolean) => {
      const nextQuery =
        typeof update === "function" ? produce(exerciseQuery, update) : update;
      const nextParams = new URLSearchParams(searchParams);
      writeExerciseFilters(nextParams, nextQuery, props?.checkStatus);
      setSearchParams(nextParams, { replace });
    },
    [exerciseQuery, props?.checkStatus, searchParams, setSearchParams],
  );
  const setUrlExerciseQuery = useCallback<Updater<ExerciseQuery>>(
    (update) => updateUrlExerciseQuery(update, false),
    [updateUrlExerciseQuery],
  );
  const setExerciseQuery = props?.persistInUrl
    ? setUrlExerciseQuery
    : setLocalExerciseQuery;
  const setSearchQuery = useCallback(
    (searchQuery: string) => {
      const update = (draft: ExerciseQuery) => {
        draft.searchQuery = searchQuery;
      };
      if (props?.persistInUrl) {
        updateUrlExerciseQuery(update, true);
      } else {
        setLocalExerciseQuery(update);
      }
    },
    [props?.persistInUrl, setLocalExerciseQuery, updateUrlExerciseQuery],
  );
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
            setSearchQuery(event.target.value);
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
                draft.checkStatus = value ?? "";
              });
            }}
          >
            <ToggleButton value={""} color="primary">
              Mind
            </ToggleButton>
            <Tooltip
              title={"Nincs még elfogadva, és negatív visszajelzést sem kapott"}
            >
              <ToggleButton value={"NEEDS_TO_BE_CHECKED"} color="primary">
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
        <SimpleAccordion summary="Nehézség szűrő">
          <DifficultySelectorList
            difficulties={exerciseQuery.difficulty}
            setExerciseQuery={setExerciseQuery}
          />
        </SimpleAccordion>
        <SimpleAccordion
          summary="Címke szűrő"
          defaultExpanded={exerciseQuery.includeTags.length > 0}
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
    isMobile,
    props?.checkStatus,
    setExerciseQuery,
    setSearchQuery,
    tags,
  ]);

  return { exerciseQuery, setExerciseQuery, difficulty, filterComponents };
};
