import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { FC } from "react";
import {
  FaChevronRight as ChevronRightIcon,
  FaAngleDown as ExpandMoreIcon,
} from "react-icons/fa";

type Tag = {
  name: string;
  parentName?: string;
};

const data: Tag[] = [
  { name: "Geometria" },
  { name: "Kombinatorika" },
  { name: "Algebra" },
  { name: "Logika" },
  { name: "Hazudós", parentName: "Logika" },
];

export const Tags = () => {
  return (
    <Box mb={16}>
      <Typography variant="h4" style={{ margin: "16px" }}>
        Címkék
      </Typography>
      <Card>
        <Box p={2}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {data
              .filter((tag) => !tag.parentName)
              .map((tag) => (
                <Tag tag={tag} />
              ))}
          </TreeView>
        </Box>
      </Card>
    </Box>
  );
};

const Tag: FC<{ tag: Tag }> = ({ tag: { name } }) => {
  return (
    <TreeItem key={name} nodeId={name} label={name}>
      {data
        .filter((tag) => tag.parentName === name)
        .map((tag) => (
          <Tag tag={tag} />
        ))}
    </TreeItem>
  );
};
