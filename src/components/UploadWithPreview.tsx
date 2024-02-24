import { useState } from "react";
import { UploadDialog } from "@/components/UploadDialog.tsx";
import { Box, IconButton, Stack } from "@mui/material";
import { AlertDialog } from "@/components/Dialog.tsx";
import { FaDeleteLeft } from "react-icons/fa6";

const isImage = (file: File) => {
  return file.type.startsWith("image");
};

type UploadWithPreviewProps = {};

export const UploadWithPreview = (props: UploadWithPreviewProps) => {
  const [file, setFile] = useState<File | null>();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {!file && (
        <UploadDialog
          setFile={(file) => {
            setFile(file);
          }}
        />
      )}
      {file && isImage(file) && (
        <Stack direction="column" spacing={2}>
          <Box
            sx={{
              aspectRatio: "16/9",
              maxWidth: {
                xs: "100%",
                md: "50%",
              },
              overflow: "hidden",
            }}
            borderRadius={1}
          >
            <img src={URL.createObjectURL(file)} alt="preview" />
          </Box>
          <IconButton
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <FaDeleteLeft />
          </IconButton>
        </Stack>
      )}
      <AlertDialog
        open={dialogOpen}
        description="Biztosan törlöd ezt a képet?"
        secondaryClick={() => {
          setDialogOpen(false);
        }}
        handleClose={() => {
          setDialogOpen(false);
        }}
        primaryClick={() => {
          setFile(null);
          setDialogOpen(false);
        }}
      />
    </>
  );
};
