import { Box, Stack, Typography } from "@mui/material";
import { InfiniteLoad } from "@/components/InfiniteLoad/InfiniteLoad.tsx";
import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardMeta,
} from "@/components/profile/ProfileCard.tsx";
import { UserCommentFragment } from "@/generated/graphql.tsx";
import dayjs from "dayjs";

interface CommentsListProps {
  comments: Array<UserCommentFragment>;
  hasMoreComments: boolean;
  onLoadMore: () => Promise<void>;
  loading: boolean;
}

export const CommentsList = ({
  comments,
  hasMoreComments,
  onLoadMore,
  loading,
}: CommentsListProps) => {
  return (
    <Box flexGrow={1}>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h5">Kommentjeim</Typography>
        <Box flexGrow={1} />
      </Stack>
      <Box sx={{ maxHeight: "300px", overflowY: "auto", py: 2 }}>
        <InfiniteLoad<UserCommentFragment>
          data={comments}
          hasMore={hasMoreComments}
          isInitialLoading={loading && comments.length === 0}
          isFetchingNextPage={loading}
          fetchNextPage={async () => {
            await onLoadMore();
          }}
        >
          {(comment) => (
            <ProfileCard id={comment.id}>
              <ProfileCardHeader>{comment.comment}</ProfileCardHeader>

              <ProfileCardMeta>
                Exercise ID: {comment.exercise.id}
                <br />
                {comment.exercise.description}
                <br />
              </ProfileCardMeta>
              <ProfileCardMeta textAlign="right" display="block" width="100%">
                {dayjs(+comment.createdAt).format("YYYY. MM. DD.")}
              </ProfileCardMeta>
            </ProfileCard>
          )}
        </InfiniteLoad>
      </Box>
    </Box>
  );
};
