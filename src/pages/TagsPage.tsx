import {
  ExerciseTagsDocument,
  useCreateExerciseTagMutation,
  useDeleteExerciseTagMutation,
  useExerciseTagsQuery,
  useUpdateExerciseTagMutation,
} from "@/generated/graphql.tsx";
import { ExerciseTag } from "@/util/types";
import {
  Button,
  Card,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useSnackbar } from "notistack";
import { FC, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDone, MdEdit, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDebounce } from "react-use";

export const TagsPage = () => {
  const { data } = useExerciseTagsQuery();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<Partial<ExerciseTag> | null>(
    null,
  );

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    200,
    [search],
  );

  const memoizedTags = useMemo(
    () =>
      data?.flatExerciseTags
        .filter((t) =>
          t.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((tag) => (
          <Grid2 key={tag.id} size={3}>
            <TagLabel
              tag={tag}
              tags={data?.flatExerciseTags}
              selectedTag={selectedTag || undefined}
              onSelect={(tag) => {
                if (selectedTag?.id === tag.id) {
                  setSelectedTag(null);
                } else {
                  setSelectedTag(tag);
                }
              }}
            />
          </Grid2>
        )),
    [data?.flatExerciseTags, debouncedSearch, selectedTag],
  );

  const snakbar = useSnackbar();
  const [name, setName] = useState("");
  const [create] = useCreateExerciseTagMutation({
    refetchQueries: [{ query: ExerciseTagsDocument }],
  });

  const save = async () => {
    if (!name) return;
    setName("");
    if (selectedTag?.id) {
      await create({
        variables: { name, parentId: selectedTag?.id },
      });
    } else {
      await create({ variables: { name } });
    }
    snakbar.enqueueSnackbar("Címke létrehozva", {
      variant: "success",
    });
  };

  const duplicateTag =
    name && data?.flatExerciseTags.some((t) => t.name === name);

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
            <Stack gap={2}>
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
              <Typography variant="h5" mt={2}>
                Új címke
              </Typography>
              {selectedTag && (
                <Typography variant="body1">
                  A {selectedTag?.name} címke alá
                </Typography>
              )}
              <form
                onSubmit={(e) => {
                  e?.preventDefault();
                  save();
                }}
              >
                <TextField
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </form>
              {duplicateTag && (
                <Typography variant="body2" color="error">
                  Már létezik ilyen címke
                </Typography>
              )}
              <Button
                variant="contained"
                disabled={Boolean(!name || duplicateTag)}
                onClick={save}
              >
                Mentés
              </Button>
            </Stack>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

const TagLabel: FC<{
  tag: Partial<ExerciseTag>;
  tags: ExerciseTag[];
  selectedTag?: Partial<ExerciseTag>;
  onSelect: (tag: Partial<ExerciseTag>) => void;
}> = ({ tag, tags, onSelect, selectedTag }) => {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(tag.name);

  const hasChildren = Boolean(tag.children?.length);

  const [mutation] = useUpdateExerciseTagMutation({
    refetchQueries: [{ query: ExerciseTagsDocument }],
  });
  const [deleteMutation] = useDeleteExerciseTagMutation({
    refetchQueries: [{ query: ExerciseTagsDocument }],
  });
  const snakcbar = useSnackbar();

  const save = async () => {
    if (duplicateTag || !tag.id || !name) return;
    onSelect(tag);
    await mutation({
      variables: { updateExerciseTagId: tag.id, name },
    });
    snakcbar.enqueueSnackbar("Címke frissítve", {
      variant: "success",
    });
  };

  const deleteTag = async () => {
    if (!tag.id) return;
    onSelect({});
    await deleteMutation({
      variables: { deleteExerciseTagId: tag.id },
    });
    snakcbar.enqueueSnackbar("Címke törölve", {
      variant: "success",
    });
  };

  const duplicateTag =
    name && tags.filter((t) => t.id !== tag.id).some((t) => t.name === name);

  return (
    <Stack gap={1} alignItems={"start"}>
      {selectedTag?.id === tag.id ? (
        <form
          onSubmit={(e) => {
            e?.preventDefault();
            save();
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <TextField
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              fullWidth
              size="small"
            ></TextField>
            <IconButton onClick={save}>
              <MdDone size={16} />
            </IconButton>
            {!(hasChildren || tag.exerciseCount) && (
              <IconButton onClick={deleteTag}>
                <MdOutlineDelete color="red" size={16} />
              </IconButton>
            )}
          </Stack>
          {duplicateTag && (
            <Typography variant="body2" color="error">
              Már létezik ilyen címke
            </Typography>
          )}
        </form>
      ) : (
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Link to={`/list-exercises?tag=${tag.id}`}>
            <Chip
              sx={{ cursor: "pointer" }}
              label={`${tag.name} ${tag.exerciseCount ? `(${tag.exerciseCount} db)` : ""}`}
            />
          </Link>
          <IconButton onClick={() => onSelect(tag)}>
            <MdEdit size={14} />
          </IconButton>
        </Stack>
      )}
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
            return (
              tag && (
                <TagLabel
                  key={child.id}
                  tag={tag}
                  tags={tags}
                  onSelect={onSelect}
                  selectedTag={selectedTag}
                />
              )
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};
