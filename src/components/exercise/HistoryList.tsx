import Check from "@/components/Check";
import { DiffModal } from "@/components/DiffModal";
import { History } from "@/components/History";
import {
  ExerciseCheckFragment,
  ExerciseCommentFragment,
  ExerciseHistoryFragment,
  HistoryValue,
} from "@/generated/graphql";
import { useAuth } from "@/pages/AuthContext";
import { translateCheck, translateFieldName } from "@/util/const";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  MdArrowDownward,
  MdEdit,
  MdMoreVert,
  MdOutlineDelete,
} from "react-icons/md";
import { HistoryValueDisplay } from "./HistoryValueDisplay";

type HistoryItem =
  | (ExerciseHistoryFragment & { historyType: "history" })
  | (ExerciseCheckFragment & { historyType: "check" })
  | (ExerciseCommentFragment & { historyType: "comment" });

interface HistoryListProps {
  history: HistoryItem[];
  sort: "asc" | "desc";
  onSortChange: (sort: "asc" | "desc") => void;
  onCommentDelete: (commentId: string) => void;
  onCommentEdit: (comment: ExerciseCommentFragment) => void;
  loading?: boolean;
}

export const HistoryList: FC<HistoryListProps> = ({
  history,
  sort,
  onSortChange,
  onCommentDelete,
  onCommentEdit,
  loading = false,
}) => {
  const { user } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedComment, setSelectedComment] =
    useState<ExerciseCommentFragment | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    comment: ExerciseCommentFragment,
  ) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedComment(null);
  };

  const handleEdit = () => {
    if (selectedComment) {
      onCommentEdit(selectedComment);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedComment) {
      onCommentDelete(selectedComment.id);
    }
    handleMenuClose();
  };

  const renderHistoryItem = (
    item: HistoryItem,
    i: number,
    arr: HistoryItem[],
  ) => {
    const hideHeader = i > 0 && arr[i - 1].createdAt === item.createdAt;

    switch (item.historyType) {
      case "comment": {
        const comment = item as ExerciseCommentFragment & {
          historyType: "comment";
        };
        return (
          <History
            key={comment.id}
            hideHeader={hideHeader}
            users={[comment.createdBy, ...(comment.contributors || [])]}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
          >
            <Box sx={{ ml: 4, mr: 6, mt: 1 }}>
              <Typography sx={{ wordBreak: "break-all", mb: 1 }}>
                <i>{comment.comment}</i>
              </Typography>
              {comment.createdBy.id === user?.id && (
                <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                  <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                    <MdMoreVert />
                  </IconButton>
                </Box>
              )}
            </Box>
          </History>
        );
      }

      case "check": {
        const check = item as ExerciseCheckFragment & { historyType: "check" };
        return (
          <History
            key={check.id}
            hideHeader={hideHeader}
            users={[check.user, ...(check.contributors || [])]}
            createdAt={check.createdAt}
            updatedAt={check.updatedAt}
          >
            <Stack direction="row" gap={1} sx={{ ml: 4, mr: 6, mt: 1 }}>
              <Check
                hideTooltip
                response={check.type}
                userName={check.user.name}
                timestamp={check.createdAt}
              />
              <Typography sx={{ wordBreak: "break-all" }}>
                {translateCheck(check.type)}
              </Typography>
            </Stack>
          </History>
        );
      }

      case "history": {
        const historyItem = item as ExerciseHistoryFragment & {
          historyType: "history";
        };
        return (
          <History
            key={historyItem.id}
            hideHeader={hideHeader}
            users={[historyItem.createdBy]}
            createdAt={historyItem.createdAt}
            updatedAt={historyItem.updatedAt}
          >
            <Stack direction="row" gap={1} sx={{ ml: 4, mr: 6, mt: 1 }}>
              <Box sx={{ wordBreak: "break-all" }}>
                {translateFieldName(historyItem.field)}:{" "}
                {historyItem.field === "description" ||
                historyItem.fieldType === "IMAGE" ? (
                  <DiffModal
                    oldValue={historyItem.oldValue as HistoryValue | null}
                    newValue={historyItem.newValue as HistoryValue | null}
                    fieldType={historyItem.fieldType}
                  />
                ) : (
                  <>
                    <HistoryValueDisplay value={historyItem.oldValue || null} />{" "}
                    <Box
                      sx={{
                        display: "inline",
                        position: "relative",
                        top: 1.5,
                      }}
                    >
                      <FaArrowRight />
                    </Box>{" "}
                    <HistoryValueDisplay value={historyItem.newValue || null} />
                  </>
                )}
              </Box>
            </Stack>
          </History>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography variant="h5">Történet</Typography>
        <Box flexGrow={1} />
        <motion.div
          animate={{
            transform: sort === "asc" ? "rotate(0deg)" : "rotate(-180deg)",
          }}
        >
          <IconButton
            onClick={() => onSortChange(sort === "asc" ? "desc" : "asc")}
          >
            <MdArrowDownward />
          </IconButton>
        </motion.div>
      </Stack>
      {loading && <Typography>Töltés...</Typography>}
      {history.map(renderHistoryItem)}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <MdEdit style={{ marginRight: 8 }} />
          Szerkesztés
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <MdOutlineDelete style={{ marginRight: 8 }} />
          Törlés
        </MenuItem>
      </Menu>
    </Stack>
  );
};
