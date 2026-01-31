import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';

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
  onResolve: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onAdd?: (text: string) => void;
  currentUser?: CommentUser;
  onClose?: () => void;
  className?: string;
}

const CommentItem = ({
  comment,
  onResolve,
  onDelete,
  isLast,
}: {
  comment: CommentData;
  onResolve: () => void;
  onDelete: () => void;
  isLast: boolean;
}) => {
  const isResolved = !!comment.resolvedAt;

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: isLast ? 'none' : '1px solid',
        borderColor: 'divider',
        bgcolor: isResolved ? 'action.hover' : 'background.paper',
        opacity: isResolved ? 0.7 : 1,
        transition: 'all 0.2s',
        '&:first-of-type': {
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" component="span" sx={{ fontWeight: 600 }}>
              {comment.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(comment.createdAt).format('MMM D, HH:mm')}
            </Typography>
          </Stack>

          {/* Content */}
          <Typography variant="body2" sx={{ mt: 0.5, mb: 1, color: 'text.primary', whiteSpace: 'pre-wrap' }}>
            {comment.text}
          </Typography>

          {/* Resolved Info */}
          {isResolved && (
            <Typography
              variant="caption"
              sx={{ display: 'block', mb: 1, color: 'success.main', fontStyle: 'italic' }}
            >
              Resolved {dayjs(comment.resolvedAt).format('MMM D, HH:mm')}
            </Typography>
          )}

          {/* Actions */}
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            {!isResolved && (
              <Button
                size="small"
                startIcon={<CheckIcon />}
                onClick={onResolve}
                sx={{ textTransform: 'none', fontSize: '0.75rem' }}
              >
                Resolve
              </Button>
            )}
            <IconButton size="small" onClick={onDelete} title="Delete">
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
  const [newComment, setNewComment] = useState('');

  const handleSend = () => {
    if (newComment.trim() && onAdd) {
      onAdd(newComment);
      setNewComment('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return createPortal(
    <ClickAwayListener onClickAway={() => onClose && onClose()}>
      <Box
        sx={{
          position: 'absolute',
          top: anchorPosition.top,
          left: anchorPosition.left,
          zIndex: 1500,
          transform: 'translateY(-20px)', 
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: 320,
            position: 'relative',
            ml: 2,
            overflow: 'visible',
            borderRadius: 1,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 24,
              left: -6,
              width: 12,
              height: 12,
              bgcolor: 'background.paper',
              transform: 'rotate(45deg)',
              zIndex: 0, 
              boxShadow: '-1px 1px 1px -1px rgba(0,0,0,0.2)', 
            },
          }}
        >
          <Stack spacing={0} sx={{ position: 'relative', zIndex: 1, bgcolor: 'transparent' }}>
            {/* Comments List */}
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {comments.map((comment, index) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onResolve={() => onResolve(comment.id)}
                  onDelete={() => onDelete(comment.id)}
                  isLast={index === comments.length - 1 && !onAdd}
                />
              ))}
              {comments.length === 0 && !onAdd && (
                <Box p={2} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    No comments yet.
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Add Comment Input */}
            {onAdd && (
              <Box 
                sx={{ 
                  p: 2, 
                  borderTop: comments.length > 0 ? '1px solid' : 'none', 
                  borderColor: 'divider',
                  bgcolor: 'background.default',
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
                    fullWidth
                    multiline
                    maxRows={4}
                    size="small"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                      sx: { fontSize: '0.875rem' },
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
                      )
                    }}
                  />
                </Stack>
              </Box>
            )}
          </Stack>
        </Paper>
      </Box>
    </ClickAwayListener>,
    document.body
  );
};

export default CommentPopup;