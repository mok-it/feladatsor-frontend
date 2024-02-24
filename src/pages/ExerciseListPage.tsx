import {
  Card,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";

export const ExerciseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [value, setValue] = React.useState<number[]>([20, 37]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Feladatok keresése" />
          <Grid container m={2}>
            <Grid item xs={12} md={6}>
              <Stack gap={2}>
                <DifficultySelector
                  ageGroup={ageGroup}
                  setAgeGroup={setAgeGroup}
                  difficulty={[value[0], value[1]]}
                  setDifficulty={(value) => setValue(value)}
                  onNewRowClick={() => {}}
                  isLastRow={true}
                />
                <TextField
                  onChange={(event) => setSearchTerm(event.target.value)}
                  label="Keresés"
                  value={searchTerm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoSearch />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

const DifficultySelector = (props: {
  ageGroup: string;
  setAgeGroup: (age: string) => void;
  difficulty: [number, number];
  setDifficulty: (difficulty: [number, number]) => void;
  onNewRowClick: () => void;
  isLastRow: boolean;
}) => {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <FormControl fullWidth size="small">
        <InputLabel id="age-group-label">Korcsoport</InputLabel>
        <Select
          labelId="age-group-label"
          value={props.ageGroup}
          label="Korcsoport"
          onChange={(event) => props.setAgeGroup(event.target.value)}
        >
          <MenuItem value="KOALA">Koala</MenuItem>
          <MenuItem value="MEDVEBOCS">Medvebocs</MenuItem>
          <MenuItem value="KISMEDVE">Kismedve</MenuItem>
          <MenuItem value="NAGYMEDVE">Nagymedve</MenuItem>
          <MenuItem value="JEGESMEDVE">Jegesmedve</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="body1">Nehézség</Typography>
      <Slider
        name="Nehézség"
        sx={{ width: "100%" }}
        value={props.difficulty}
        onChange={(_, value) => props.setDifficulty(value as [number, number])}
        step={1}
        marks
        min={0}
        max={4}
        valueLabelDisplay="auto"
      />
      {props.isLastRow && (
        <IconButton color="primary" onClick={() => props.onNewRowClick()}>
          <BiPlus />
        </IconButton>
      )}
    </Stack>
  );
};
