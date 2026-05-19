import { indentWithTab } from "@codemirror/commands";
import { indentUnit, StreamLanguage } from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap } from "@codemirror/view";
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { FC, ReactNode, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { KaTeX } from "./Katex";

type Mode = "write" | "preview";

type LatexEditorFieldProps = {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  minHeight?: number | string;
  maxHeight?: number | string;
  previewMaxHeight?: number;
};

export const LatexEditorField: FC<LatexEditorFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  minHeight = 200,
  maxHeight = 400,
  previewMaxHeight = 310,
}) => {
  const theme = useTheme();
  const [mode, setMode] = useState<Mode>("write");
  const [debounced, setDebounced] = useState(value);

  useDebounce(
    () => {
      setDebounced(value);
    },
    500,
    [value],
  );

  const extensions = useMemo(
    () => [
      StreamLanguage.define(stex),
      indentUnit.of("\t"),
      keymap.of([indentWithTab]),
      EditorView.lineWrapping,
    ],
    [],
  );

  const cmTheme = theme.palette.mode === "dark" ? oneDark : "light";

  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Typography>{label}</Typography>
        <ToggleButtonGroup
          size="small"
          color="primary"
          exclusive
          value={mode}
          onChange={(_, v: Mode | null) => {
            if (v) setMode(v);
          }}
          aria-label="latex editor mode"
        >
          <ToggleButton value="write">Szerkesztés</ToggleButton>
          <ToggleButton value="preview">Előnézet</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box
        sx={{
          display: mode === "write" ? "block" : "none",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          overflow: "hidden",
          "& .cm-editor": {
            fontSize: "0.95rem",
          },
          "& .cm-editor.cm-focused": {
            outline: "none",
          },
        }}
      >
        <CodeMirror
          value={value}
          theme={cmTheme}
          extensions={extensions}
          onChange={onChange}
          onBlur={onBlur}
          minHeight={
            typeof minHeight === "number" ? `${minHeight}px` : minHeight
          }
          maxHeight={
            typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
          }
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLineGutter: false,
            highlightActiveLine: false,
            autocompletion: false,
          }}
        />
      </Box>
      {mode === "preview" && (
        <Box
          py={1}
          px={1.5}
          maxHeight={previewMaxHeight}
          overflow="auto"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            minHeight: 56,
          }}
        >
          <KaTeX value={debounced} />
        </Box>
      )}
    </Stack>
  );
};
