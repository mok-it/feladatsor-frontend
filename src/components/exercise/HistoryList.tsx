import { FC } from "react";
import { Typography, Stack, IconButton, Box } from "@mui/material";
import { MdArrowDownward, MdOutlineDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import Check from "@/components/Check";
import { History } from "@/components/History";
import { DiffModal } from "@/components/DiffModal";
import { HistoryValueDisplay } from "./HistoryValueDisplay";
import {
  ExerciseCheckFragment,
  ExerciseCommentFragment,
  ExerciseHistoryFragment,
  HistoryValue,
} from "@/generated/graphql";
import { userAtom } from "@/util/atoms";
import { translateCheck, translateFieldName } from "@/util/const";

type HistoryItem = 
  | (ExerciseHistoryFragment & { historyType: "history" })
  | (ExerciseCheckFragment & { historyType: "check" })
  | (ExerciseCommentFragment & { historyType: "comment" });

interface HistoryListProps {
  history: HistoryItem[];
  sort: "asc" | "desc";
  onSortChange: (sort: "asc" | "desc") => void;
  onCommentDelete: (commentId: string) => void;
  loading?: boolean;
}

export const HistoryList: FC<HistoryListProps> = ({
  history,
  sort,
  onSortChange,
  onCommentDelete,
  loading = false,
}) => {
  const user = useAtomValue(userAtom);

  const renderHistoryItem = (item: HistoryItem, i: number, arr: HistoryItem[]) => {
    const hideHeader = i > 0 && arr[i - 1].createdAt === item.createdAt;

    switch (item.historyType) {
      case "comment": {
        const comment = item as ExerciseCommentFragment & { historyType: "comment" };
        return (
          <History
            key={comment.id}
            hideHeader={hideHeader}
            userName={comment.createdBy.name}
            createdAt={comment.createdAt}
          >
            <Box sx={{ ml: 4, mr: 6, mt: 1 }}>
              <Typography sx={{ wordBreak: "break-all" }}>
                <i>{comment.comment}</i>
              </Typography>
              {comment.createdBy.id === user?.user?.id && (
                <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                  <IconButton onClick={() => onCommentDelete(comment.id)}>
                    <MdOutlineDelete />
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
            userName={check.user.name}
            createdAt={check.createdAt}
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
        const historyItem = item as ExerciseHistoryFragment & { historyType: "history" };
        return (
          <History
            key={historyItem.id}
            hideHeader={hideHeader}
            userName={historyItem.createdBy.name}
            createdAt={historyItem.createdAt}
          >
            <Stack direction="row" gap={1} sx={{ ml: 4, mr: 6, mt: 1 }}>
              <Box sx={{ wordBreak: "break-all" }}>
                {translateFieldName(historyItem.field)}:{" "}
                {historyItem.field === "description" || historyItem.fieldType === "IMAGE" ? (
                  <DiffModal
                    oldValue={historyItem.oldValue as HistoryValue | null}
                    newValue={historyItem.newValue as HistoryValue | null}
                    fieldType={historyItem.fieldType}
                  />
                ) : (
                  <>
                    <HistoryValueDisplay value={historyItem.oldValue || null} />
                    {" "}
                    <Box
                      sx={{
                        display: "inline",
                        position: "relative",
                        top: 1.5,
                      }}
                    >
                      <FaArrowRight />
                    </Box>
                    {" "}
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
    </Stack>
  );
};