import { useState, useCallback, MouseEvent } from 'react';

export const useCommentPopup = () => {
  const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number } | null>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const openComments = useCallback((event: MouseEvent<HTMLElement>, threadId: string) => {
    event.stopPropagation();

    if (activeThreadId === threadId && anchorPosition) {
      setAnchorPosition(null);
      setActiveThreadId(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    // Position the popup to the right of the target, vertically centered or top-aligned
    setAnchorPosition({
      top: rect.top + window.scrollY,
      left: rect.right + window.scrollX,
    });
    setActiveThreadId(threadId);
  }, [activeThreadId, anchorPosition]);

  const closeComments = useCallback(() => {
    setAnchorPosition(null);
    setActiveThreadId(null);
  }, []);

  return {
    isOpen: !!anchorPosition,
    anchorPosition: anchorPosition || { top: 0, left: 0 },
    activeThreadId,
    openComments,
    closeComments,
  };
};
