import { ProfileModify } from "@/components/profile/ProfileModify.tsx";
import { ProfileStatCard } from "@/components/profile/ProfileStatCard.tsx";
import {
  UserDocument,
  UserExerciseFragment,
  useUpdateUserMutation,
  useUserQuery,
} from "@/generated/graphql.tsx";
import { useUploadImage } from "@/util/useUploadImage.ts";
import ModeIcon from "@mui/icons-material/Mode";
import { Divider, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineCheckCircle, MdOutlineEdit } from "react-icons/md";
import dayjs from "dayjs";
import { ExerciseStatusBadge } from "@/components/exercise/ExerciseStatusBadge.tsx";
import ExerciseId from "@/components/ExerciseId.tsx";
import { useAtomValue } from "jotai/index";
import { userAtom } from "@/util/atoms.ts";

export const ProfilePage = () => {
  const userFromToken = useAtomValue(userAtom);

  const [profileModifyModalOpen, setProfileModifyModalOpen] = useState(false);
  const [allExercises, setAllExercises] = useState<Array<UserExerciseFragment>>(
    [],
  );
  const [hasMoreExercises, setHasMoreExercises] = useState(true);
  const exerciseContainerRef = useRef<HTMLDivElement>(null);

  const { data: user, fetchMore } = useUserQuery({
    variables: {
      userId: userFromToken?.user?.id ?? "",
      exerciseSkip: 0,
      exerciseTake: 10,
    },
  });

  const handleProfileModifyOpen = () => {
    setProfileModifyModalOpen(true);
  };
  const handleClose = () => {
    setProfileModifyModalOpen(false);
  };

  const { open: openFileDialog, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
  });

  const uploadImage = useUploadImage();

  const [updateUser] = useUpdateUserMutation({
    refetchQueries: [UserDocument],
  });

  useEffect(() => {
    //Upload the file to our server
    if (acceptedFiles.length === 0) return;
    uploadImage(acceptedFiles[0]).then(({ id }) => {
      updateUser({
        variables: {
          data: {
            customAvatarId: id,
          },
        },
      });
    });
  }, [acceptedFiles, uploadImage, updateUser]);

  // Initialize exercises when user data loads
  useEffect(() => {
    if (user?.user?.exercises) {
      setAllExercises(user.user.exercises);
      setHasMoreExercises(user.user.exercises.length === 10);
    }
  }, [user?.user?.exercises]);

  // Load more exercises
  const loadMoreExercises = useCallback(async () => {
    if (!hasMoreExercises || !user?.user?.id) return;

    try {
      const result = await fetchMore({
        variables: {
          userId: user.user.id,
          exerciseSkip: allExercises.length,
          exerciseTake: 10,
        },
      });

      const newExercises = result.data?.user?.exercises || [];
      setAllExercises((prev) => [...prev, ...newExercises]);
      setHasMoreExercises(newExercises.length === 10);
    } catch (error) {
      console.error("Error loading more exercises:", error);
    }
  }, [fetchMore, user?.user?.id, allExercises.length, hasMoreExercises]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = exerciseContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreExercises();
    }
  }, [loadMoreExercises]);

  // Attach scroll listener
  useEffect(() => {
    const container = exerciseContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleFileUpload = useCallback(() => {
    openFileDialog();
  }, [openFileDialog]);

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          <Badge
            overlap="circular"
            sx={{ cursor: "pointer" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IoCameraOutline
                style={{
                  border: "5px solid white",
                  backgroundColor: "#ff558f",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35,
                }}
              />
            }
            onClick={() => handleFileUpload()}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src={
                user?.user?.avatarUrl ??
                //If deleted the program breaks
                "https://t4.ftcdn.net/jpg/04/54/19/43/360_F_454194340_S5Dxu8CJilzPGmqSU44azVccOuvvEj1i.jpg"
              }
            />
          </Badge>

          <Stack direction="row" spacing={1}>
            <Typography variant="h6">{user?.user?.name}</Typography>
            <ModeIcon
              sx={{ cursor: "pointer" }}
              onClick={handleProfileModifyOpen}
            />
            <ProfileModify
              open={profileModifyModalOpen}
              handleClose={handleClose}
            />
          </Stack>
        </Grid>
      </Grid>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          padding: "1rem",
          borderTop: "1px solid #e1e1e1",
        }}
      >
        <Typography variant="h6">Statisztikák</Typography>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}>
            <ProfileStatCard
              title={"Beküldött feladataim"}
              value={user?.user?.stats?.totalExerciseCount || 0}
              unit="db"
              icon={MdOutlineEdit}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ProfileStatCard
              title={"Feladatok amiket ellenőriztem"}
              value={user?.user?.stats?.checkedExerciseCount || 0}
              unit="db"
              icon={MdOutlineCheckCircle}
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            padding: "1rem 2rem",
            borderTop: "1px solid #e1e1e1",
            color: "#899499",
          }}
        >
          <Box flexGrow={1}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography variant="h5">Feladataim</Typography>
              <Box flexGrow={1} />
            </Stack>
            <Stack
              spacing={2}
              py={2}
              ref={exerciseContainerRef}
              sx={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {allExercises.map((exercise) => (
                <Box
                  key={exercise.id}
                  sx={{ p: 1, bgcolor: "grey.50", borderRadius: 1 }}
                >
                  <ExerciseId>{exercise.id}</ExerciseId>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {exercise.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    {dayjs(+exercise.createdAt).format("YYYY. MM. DD.")}
                  </Typography>
                  <ExerciseStatusBadge status={exercise.status} />
                </Box>
              ))}
              {hasMoreExercises && (
                <Typography
                  variant="caption"
                  sx={{ textAlign: "center", py: 1 }}
                >
                  Görgess a további feladatokért...
                </Typography>
              )}
            </Stack>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box flexGrow={1}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography variant="h5">Kommentjeim</Typography>
              <Box flexGrow={1} />
            </Stack>
            <Stack
              spacing={2}
              py={2}
              sx={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {user?.user?.comments.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{ p: 1, bgcolor: "grey.50", borderRadius: 1 }}
                >
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {comment.comment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {comment.exercise.description} •{" "}
                    {new Date(comment.createdAt).toLocaleDateString("hu-HU")}
                  </Typography>
                </Box>
              )) || (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", py: 2 }}
                >
                  Még nincsenek kommentek
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};
