import * as React from "react";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { Grid, Stack, Typography } from "@mui/material";
import { ageGroupTexts } from "@/types/ageGroupTexts.ts";

export const CategoryDifficultySelect = () => (
  <Grid container gap={3}>
    <Grid item xs={12}>
      {Object.values(ageGroupTexts).map((ageGroup) => (
        <ColorRadioButtons
          name={ageGroup}
          handleChange={() => {}}
          selectedValue=""
        />
      ))}
    </Grid>
  </Grid>
);

type ColorRadioButtonProps = {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};

export const ColorRadioButtons = (props: ColorRadioButtonProps) => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <Stack direction={"row"} alignItems="center">
      <Typography sx={{ width: "95px" }}>{props.name}</Typography>
      <Radio {...controlProps("a")} />
      <Radio {...controlProps("b")} color="secondary" />
      <Radio {...controlProps("c")} color="success" />
      <Radio {...controlProps("d")} color="default" />
      <Radio
        {...controlProps("e")}
        sx={{
          color: pink[800],
          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      />
    </Stack>
  );
};
