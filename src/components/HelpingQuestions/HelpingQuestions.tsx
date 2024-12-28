import { SimpleAccordion } from "@/components/SimpleAccordion.tsx";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { useDebounce } from "react-use";
import { useImmer } from "use-immer";

type HelpingQuestionProps = {
  value: string[];
  onChange: (helpingQuestions: string[]) => void;
};

export const HelpingQuestions = ({ onChange, value }: HelpingQuestionProps) => {
  const [data, setData] = useImmer<string[]>(value);

  useDebounce(
    () => {
      onChange(data);
    },
    100,
    [data],
  );

  return (
    <SimpleAccordion summary="Segítő kérdések">
      <Stack gap={1}>
        {data.map((helpingQuestion, i) => (
          <TextField
            key={i}
            fullWidth
            variant="outlined"
            placeholder="Írd ide a segítő kérdést"
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
        ))}
        <Button
          onClick={() => {
            setData([...value, ""]);
          }}
        >
          Új segítő kérdés
          <MdAdd />
        </Button>
      </Stack>
    </SimpleAccordion>
  );
};
