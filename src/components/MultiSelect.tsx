import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SxProps } from "@mui/material";
import { ReactNode } from "react";

type MultiSelectProps<T extends object | string> = {
  items: T[];
  value?: T[];
  getItemLabel?: (item: T) => string;
  getItemKey?: (item: T) => string;
  label?: string;
  onChange?: (value: T[]) => void;
  sx?: SxProps;
  renderChip?: (item: T, getTagProps: (props: { index: number }) => object, index: number) => ReactNode;
  renderOption?: (item: T) => ReactNode;
};

export const MultiSelect = <T extends object | string>(
  props: MultiSelectProps<T>,
) => (
  <Autocomplete<T, true>
    multiple
    size="small"
    sx={props.sx} //{{ width: "80%" }}
    options={props.items}
    getOptionKey={props.getItemKey ? props.getItemKey : undefined}
    getOptionLabel={(option) =>
      props.getItemLabel ? props.getItemLabel(option) : String(option)
    }
    renderOption={props.renderOption ? (liProps, option) => (
      <li {...liProps}>
        {props.renderOption!(option)}
      </li>
    ) : undefined}
    renderTags={(value: readonly T[], getTagProps) =>
      value.map((option: T, index: number) =>
        props.renderChip ? (
          props.renderChip(option, getTagProps, index)
        ) : (
          <Chip
            variant="outlined"
            label={
              props.getItemLabel ? props.getItemLabel(option) : String(option)
            }
            {...getTagProps({ index })}
          />
        )
      )
    }
    value={props.value}
    slotProps={{
      paper: {
        elevation: 3,
      },
    }}
    onChange={(_, value) => props.onChange && props.onChange(value)}
    renderInput={(params) => <TextField label={props.label} {...params} />}
  />
);
