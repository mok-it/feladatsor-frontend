import { AlertDialog } from "@/components/Dialog.tsx";
import { UploadDialog } from "@/components/UploadDialog.tsx";
import { toBase64 } from "@/util/toBase64";
import { useUploadImage } from "@/util/useUploadImage";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useToggle } from "react-use";

type UploadWithPreviewProps = {
  defaultUrl?: string | null | undefined;
  onChange: (values: { id: string | null; url: string | null }) => void;
};

export const UploadWithPreview = ({
  onChange: onPropChange,
  defaultUrl,
}: UploadWithPreviewProps) => {
  const [url, setUrl] = useState<string | null>(defaultUrl || null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, toggleLoading] = useToggle(false);

  const uploadImage = useUploadImage();
  const onChange = async (file: File | null) => {
    if (!file) {
      setUrl(null);
      onPropChange({ id: null, url: null });
      return;
    }
    toggleLoading(true);
    const { id, url } = await uploadImage(await toBase64(file));
    setUrl(url);
    onPropChange({ id, url });
    toggleLoading(false);
  };

  if (loading) {
    return <p>Feltöltés...</p>;
  }

  return (
    <>
      {!url && (
        <UploadDialog
          setFile={(file) => {
            onChange(file ?? null);
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
                md: "50%",
              },
              overflow: "hidden",
            }}
            borderRadius={1}
          >
            <img src={url} alt="preview" />
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
          setUrl(null);
          onChange(null);
          setDialogOpen(false);
        }}
      />
    </>
  );
};
