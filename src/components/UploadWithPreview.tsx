import { AlertDialog } from "@/components/Dialog.tsx";
import { UploadDialog } from "@/components/UploadDialog.tsx";
import { fromBase64 } from "@/util/toBase64";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const isImage = (file: File | string) => {
  if (typeof file === "string") return false;
  return file.type.startsWith("image");
};

type UploadWithPreviewProps = {
  value?: string | null | undefined;
  onChange: (file: File | null) => void;
};

export const UploadWithPreview = ({
  onChange,
  value,
}: UploadWithPreviewProps) => {
  const [file, setFile] = useState<File | string | null>(value || null);
  useEffect(() => {
    if (!value) setFile(null);
    else if (isImage(value)) setFile(fromBase64(value));
    else setFile(value);
  }, [value]);
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
      {file && (
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
            {isImage(file) ? (
              <img src={URL.createObjectURL(file as Blob)} alt="preview" />
            ) : (
              <img src={file as string} alt="preview" />
            )}
          </Box>
          <Button
            sx={{
              maxWidth: {
                xs: "100%",
                md: "50%",
              },
              overflow: "hidden",
            }}
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <MdDeleteOutline />
            Törlés
          </Button>
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
          onChange(null);
          setDialogOpen(false);
        }}
      />
    </>
  );
};
