import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

type AlertDialogProps = {
  open: boolean;
  handleClose?: () => void;
  primaryClick?: () => void;
  secondaryClick?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  title?: string;
  description: string;
};
export const AlertDialog: FC<AlertDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title ?? "Alert"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.secondaryClick}>
          {props.secondaryButtonText ?? "Mégse"}
        </Button>
        <Button color="primary" onClick={props.primaryClick} autoFocus>
          {props.primaryButtonText ?? "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
