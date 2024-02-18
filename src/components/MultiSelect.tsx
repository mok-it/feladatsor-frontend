import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type MultiSelectProps = {
  items: string[];
  onchange: (value: string[]) => void;
};

export const MultiSelect = (props: MultiSelectProps) => (
  <Stack spacing={3} sx={{ width: 500 }}>
    <Autocomplete
      multiple
      id="tags-filled"
      options={props.items.map((option) => option)}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} />}
    />
  </Stack>
);
