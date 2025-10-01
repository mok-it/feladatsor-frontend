import { ExerciseStatusBadge } from "@/components/exercise/ExerciseStatusBadge.tsx";
import ExerciseId from "@/components/ExerciseId.tsx";
import { InfiniteLoad } from "@/components/InfiniteLoad/InfiniteLoad.tsx";
import {
  ProfileCard,
  ProfileCardMeta,
} from "@/components/profile/ProfileCard.tsx";
import { UserExerciseFragment } from "@/generated/graphql.tsx";
import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface ExercisesListProps {
  exercises: Array<UserExerciseFragment>;
  hasMoreExercises: boolean;
  onLoadMore: () => Promise<void>;
  loading: boolean;
}

export const ExercisesList = ({
  exercises,
  hasMoreExercises,
  onLoadMore,
  loading,
}: ExercisesListProps) => {
  const navigate = useNavigate();

  const handleExerciseClick = (exerciseId: string) => {
    navigate(`/exercise/${exerciseId}`);
  };

  return (
    <Box flexGrow={1}>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h5">Feladataim</Typography>
        <Box flexGrow={1} />
      </Stack>
      <Box sx={{ maxHeight: "300px", overflowY: "auto", py: 2 }}>
        <InfiniteLoad<UserExerciseFragment>
          data={exercises}
          hasMore={hasMoreExercises}
          isInitialLoading={loading && exercises.length === 0}
          isFetchingNextPage={loading}
          fetchNextPage={async () => {
            await onLoadMore();
          }}
        >
          {(exercise) => (
            <ProfileCard
              id={exercise.id}
              onClick={() => handleExerciseClick(exercise.id)}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <ExerciseId>{exercise.id}</ExerciseId>
                <ExerciseStatusBadge status={exercise.status} />
              </Stack>
              <ProfileCardMeta>{exercise?.description}</ProfileCardMeta>
              <ProfileCardMeta textAlign="right" display="block" width="100%">
                {dayjs(+exercise.createdAt).format("YYYY. MM. DD.")}
              </ProfileCardMeta>
            </ProfileCard>
          )}
        </InfiniteLoad>
      </Box>
    </Box>
  );
};
