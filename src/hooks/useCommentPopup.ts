import { atom, useAtom } from "jotai";
import { useCallback, MouseEvent } from "react";

const commentPopupAtom = atom<{
  anchorPosition: { top: number; left: number } | null;
  activeThreadId: string | null;
}>({
  anchorPosition: null,
  activeThreadId: null,
});

export const useCommentPopup = () => {
  const [{ anchorPosition, activeThreadId }, setPopupState] =
    useAtom(commentPopupAtom);

  const openComments = useCallback(
    (event: MouseEvent<HTMLElement>, threadId: string) => {
      event.stopPropagation();

      if (activeThreadId === threadId && anchorPosition) {
        setPopupState({
          anchorPosition: null,
          activeThreadId: null,
        });
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      setPopupState({
        anchorPosition: {
          top: rect.top + window.scrollY,
          left: rect.right + window.scrollX,
        },
        activeThreadId: threadId,
      });
    },
    [activeThreadId, anchorPosition, setPopupState],
  );

  const closeComments = useCallback(() => {
    setPopupState({
      anchorPosition: null,
      activeThreadId: null,
    });
  }, [setPopupState]);

  return {
    isOpen: !!anchorPosition,
    anchorPosition: anchorPosition || { top: 0, left: 0 },
    activeThreadId,
    openComments,
    closeComments,
  };
};
