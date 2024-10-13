import { Button, Dialog } from "@mui/material";
import { FC } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { useToggle } from "react-use";

export const DiffModal: FC<{
  oldValue: string;
  newValue: string;
}> = ({ oldValue, newValue }) => {
  const [open, setOpen] = useToggle(false);

  return (
    <>
      <Dialog open={open} onClose={setOpen}>
        <ReactDiffViewer
          oldValue={oldValue}
          newValue={newValue}
          splitView={true}
          hideLineNumbers
          compareMethod={DiffMethod.WORDS}
        />
      </Dialog>
      <Button onClick={() => setOpen(true)}>Kinyit</Button>
    </>
  );
};
