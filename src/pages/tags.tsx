import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { TreeItem, TreeView } from "@mui/x-tree-view/TreeItem";
import {
  FaChevronRight as ChevronRightIcon,
  FaAngleDown as ExpandMoreIcon,
} from "react-icons/fa";

type Tag = {
  name: string;
  Parent: string;
};

function createData(name: string, Parent: string): Tag {
  return { name, Parent };
}

const initialRows = [
  createData("Geometria", "Kombinatorika"),
  createData("Kombinatorika", ""),
  createData("Algebra", ""),
  createData("Matusz", "Kombinatorika"),
  createData("Cigány BT", "Matusz"),
];

export const Tags = () => {
  const renderTree = (nodes: any) => (
    <TreeItem
      key={nodes.name}
      nodeId={nodes.name}
      label={`${nodes.name}${nodes.Parent ? ` (${nodes.Parent})` : ""}`}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: any) => renderTree(node))
        : null}
    </TreeItem>
  );

  const generateTree = (rows: Tag[]) => {
    const tree: any = {};
    rows.forEach((row: { name: string | number; Parent: string | number }) => {
      if (!tree[row.name]) {
        tree[row.name] = { ...row, children: [] };
      }
      if (row.Parent && tree[row.Parent]) {
        tree[row.Parent].children.push(tree[row.name]);
      }
    });
    return Object.values(tree).filter((node: any) => !node.Parent);
  };

  const treeData = generateTree(initialRows);

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
            {treeData.map((node: any) => renderTree(node))}
          </TreeView>
        </Box>
      </Card>
    </Box>
  );
};
