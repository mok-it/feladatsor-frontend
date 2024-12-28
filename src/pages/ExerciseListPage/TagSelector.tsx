import { FlatExerciseTagsQuery } from "@/generated/graphql.tsx";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { MultiSelect } from "@/components/MultiSelect.tsx";
import { FC } from "react";
import { ExerciseQuery } from "@/pages/ExerciseListPage/ExerciseListPage.tsx";
import { Updater } from "use-immer";

export const TagSelector: FC<{
  tags: FlatExerciseTagsQuery["flatExerciseTags"];
  selectedTags: string[];
  excludeTags: string[];
  setFieldValue: Updater<ExerciseQuery>;
}> = (props) => {
  return (
    <Stack>
      <Typography>Tartalmazza a következők egyikét</Typography>
      <MultiSelect<{ id: string; name: string }>
        items={props.tags}
        value={props.tags.filter((tag) => props.selectedTags.includes(tag.id))}
        getItemLabel={(item) => item.name}
        getItemKey={(item) => item.id}
        onChange={(items) => {
          props.setFieldValue((draft) => {
            draft["includeTags"] = items.map((item) => item.id);
          });
        }}
      />
      <Typography>Ne tartalmazza a következőket</Typography>
      <MultiSelect<{ id: string; name: string }>
        items={props.tags}
        value={props.tags.filter((tag) => props.excludeTags.includes(tag.id))}
        getItemLabel={(item) => item.name}
        getItemKey={(item) => item.id}
        onChange={(items) => {
          props.setFieldValue((draft) => {
            draft["excludeTags"] = items.map((item) => item.id);
          });
        }}
      />
    </Stack>
  );
};
