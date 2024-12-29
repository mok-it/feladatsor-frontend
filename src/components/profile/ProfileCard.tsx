// IMPORTS
import { ExerciseTable } from "@/components/ExerciseTable";
import { ProfileStatCard } from "@/components/profile/ProfileStatCard.tsx";
import { Divider, Grid, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import { motion } from "framer-motion";
import { IoCameraOutline } from "react-icons/io5";
import { MdArrowDownward } from "react-icons/md";
import ModeIcon from "@mui/icons-material/Mode";
import { useCallback, useEffect, useState } from "react";
import { ProfileModify } from "@/components/profile/ProfileModify.tsx";
import {
  UserDocument,
  useUpdateUserMutation,
  useUserQuery,
} from "@/generated/graphql.tsx";
import { useDropzone } from "react-dropzone";
import { useUploadImage } from "@/util/useUploadImage.ts";

// STYLES
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
};

export default function ProfileCard(props: { id?: string }) {
  const [historySort, setHistorySort] = useState<"asc" | "desc">("asc");
  const [commentSort, setCommentSort] = useState<"asc" | "desc">("asc");
  const [open, setOpen] = useState(false);

  const { data: user } = useUserQuery({
    variables: { userId: props.id ?? "" },
  });

  const handleProfileModifyOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    getInputProps,
    open: openFileDialog,
    acceptedFiles,
  } = useDropzone({
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
  }, [acceptedFiles]);

  const [updateUser] = useUpdateUserMutation({
    refetchQueries: [UserDocument],
  });

  const handleFileUpload = useCallback(() => {
    openFileDialog();
  }, [openFileDialog]);

  return (
    <Card variant="outlined">
      <input {...getInputProps()} />
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
            ></Avatar>
          </Badge>

          <Stack direction="row" spacing={1}>
            <Typography variant="h6">{user?.user?.name}</Typography>
            <ModeIcon
              sx={{ cursor: "pointer" }}
              onClick={handleProfileModifyOpen}
            />
            <ProfileModify open={open} handleClose={handleClose} />
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="column" spacing={2} sx={styles.details}>
        <Box>
          <Typography variant="h6">Beküldött feladatok</Typography>
          <ExerciseTable
            dataSource={{
              data: [
                {
                  id: "ab-012",
                  categoryDifficulties: {
                    JEGESMEDVE: 1,
                    KISMEDVE: 2,
                    MEDVEBOCS: 3,
                    NAGYMEDVE: 4,
                    KOALA: 2,
                  },
                  hasPicture: false,
                  description:
                    "Ez egy példa feladat kacsa kacsakacsakacsakacsakacsakacsa ",
                  state: "Checked",
                  tags: ["Kombinatorika", "Permutáció"],
                },
              ],
            }}
          />
        </Box>
        <Stack direction="row" spacing={2} sx={styles.value}>
          <Box flexGrow={1}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography variant="h5">Történet</Typography>
              <Box flexGrow={1} />
              <motion.div
                animate={{
                  transform:
                    historySort === "asc" ? "rotate(0deg)" : "rotate(-180deg)",
                }}
              >
                <IconButton
                  onClick={() =>
                    setHistorySort((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                >
                  <MdArrowDownward />
                </IconButton>
              </motion.div>
            </Stack>
            <Stack spacing={2} py={2}></Stack>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box flexGrow={1}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography variant="h5">Kommentek</Typography>
              <Box flexGrow={1} />
              <motion.div
                animate={{
                  transform:
                    commentSort === "asc" ? "rotate(0deg)" : "rotate(-180deg)",
                }}
              >
                <IconButton
                  onClick={() =>
                    setCommentSort((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                >
                  <MdArrowDownward />
                </IconButton>
              </motion.div>
            </Stack>
          </Box>
        </Stack>
        <Divider />
        <Typography variant="h6">Statisztikák</Typography>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}>
            <ProfileStatCard title={"Beküldött feladatok"} value={3} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ProfileStatCard title={"Ellenőrzött feladatok"} value={3} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ProfileStatCard title={"Kacsák száma"} value={1000} />
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
