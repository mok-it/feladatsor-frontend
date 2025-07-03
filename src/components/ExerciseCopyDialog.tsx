import { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { ContributorsSelector } from "./ContributorsSelector";
import { UsersQuery } from "@/generated/graphql";

type ExerciseCopyDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (contributors: string[]) => void;
};

export const ExerciseCopyDialog: FC<ExerciseCopyDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [selectedContributors, setSelectedContributors] = useState<string[]>(
    [],
  );

  const handleConfirm = () => {
    onConfirm(selectedContributors);
    setSelectedContributors([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedContributors([]);
    onClose();
  };

  const handleContributorsChange = (users: UsersQuery["users"]) => {
    setSelectedContributors(users.map((user) => user.id));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Feladat duplikálása</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            A feladat duplikálásra kerül. Válaszd ki a közreműködőket az új
            feladathoz.
          </Typography>
          <ContributorsSelector
            selectedUsers={selectedContributors}
            onChange={handleContributorsChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Mégse</Button>
        <Button onClick={handleConfirm} variant="contained">
          Duplikálás
        </Button>
      </DialogActions>
    </Dialog>
  );
};
