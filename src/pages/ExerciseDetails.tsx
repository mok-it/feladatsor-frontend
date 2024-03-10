import Check from "@/components/Check";
import FakeId from "@/components/FakeId";
import History from "@/components/History";
import Section from "@/components/Section";
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import {
  MdArrowDownward,
  MdCheck,
  MdCheckCircle,
  MdSave,
  MdSend,
} from "react-icons/md";
import { useParams } from "react-router";

const ExerciseDetails: FC = () => {
  const { fakeId } = useParams();
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  return (
    <div>
      <Stack mb={2} direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h4">Feladat</Typography>
        <Box flexGrow={1} />
        <Button variant="contained" endIcon={<MdSave />}>
          Mentés
        </Button>
        <Button variant="contained" color="success" endIcon={<MdCheck />}>
          Ellenőriztem
        </Button>
      </Stack>
      <Card>
        <Grid container p={2}>
          <Grid item xs={7} borderRight={"1px solid"} borderColor={"divider"}>
            <FakeId>{fakeId}</FakeId>
          </Grid>
          <Grid item xs={5} pl={2}>
            <Stack gap={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="body1">Státusz</Typography>
                <Select size="small" defaultValue={1}>
                  <MenuItem value={1}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <MdSend />
                      Beküldve
                    </Stack>
                  </MenuItem>
                  <MenuItem value={2}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <MdCheckCircle color="green" />
                      Kész
                    </Stack>
                  </MenuItem>
                </Select>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                <Typography variant="body1" mr={1}>
                  Ellenőrzések
                </Typography>
                <Check
                  checked
                  userName="Minta János"
                  timestamp={"2024-02-02"}
                />
                <Check />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                <Typography variant="body1" mr={1}>
                  Lektorálások
                </Typography>
                <Check />
                <Check />
              </Stack>
              <Section text="Komment">
                <Stack justifyContent={"flex-end"} direction={"row"} gap={1}>
                  <TextField size="small"></TextField>
                  <Button variant="contained" endIcon={<MdSend />}>
                    Küld
                  </Button>
                </Stack>
              </Section>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography variant="h5">Történet</Typography>
                <Box flexGrow={1} />
                <motion.div
                  animate={{
                    transform:
                      sort === "asc" ? "rotate(0deg)" : "rotate(-180deg)",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      setSort((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                  >
                    <MdArrowDownward />
                  </IconButton>
                </motion.div>
              </Stack>
              <Stack spacing={2} py={2}>
                <History />
                <History />
                <History />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ExerciseDetails;
