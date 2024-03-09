import { Box, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineCloudUpload } from "react-icons/md";

type UploadDialogProps = {
  setFile: (file: File) => void;
};

export const UploadDialog = (props: UploadDialogProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      props.setFile(acceptedFiles[0]);
    },
    [props],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
  });

  return (
    <Box
      data-testid=""
      sx={{
        flexGrow: 1,
        width: "100%",
        backgroundColor: "grey.100",
        cursor: "pointer",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...getRootProps()}
    >
      <Stack
        data-testid=""
        sx={{
          transition: "all 0.2s ease-in-out",
          transform: isDragActive ? "scale(1.1)" : "scale(1)",
        }}
        direction="row"
        gap={2}
        alignItems="center"
        py={2}
      >
        <MdOutlineCloudUpload size={40} />
        <input {...getInputProps()} />
        <Typography variant="body1">
          <span style={{ color: "#8F1C6B" }}>Töltsd fel</span> vagy húzd ide a
          file-t!
        </Typography>
      </Stack>
    </Box>
  );
};
