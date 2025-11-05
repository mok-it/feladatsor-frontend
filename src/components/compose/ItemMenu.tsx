import { addExerciseModalAtom, composeAtom } from "@/util/atoms";
import { composeStore } from "@/util/composeStore";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Add, DeleteOutline } from "@mui/icons-material";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import { Menu } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useSetAtom } from "jotai";
import { uniqueId } from "lodash";
import { useSnackbar } from "notistack";
import { FC, RefObject, useContext } from "react";
import { ContainerContext } from "./Container";

export const ItemMenu: FC<{
  anchorRef: RefObject<HTMLDivElement>;
  id: UniqueIdentifier | null;
  order: number;
  open: boolean;
  toggle: () => void;
}> = ({ anchorRef, id, order, open, toggle }) => {
  const filled = !!id;
  const snackbar = useSnackbar();

  const containerId = useContext(ContainerContext)!;
  const clear = composeStore((state) => state.clear);
  const setModalAtom = useSetAtom(addExerciseModalAtom);
  const setItems = useSetAtom(composeAtom);
  const clipboardId = composeStore((state) => state.clipboardId);
  const setClipboard = composeStore((state) => state.setClipboard);

  const handleNew = () => {
    setModalAtom({ containerId: containerId, order });
  };
  const handleDelete = () => {
    setItems((draft) => {
      draft[containerId][order].id = null;
    });
    clear();
    snackbar.enqueueSnackbar("Törölve", { variant: "success" });
    toggle();
  };
  const handleCopy = () => {
    if (!id) return;
    setClipboard(id);
    clear();
    snackbar.enqueueSnackbar("Vágólapra másolva", { variant: "success" });
    toggle();
  };
  const handlePaste = () => {
    if (!clipboardId) return;
    setItems((draft) => {
      draft[containerId][order] = { id: clipboardId, cardId: uniqueId() };
    });
    clear();
    toggle();
  };

  return (
    <Menu
      open={open}
      onClose={toggle}
      anchorEl={anchorRef.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      BackdropProps={{
        onContextMenu: (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle();
        },
      }}
    >
      <MenuItem onClick={handleNew}>
        <ListItemIcon>
          <Add fontSize="small" />
        </ListItemIcon>
        <ListItemText>{filled ? "Csere" : "Új"}</ListItemText>
      </MenuItem>
      <MenuItem disabled={!filled} onClick={handleCopy}>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Másolás</ListItemText>
      </MenuItem>
      <MenuItem disabled={!clipboardId} onClick={handlePaste}>
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <ListItemText>Beillesztés</ListItemText>
      </MenuItem>
      <MenuItem disabled={!filled} onClick={handleDelete}>
        <ListItemIcon>
          <DeleteOutline fontSize="small" sx={{ color: "red" }} />
        </ListItemIcon>
        <ListItemText sx={{ color: "red" }}>Törlés</ListItemText>
      </MenuItem>
    </Menu>
  );
};
