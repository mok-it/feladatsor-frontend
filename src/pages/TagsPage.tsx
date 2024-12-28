import { Card, Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ExerciseTag, useExerciseTagsQuery } from "@/generated/graphql.tsx";
import { FC } from "react";
import Chip from "@mui/material/Chip";

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
            {data.exerciseTags.map((tag) => (
              // @ts-ignore
              <Tag key={tag.id} tag={tag} />
            ))}
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
    <Box>
      <Chip label={tag.name} />
      <Typography variant="body2">Feladat db: {tag.exerciseCount}</Typography>
      {tag.children && (
        <Box ml={2}>
          {tag.children.map((child) => (
            <Tag key={child.id} tag={child} />
          ))}
        </Box>
      )}
    </Box>
  );
};
