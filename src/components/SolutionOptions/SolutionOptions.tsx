import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import {
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { useDebounce } from "react-use";
import { useImmer } from "use-immer";

type SolutionOptionsProps = {
  value: string[];
  onChange: (helpingQuestions: string[]) => void;
};

export const SolutionOptions = ({ onChange, value }: SolutionOptionsProps) => {
  const [data, setData] = useImmer<string[]>(value);

  useDebounce(
    () => {
      onChange(data);
    },
    100,
    [data],
  );

  return (
    <SimpleAccordion summary="Válaszopciók">
      <Stack gap={1}>
        {data.map((helpingQuestion, i) => (
          <Stack key={i} direction="row" gap={1}>
            <FormControlLabel
              id={`latex-${i}`}
              control={<Switch />}
              label="LaTeX"
            />
            <TextField
              key={i}
              fullWidth
              variant="outlined"
              placeholder="Írj ide egy válaszopciót"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setData(data.filter((_, index) => index !== i));
                      }}
                    >
                      <MdOutlineDelete />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={helpingQuestion}
              onChange={(e) => {
                setData((draft) => {
                  draft[i] = e.target.value;
                });
              }}
            />
          </Stack>
        ))}
        <Button
          onClick={() => {
            setData([...value, ""]);
          }}
        >
          Új válaszopció
          <MdAdd />
        </Button>
      </Stack>
    </SimpleAccordion>
  );
};
