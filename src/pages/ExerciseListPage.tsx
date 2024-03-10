import { ExerciseAgeGroup } from "@/generated/graphql";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { entries } from "lodash";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { useImmer } from "use-immer";
import { DataTable } from "@/components/DataTable/DataTable.tsx";
import Chip from "@mui/material/Chip";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { categoryColors } from "@/theme/palette.ts";
import { MultiSelect } from "@/components/MultiSelect.tsx";

type ExerciseItem = {
  fakeId: string;
  categoryDifficulties: number[];
  description: string;
  hasPicture: boolean;
  state: string;
  tags: string[];
};

const getCategoryColor = (index: number): string => {
  switch (index) {
    case 0:
      return categoryColors.KOALA;
    case 1:
      return categoryColors.MEDVEBOCS;
    case 2:
      return categoryColors.NAGYMEDVE;
    case 3:
      return categoryColors.KISMEDVE;
    case 4:
      return categoryColors.JEGESMEDVE;
    default:
      return categoryColors.KOALA;
  }
};

export const ExerciseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulties, setDifficulties] = useImmer<{
    [key in ExerciseAgeGroup]: [number, number];
  }>({
    KOALA: [0, 2],
    MEDVEBOCS: [0, 2],
    NAGYMEDVE: [0, 2],
    KISMEDVE: [0, 2],
    JEGESMEDVE: [0, 2],
  });
  return (
    <Card>
      <CardHeader title="Feladatok keresése" />
      <CardContent>
        <Grid container>
          {entries(difficulties).map(([difficultyName, [min, max]]) => {
            return (
              <DifficultySelector
                ageGroup={difficultyName}
                difficulty={[min, max]}
                setDifficulty={(value) =>
                  setDifficulties((draft) => {
                    draft[difficultyName as ExerciseAgeGroup] = value;
                  })
                }
                onNewRowClick={() => {}}
                isLastRow={true}
              />
            );
          })}
        </Grid>
        <Grid container>
          <Grid item xs={0.5}>
            <Checkbox />
          </Grid>
          <Grid item xs={0.5}>
            <Stack justifyContent={"center"} height={"100%"}>
              Döntő
            </Stack>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={0.5}>
            <Checkbox />
          </Grid>
          <Grid item xs={0.5}>
            <Stack justifyContent={"center"} height={"100%"}>
              Talon
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <MultiSelect items={["Gellért hegy", "Városliget"]} />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
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
        <DataTable<ExerciseItem>
          columns={{
            fakeId: {
              element: "fakeID",
              sortable: true,
              sx: { width: "5%" },
            },
            categoryDifficulties: {
              element: "Kategóriák",
              sortable: true,
              sx: { width: "5%" },
            },
            state: {
              element: "Állapot",
              sortable: true,
              sx: { width: "5%" },
            },
            tags: {
              element: "Címkék",
              sx: { width: "5%" },
            },
            hasPicture: {
              element: "Van ábra",
              sx: { width: "1%" },
            },
            description: {
              element: "Leírás",
              sortable: true,
              sx: { width: "50%" },
            },
          }}
          dataSource={{
            data: [
              {
                fakeId: "ab-012",
                categoryDifficulties: [0, 1, 3, 3, 4],
                hasPicture: false,
                description:
                  "Ez egy példa feladat kacsa kacsakacsakacsakacsakacsakacsa ",
                state: "Checked",
                tags: ["Kombinatorika", "Permutáció"],
              },
            ],
          }}
          hoverable
          maxHeight="400px"
          pagination={{
            defaultRowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15],
          }}
          rowRenderers={{
            //fakeId: (value) => <Chip label={value} />,
            tags: (tags: string[]) => (
              <>
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} />
                ))}
              </>
            ),
            hasPicture: (value) => (value ? <FaCheck /> : <RxCross2 />),
            categoryDifficulties: (value) => (
              <>
                {value.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    style={{ backgroundColor: getCategoryColor(index) }}
                  />
                ))}
              </>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
};

const DifficultySelector = (props: {
  ageGroup: string;
  // setAgeGroup: (age: string) => void;
  difficulty: [number, number];
  setDifficulty: (difficulty: [number, number]) => void;
  onNewRowClick: () => void;
  isLastRow: boolean;
}) => {
  return (
    <>
      <Grid item xs={1}>
        <Checkbox></Checkbox>
      </Grid>
      <Grid item xs={2}>
        <Stack justifyContent={"center"} height={"100%"}>
          {props.ageGroup}
        </Stack>
      </Grid>
      <Grid item xs={8} px={8} pt={1}>
        <Slider
          name="Nehézség"
          value={props.difficulty}
          onChange={(_, value) =>
            props.setDifficulty(value as [number, number])
          }
          step={1}
          marks
          min={0}
          max={4}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={1}>
        {props.isLastRow && (
          <IconButton color="primary" onClick={() => props.onNewRowClick()}>
            <BiPlus />
          </IconButton>
        )}
      </Grid>
    </>
  );
};
