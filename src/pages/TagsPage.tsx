import { Card, Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { FC } from "react";
import {
  FaChevronRight as ChevronRightIcon,
  FaAngleDown as ExpandMoreIcon,
} from "react-icons/fa";
import { ExerciseTag, useExerciseTagsQuery } from "@/generated/graphql.tsx";

export const TagsPage = () => {
  const { data, loading } = useExerciseTagsQuery();
  return (
    <Box mb={16}>
      <Typography variant="h4" style={{ margin: "16px" }}>
        Címkék
      </Typography>
      {loading && <Skeleton variant="rounded" height={20} width={"100%"} />}
      <Card>
        {data && (
          <Box p={2}>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {data.exerciseTags.map((tag) => (
                <Tag key={tag.id} tag={tag as ExerciseTag}></Tag>
              ))}
            </TreeView>
          </Box>
        )}
      </Card>
    </Box>
  );
};

const Tag: FC<{
  tag: Omit<ExerciseTag, "children"> & Partial<Pick<ExerciseTag, "children">>;
}> = ({ tag }) => {
  return (
    <TreeItem key={tag.id} nodeId={tag.id} label={tag.name}>
      {tag.children &&
        tag.children
          .filter((childTag) => childTag.id === tag.id)
          .map((tag) => <Tag key={tag.id} tag={tag} />)}
    </TreeItem>
  );
};
