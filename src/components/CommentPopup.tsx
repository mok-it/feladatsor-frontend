import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Button,
  ClickAwayListener,
  TextField,
  InputAdornment,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";

const COMMENT_POPUP_WIDTH = 320;
const COMMENT_POPUP_GAP = 16;
const VIEWPORT_MARGIN = 8;

// Types
export interface CommentUser {
  name: string;
  avatarUrl?: string | null;
}

export interface CommentData {
  id: string;
  user: CommentUser;
  text: string;
  createdAt: number | string | Date;
  resolvedAt?: number | string | Date | null;
}

export interface CommentPopupProps {
  open: boolean;
  anchorPosition: { top: number; left: number };
  comments: CommentData[];
  onResolve?: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onAdd?: (text: string) => void;
  currentUser?: CommentUser;
  onClose?: () => void;
  className?: string;
}

const formatCommentDate = (
  value: number | string | Date | null | undefined,
) => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    const numericValue = Number(value);
    if (!Number.isNaN(numericValue)) {
      return dayjs(numericValue).format("YYYY. MM. DD. HH:mm");
    }
  }

  if (typeof value === "number") {
    return dayjs(value).format("YYYY. MM. DD. HH:mm");
  }

  return dayjs(value).format("YYYY. MM. DD. HH:mm");
};

const toCommentTimestamp = (
  value: number | string | Date | null | undefined,
) => {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === "number") {
    return value;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  const numericValue = Number(value);
  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  const parsedValue = dayjs(value);
  return parsedValue.isValid() ? parsedValue.valueOf() : 0;
};

const CommentItem = ({
  comment,
  onResolve,
  onDelete,
  isLast,
}: {
  comment: CommentData;
  onResolve?: () => void;
  onDelete: () => void;
  isLast: boolean;
}) => {
  const isResolved = !!comment.resolvedAt;

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: isLast ? "none" : "1px solid",
        borderColor: "divider",
        bgcolor: isResolved ? "action.hover" : "background.paper",
        opacity: isResolved ? 0.7 : 1,
        transition: "all 0.2s",
        "&:first-of-type": {
          borderTopLeftRadius: (theme) => theme.shape.borderRadius,
          borderTopRightRadius: (theme) => theme.shape.borderRadius,
        },
        // Only round bottom if it's the last item AND there is no input area below
        // Handled by parent structure usually
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Avatar
          src={comment.user.avatarUrl || undefined}
          alt={comment.user.name}
          sx={{ width: 32, height: 32 }}
        />
        <Box flex={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              component="span"
              sx={{ fontWeight: 600 }}
            >
              {comment.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatCommentDate(comment.createdAt)}
            </Typography>
          </Stack>

          {/* Content */}
          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              mb: 1,
              color: "text.primary",
              whiteSpace: "pre-wrap",
            }}
          >
            {comment.text}
          </Typography>

          {/* Resolved Info */}
          {isResolved && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 1,
                color: "success.main",
                fontStyle: "italic",
              }}
            >
              Megoldva ekkor: {formatCommentDate(comment.resolvedAt)}
            </Typography>
          )}

          {/* Actions */}
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            {!isResolved && onResolve && (
              <Button
                size="small"
                startIcon={<CheckIcon />}
                onClick={onResolve}
                sx={{ textTransform: "none", fontSize: "0.75rem" }}
              >
                Megoldva
              </Button>
            )}
            <IconButton size="small" onClick={onDelete} title="Törlés">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export const CommentPopup: React.FC<CommentPopupProps> = ({
  open,
  anchorPosition,
  comments,
  onResolve,
  onDelete,
  onAdd,
  currentUser,
  onClose,
}) => {
  const [newComment, setNewComment] = useState("");
  const [pendingScrollFromCount, setPendingScrollFromCount] = useState<
    number | null
  >(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const commentsListRef = useRef<HTMLDivElement | null>(null);
  const commentInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );
  const sortedComments = useMemo(
    () =>
      [...comments].sort((a, b) => {
        const timestampDiff =
          toCommentTimestamp(a.createdAt) - toCommentTimestamp(b.createdAt);

        if (timestampDiff !== 0) {
          return timestampDiff;
        }

        return a.id.localeCompare(b.id);
      }),
    [comments],
  );

  const handleSend = () => {
    if (newComment.trim() && onAdd) {
      setPendingScrollFromCount(sortedComments.length);
      onAdd(newComment);
      setNewComment("");
    }
  };

  const stopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      e.preventDefault();
      onClose?.();
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (
      !open ||
      pendingScrollFromCount === null ||
      sortedComments.length <= pendingScrollFromCount
    ) {
      return;
    }

    requestAnimationFrame(() => {
      commentsListRef.current?.scrollTo({
        top: commentsListRef.current.scrollHeight,
        behavior: "smooth",
      });
      lastCommentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });

    setPendingScrollFromCount(null);
  }, [open, pendingScrollFromCount, sortedComments]);

  useEffect(() => {
    if (!open) {
      setPendingScrollFromCount(null);
      return;
    }

    requestAnimationFrame(() => {
      commentInputRef.current?.focus();
    });
  }, [open]);

  if (!open) return null;

  const viewportLeft = window.scrollX;
  const popupWidth = Math.min(
    COMMENT_POPUP_WIDTH,
    window.innerWidth - VIEWPORT_MARGIN * 2,
  );
  const popupLeft = Math.max(
    viewportLeft + VIEWPORT_MARGIN,
    Math.min(
      anchorPosition.left + COMMENT_POPUP_GAP,
      viewportLeft + window.innerWidth - popupWidth - VIEWPORT_MARGIN,
    ),
  );
  const arrowLeft =
    Math.min(
      popupWidth,
      Math.max(0, anchorPosition.left - popupLeft),
    ) - 6;

  return createPortal(
    <ClickAwayListener onClickAway={() => onClose && onClose()}>
      <Box
        sx={{
          position: "absolute",
          top: anchorPosition.top,
          left: popupLeft,
          zIndex: 1500,
          transform: "translateY(-20px)",
        }}
      >
        <Paper
          elevation={4}
          onClick={stopPropagation}
          onMouseDown={stopPropagation}
          onKeyDown={stopPropagation}
          sx={{
            width: COMMENT_POPUP_WIDTH,
            maxWidth: `calc(100vw - ${VIEWPORT_MARGIN * 2}px)`,
            position: "relative",
            overflow: "visible",
            borderRadius: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 24,
              left: arrowLeft,
              width: 12,
              height: 12,
              bgcolor: "background.paper",
              transform: "rotate(45deg)",
              zIndex: 0,
              boxShadow: "-1px 1px 1px -1px rgba(0,0,0,0.2)",
            },
          }}
        >
          <Stack
            spacing={0}
            sx={{ position: "relative", zIndex: 1, bgcolor: "transparent" }}
          >
            {/* Comments List */}
            <Box
              ref={commentsListRef}
              sx={{ maxHeight: 300, overflowY: "auto" }}
            >
              {sortedComments.map((comment, index) => (
                <Box
                  key={comment.id}
                  ref={
                    index === sortedComments.length - 1 ? lastCommentRef : null
                  }
                >
                  <CommentItem
                    comment={comment}
                    onResolve={
                      onResolve ? () => onResolve(comment.id) : undefined
                    }
                    onDelete={() => onDelete(comment.id)}
                    isLast={index === sortedComments.length - 1 && !onAdd}
                  />
                </Box>
              ))}
              {sortedComments.length === 0 && !onAdd && (
                <Box p={2} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Még nincs komment.
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Add Comment Input */}
            {onAdd && (
              <Box
                sx={{
                  p: 2,
                  borderTop: sortedComments.length > 0 ? "1px solid" : "none",
                  borderColor: "divider",
                  bgcolor: "background.default",
                  borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                  borderBottomRightRadius: (theme) => theme.shape.borderRadius,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  {currentUser && (
                    <Avatar
                      src={currentUser.avatarUrl || undefined}
                      alt={currentUser.name}
                      sx={{ width: 32, height: 32 }}
                    />
                  )}
                  <TextField
                    inputRef={commentInputRef}
                    fullWidth
                    multiline
                    maxRows={4}
                    size="small"
                    placeholder="Írj kommentet..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                      sx: { fontSize: "0.875rem" },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={handleSend}
                            disabled={!newComment.trim()}
                            color="primary"
                          >
                            <SendIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>
            )}
          </Stack>
        </Paper>
      </Box>
    </ClickAwayListener>,
    document.body,
  );
};

export default CommentPopup;
