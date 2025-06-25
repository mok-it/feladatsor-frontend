import {
  Button,
  Dialog,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
} from "@mui/material";
import { FC, useCallback } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { useToggle } from "react-use";
import { MdContentCopy } from "react-icons/md";
import { useSnackbar } from "notistack";
import {
  HistoryValue,
  ExerciseHistoryFieldType,
} from "@/generated/graphql.tsx";

const getHistoryValueContent = (
  value: HistoryValue | null,
  fieldType: ExerciseHistoryFieldType,
): string => {
  if (!value) return "";
  if (fieldType === "TEXT" && value.__typename === "HistoryStringValue") {
    return value.value;
  } else if (fieldType === "IMAGE" && value.__typename === "Image") {
    return `[Image: ${value.url}]`;
  }
  return "";
};

const HistoryValueRenderer: FC<{
  value: HistoryValue | null;
  label: string;
  fieldType: ExerciseHistoryFieldType;
}> = ({ value, label, fieldType }) => {
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      enqueueSnackbar("URL másolva vágólapra", { variant: "success" });
    },
    [enqueueSnackbar],
  );

  if (!value) {
    return (
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        Nincs érték
      </Box>
    );
  }

  if (fieldType === "TEXT" && value.__typename === "HistoryStringValue") {
    return (
      <Box sx={{ p: 1 }}>
        <Typography>{value.value}</Typography>
      </Box>
    );
  } else if (fieldType === "IMAGE" && value.__typename === "Image") {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <img
          src={value.url}
          alt={`${label} image`}
          style={{
            maxWidth: "400px",
            maxHeight: "300px",
            objectFit: "contain",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
          }}
        />
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "0.75rem" }}
          >
            {value.url}
          </Typography>
          <Tooltip title="URL másolása">
            <IconButton
              size="small"
              onClick={() => copyToClipboard(value.url)}
              sx={{ p: 0.5 }}
            >
              <MdContentCopy size={12} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    );
  } else if (fieldType === "ARRAY" && value.__typename === "HistoryTagArray") {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {value.tags.length > 0 ? (
            value.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))
          ) : (
            <Typography color="text.secondary" fontStyle="italic">
              Nincs címke
            </Typography>
          )}
        </Box>
      </Box>
    );
  } else if (fieldType === "ARRAY" && value.__typename === "HistoryUserArray") {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {value.users.length > 0 ? (
            value.users.map((user) => (
              <Chip
                key={user.id}
                avatar={
                  user.avatarUrl ? (
                    <Avatar src={user.avatarUrl} sx={{ width: 24, height: 24 }} />
                  ) : (
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )
                }
                label={user.name}
                size="small"
                variant="outlined"
                color="secondary"
              />
            ))
          ) : (
            <Typography color="text.secondary" fontStyle="italic">
              Nincs felhasználó
            </Typography>
          )}
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 1 }}>
      <Typography color="text.secondary" fontStyle="italic">
        Ismeretlen típus: {fieldType}
      </Typography>
    </Box>
  );
};

export const DiffModal: FC<{
  oldValue: HistoryValue | null;
  newValue: HistoryValue | null;
  fieldType: ExerciseHistoryFieldType;
}> = ({ oldValue, newValue, fieldType }) => {
  const [open, setOpen] = useToggle(false);

  const isTextType = fieldType === "TEXT";

  return (
    <>
      <Dialog open={open} onClose={setOpen} maxWidth="lg" fullWidth>
        {isTextType ? (
          <ReactDiffViewer
            oldValue={getHistoryValueContent(oldValue, fieldType)}
            newValue={getHistoryValueContent(newValue, fieldType)}
            splitView={true}
            hideLineNumbers
            compareMethod={DiffMethod.WORDS}
          />
        ) : (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Változtatások
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "error.main" }}
                >
                  Régi érték:
                </Typography>
                <HistoryValueRenderer
                  value={oldValue}
                  label="Régi"
                  fieldType={fieldType}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "success.main" }}
                >
                  Új érték:
                </Typography>
                <HistoryValueRenderer
                  value={newValue}
                  label="Új"
                  fieldType={fieldType}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
      <Button onClick={() => setOpen(true)}>Változtatások</Button>
    </>
  );
};
