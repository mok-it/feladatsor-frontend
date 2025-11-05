import { addExerciseModalAtom, composeAtom } from "@/util/atoms";
import { composeStore } from "@/util/composeStore";
import { useAtom, useSetAtom } from "jotai";
import { isNumber, uniqueId } from "lodash";
import { useSnackbar } from "notistack";
import { useKeyPressEvent } from "react-use";

export const useComposeKeys = () => {
  const snackbar = useSnackbar();

  const [items, setItems] = useAtom(composeAtom);

  const selectedContainer = composeStore((state) => state.selectedContainer);
  const selectedOrder = composeStore((state) => state.selectedOrder);

  const clipboardId = composeStore((state) => state.clipboardId);
  const setClipboard = composeStore((state) => state.setClipboard);

  const setModalAtom = useSetAtom(addExerciseModalAtom);

  const handleEnter = () => {
    if (!selectedContainer || !isNumber(selectedOrder)) return;
    setModalAtom({ containerId: selectedContainer, order: selectedOrder });
  };
  const handleCopy = () => {
    if (!selectedContainer || !isNumber(selectedOrder)) return;
    const id = items[selectedContainer][selectedOrder].id;
    if (!id) return;
    setClipboard(id);
    snackbar.enqueueSnackbar("Vágólapra másolva", { variant: "success" });
  };
  const handlePaste = () => {
    if (!clipboardId || !selectedContainer || !isNumber(selectedOrder)) return;
    setItems((draft) => {
      draft[selectedContainer][selectedOrder] = {
        id: clipboardId,
        cardId: uniqueId(),
      };
    });
  };
  const handleDelete = () => {
    if (!selectedContainer || !isNumber(selectedOrder)) return;
    setItems((draft) => {
      draft[selectedContainer][selectedOrder].id = null;
    });
    snackbar.enqueueSnackbar("Törölve", { variant: "success" });
  };

  useKeyPressEvent("Enter", () => {
    handleEnter();
  });
  useKeyPressEvent("c", (e) => {
    if (!e.ctrlKey) return;
    handleCopy();
  });
  useKeyPressEvent("v", (e) => {
    if (!e.ctrlKey) return;
    handlePaste();
  });
  useKeyPressEvent("Delete", () => {
    handleDelete();
  });
};
