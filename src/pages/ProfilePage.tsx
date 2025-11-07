import { useInfiniteLoad } from "@/components/InfiniteLoad/useInfiniteLoad.ts";
import { CommentsList } from "@/components/profile/CommentsList.tsx";
import { ExercisesList } from "@/components/profile/ExercisesList.tsx";
import { ProfileHeader } from "@/components/profile/ProfileHeader.tsx";
import { ProfileStats } from "@/components/profile/ProfileStats.tsx";
import {
  UserCommentFragment,
  UserExerciseFragment,
  useSelectUserCommentsLazyQuery,
  useSelectUserExercisesLazyQuery,
  useUserQuery,
} from "@/generated/graphql.tsx";
import { Box, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import { useCallback } from "react";
import { useAuth } from "./AuthContext";

const EXERCISES_LIMIT = 10;
const COMMENTS_LIMIT = 10;

export const ProfilePage = () => {
  const { user } = useAuth();

  const { data } = useUserQuery({
    variables: {
      userId: user?.id ?? "",
    },
  });

  const [getExercises, { loading: exercisesLoading }] =
    useSelectUserExercisesLazyQuery();

  const fetchExercises = useCallback(
    async (
      skip: number,
    ): Promise<{ data: UserExerciseFragment[]; totalCount?: number }> => {
      if (!user?.id) return { data: [] };

      const result = await getExercises({
        variables: {
          userId: user.id,
          skip,
          take: EXERCISES_LIMIT,
        },
      });

      return { data: result.data?.user?.exercises || [] };
    },
    [getExercises, user?.id],
  );

  const {
    data: exercises,
    fetchMore: fetchMoreExercises,
    hasMore: hasMoreExercises,
  } = useInfiniteLoad<UserExerciseFragment>({
    fetch: fetchExercises,
    limit: EXERCISES_LIMIT,
  });

  const [getComments, { loading: commentsLoading }] =
    useSelectUserCommentsLazyQuery();

  const fetchComments = useCallback(
    async (
      skip: number,
    ): Promise<{ data: UserCommentFragment[]; totalCount?: number }> => {
      if (!user?.id) return { data: [] };

      const result = await getComments({
        variables: {
          userId: user.id,
          skip,
          take: COMMENTS_LIMIT,
        },
      });

      return { data: result.data?.user?.comments || [] };
    },
    [getComments, user?.id],
  );

  const {
    data: comments,
    fetchMore: fetchMoreComments,
    hasMore: hasMoreComments,
  } = useInfiniteLoad<UserCommentFragment>({
    fetch: fetchComments,
    limit: COMMENTS_LIMIT,
  });

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <ProfileHeader user={data?.user} />
      <ProfileStats stats={data?.user?.stats} />
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ExercisesList
            exercises={exercises}
            hasMoreExercises={hasMoreExercises}
            onLoadMore={fetchMoreExercises}
            loading={exercisesLoading}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", md: "block" },
          }}
        />
        <Divider
          sx={{
            display: { xs: "block", md: "none" },
          }}
        />
        <Box sx={{ flex: 1 }}>
          <CommentsList
            comments={comments}
            hasMoreComments={hasMoreComments}
            onLoadMore={fetchMoreComments}
            loading={commentsLoading}
          />
        </Box>
      </Box>
    </Card>
  );
};
