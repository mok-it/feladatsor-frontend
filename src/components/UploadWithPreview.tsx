import { AlertDialog } from "@/components/Dialog.tsx";
import { UploadDialog } from "@/components/UploadDialog.tsx";
import { toBase64 } from "@/util/toBase64";
import { useUploadImage } from "@/util/useUploadImage";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { MdDeleteOutline, MdRefresh } from "react-icons/md";
import { useToggle } from "react-use";
import { ImageViewer } from "./ImageViewer";

type UploadWithPreviewProps = {
  defaultUrl?: string | null | undefined;
  onChange: (values: { id: string | null; url: string | null }) => void;
  title?: string;
  imageMaxWidth?: string;
};

export const UploadWithPreview = ({
  onChange: onPropChange,
  defaultUrl,
  title,
  imageMaxWidth,
}: UploadWithPreviewProps) => {
  const [url, setUrl] = useState<string | null>(defaultUrl || null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, toggleLoading] = useToggle(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const uploadImage = useUploadImage();
  const onChange = async (file: File | null) => {
    if (!file) {
      setUrl(null);
      onPropChange({ id: null, url: null });
      setUploadError(null);
      setPendingFile(null);
      return;
    }
    setPendingFile(file);
    setUploadError(null);
    toggleLoading(true);
    try {
      const { id, url } = await uploadImage(await toBase64(file));
      setUrl(url);
      onPropChange({ id, url });
      setPendingFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMessage = 'Feltöltés sikertelen. Próbáld újra!';
      setUploadError(errorMessage);
      enqueueSnackbar({ variant: "error", message: errorMessage });
    } finally {
      toggleLoading(false);
    }
  };

  const retryUpload = () => {
    if (pendingFile) {
      void onChange(pendingFile);
    }
  };

  if (loading) {
    return <p>Feltöltés...</p>;
  }

  if (uploadError) {
    return (
      <Stack spacing={2} alignItems="center">
        <p style={{ color: 'red' }}>{uploadError}</p>
        <Stack direction="row" spacing={1}>
          <Button 
            onClick={retryUpload} 
            variant="contained" 
            size="small"
            startIcon={<MdRefresh />}
          >
            Újrapróbálás
          </Button>
          <Button 
            onClick={() => {
              setUploadError(null);
              setPendingFile(null);
            }} 
            variant="outlined" 
            size="small"
          >
            Mégse
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      {!url && (
        <UploadDialog
          setFile={(file) => {
            void onChange(file ?? null);
          }}
        />
      )}
      {url && (
        <Stack direction="column" spacing={2}>
          <Box
            sx={{
              aspectRatio: "16/9",
              maxWidth: {
                xs: "100%",
                md: imageMaxWidth ?? "50%",
              },
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
            }}
            borderRadius={1}
          >
            <ImageViewer src={url} />
            <IconButton
              aria-label="delete"
              size="medium"
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                color: (theme) =>
                  theme.palette.mode === "light" ? "black" : "white",
                ":hover": {
                  background: (theme) =>
                    theme.palette.mode === "light" ? grey[300] : grey[800],
                },
                background: (theme) =>
                  theme.palette.mode === "light" ? "white" : "black",
              }}
              onClick={(event) => {
                event.stopPropagation();
                setDeleteDialogOpen(true);
              }}
            >
              <MdDeleteOutline />
            </IconButton>
          </Box>
        </Stack>
      )}
      <AlertDialog
        open={deleteDialogOpen}
        description={`Biztosan törlöd a (${title}) képet?`}
        secondaryClick={() => {
          setDeleteDialogOpen(false);
        }}
        handleClose={() => {
          setDeleteDialogOpen(false);
        }}
        primaryClick={() => {
          setUrl(null);
          void onChange(null);
          setDeleteDialogOpen(false);
        }}
      />
      {/* <Dialog
        open={imagePreviewDialogOpen}
        maxWidth="lg"
        onClose={() => setImagePreviewDialogOpen(false)}
        sx={{ width: "100%" }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setImagePreviewDialogOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <IoClose />
        </IconButton>
        <DialogContent>
          {!url && "Image not selected"}
          <img src={url ?? undefined} alt="preview" />
        </DialogContent>
      </Dialog> */}
    </>
  );
};
