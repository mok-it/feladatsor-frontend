import { AlertDialog } from "@/components/Dialog.tsx";
import { UploadDialog } from "@/components/UploadDialog.tsx";
import { Box, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

const isImage = (file: File) => {
  return file.type.startsWith("image");
};

type UploadWithPreviewProps = {
  defaultValue?: File;
  onChange: (file: File | null) => void;
};

export const UploadWithPreview = ({
  onChange,
  defaultValue,
}: UploadWithPreviewProps) => {
  const [file, setFile] = useState<File | null>(defaultValue || null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {!file && (
        <UploadDialog
          setFile={(file) => {
            setFile(file);
            onChange(file ?? null);
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
          onChange(file ?? null);
          setDialogOpen(false);
        }}
      />
    </>
  );
};
