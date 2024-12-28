import { useExerciseTagsQuery } from "@/generated/graphql.tsx";
import { ExerciseTag } from "@/util/types";
import {
  Card,
  Grid2,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { FC, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "react-use";

export const TagsPage = () => {
  const { data } = useExerciseTagsQuery();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    500,
    [search],
  );

  const memoizedTags = useMemo(
    () =>
      data?.flatExerciseTags
        .filter((t) =>
          t.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
        .map((tag) => (
          <Grid2 size={3}>
            <TagLabel key={tag.id} tag={tag} tags={data?.flatExerciseTags} />
          </Grid2>
        )),
    [data, debouncedSearch],
  );
  return (
    <Box mb={16}>
      <Stack direction={"row"} mx={2}>
        <Typography variant="h4" mb={2} sx={{ flexGrow: 1 }}>
          Címkék
        </Typography>
      </Stack>
      <Grid2 container columns={2} spacing={2}>
        <Grid2 size={1}>
          <Card sx={{ p: 2 }}>
            <Grid2 columns={1} container spacing={2} pb={6}>
              {memoizedTags}
            </Grid2>
          </Card>
        </Grid2>
        <Grid2 size={1}>
          <Card sx={{ p: 2 }}>
            <TextField
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              label="Keresés"
              value={search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

const TagLabel: FC<{
  tag: Partial<ExerciseTag>;
  tags: ExerciseTag[];
}> = ({ tag, tags }) => {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = Boolean(tag.children?.length);

  return (
    <Stack gap={1} alignItems={"start"}>
      <Chip
        label={`${tag.name} ${tag.exerciseCount ? `(${tag.exerciseCount})` : ""}`}
      />
      {hasChildren && (
        <Typography
          fontSize={12}
          sx={{
            ml: 2,
            cursor: "pointer",
            userSelect: "none",
            ":hover": { textDecoration: "underline" },
          }}
          onClick={() => hasChildren && setExpanded((prev) => !prev)}
        >
          {tag.children?.length} alcímke
        </Typography>
      )}
      {expanded && hasChildren && (
        <Stack pl={2} gap={1} alignItems={"start"}>
          {tag.children?.map((child) => {
            const tag = tags.find((t) => t.id === child.id);
            return tag && <TagLabel key={child.id} tag={tag} tags={tags} />;
          })}
        </Stack>
      )}
    </Stack>
  );
};
