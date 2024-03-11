import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SxProps } from "@mui/material";

type MultiSelectProps = {
  items: string[];
  label?: string;
  onChange?: (value: string[]) => void;
  sx?: SxProps;
};

export const MultiSelect = (props: MultiSelectProps) => (
  <Autocomplete
    multiple
    size="small"
    options={props.items.map((option) => option)}
    renderTags={(value: readonly string[], getTagProps) =>
      value.map((option: string, index: number) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      ))
    }
    sx={props.sx}
    slotProps={{
      paper: {
        elevation: 3,
      },
    }}
    onChange={(_, value) => props.onChange && props.onChange(value)}
    renderInput={(params) => <TextField label={props.label} {...params} />}
  />
);
