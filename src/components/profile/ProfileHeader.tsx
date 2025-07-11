import { AlertDialog } from "@/components/Dialog.tsx";
import { ProfileModify } from "@/components/profile/ProfileModify.tsx";
import { UserDocument, useUpdateUserMutation } from "@/generated/graphql.tsx";
import { useUploadImage } from "@/util/useUploadImage.ts";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCameraOutline, IoClose } from "react-icons/io5";
import { grey } from "@/theme/palette.ts";

interface ProfileHeaderProps {
  user:
    | {
        name?: string | null;
        avatarUrl?: string | null;
      }
    | null
    | undefined;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const [profileModifyModalOpen, setProfileModifyModalOpen] = useState(false);
  const [deleteAvatarDialogOpen, setDeleteAvatarDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleProfileModifyOpen = () => {
    setProfileModifyModalOpen(true);
  };

  const handleClose = () => {
    setProfileModifyModalOpen(false);
  };

  const { open: openFileDialog, acceptedFiles } = useDropzone({
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
    if (acceptedFiles.length === 0) return;
    uploadImage(acceptedFiles[0])
      .then(({ id }) => {
        updateUser({
          variables: {
            data: {
              customAvatarId: id,
            },
          },
        });
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        enqueueSnackbar({ 
          variant: "error", 
          message: "Profilkép feltöltése sikertelen. Próbáld újra!" 
        });
      });
  }, [acceptedFiles, uploadImage, updateUser, enqueueSnackbar]);

  const handleFileUpload = useCallback(() => {
    openFileDialog();
  }, [openFileDialog]);

  const handleDeleteAvatar = useCallback(async () => {
    try {
      await updateUser({
        variables: {
          data: {
            customAvatarId: null,
          },
        },
      });
      enqueueSnackbar({ 
        variant: "success", 
        message: "Profilkép sikeresen törölve!" 
      });
    } catch (error) {
      console.error('Delete avatar failed:', error);
      enqueueSnackbar({ 
        variant: "error", 
        message: "Profilkép törlése sikertelen. Próbáld újra!" 
      });
    } finally {
      setDeleteAvatarDialogOpen(false);
    }
  }, [updateUser, enqueueSnackbar]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Badge
            overlap="circular"
            sx={{ cursor: "pointer" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IoCameraOutline
                style={{
                  border: "5px solid white",
                  backgroundColor: grey[200],
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
              src={user?.avatarUrl ?? undefined}
            />
          </Badge>
          {user?.avatarUrl && (
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'error.main',
                color: 'white',
                width: 28,
                height: 28,
                '&:hover': {
                  backgroundColor: 'error.dark',
                },
              }}
              onClick={() => setDeleteAvatarDialogOpen(true)}
            >
              <IoClose size={16} />
            </IconButton>
          )}
        </div>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6">{user?.name}</Typography>
          <SettingsIcon
            sx={{ cursor: "pointer" }}
            onClick={handleProfileModifyOpen}
          />
          <ProfileModify
            open={profileModifyModalOpen}
            handleClose={handleClose}
          />
        </Stack>
      </Grid>
      <AlertDialog
        open={deleteAvatarDialogOpen}
        description="Biztosan törlöd a profilképedet?"
        secondaryClick={() => setDeleteAvatarDialogOpen(false)}
        handleClose={() => setDeleteAvatarDialogOpen(false)}
        primaryClick={handleDeleteAvatar}
      />
    </Grid>
  );
};
