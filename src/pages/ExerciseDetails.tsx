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
import { MdArrowDownward, MdSend } from "react-icons/md";
import { useParams } from "react-router";

const ExerciseDetails: FC = () => {
  const { fakeId } = useParams();
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  return (
    <div>
      <Card>
        <Grid container p={2}>
          <Grid item xs={7} borderRight={"1px solid"} borderColor={"divider"}>
            <FakeId>{fakeId}</FakeId>
          </Grid>
          <Grid item xs={5} pl={2}>
            <Stack
              mt={2}
              direction={"row"}
              gap={1}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="body1">Állapot</Typography>
              <Select>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Stack>
            <Section text="Komment">
              <Stack justifyContent={"flex-end"} direction={"row"} gap={1}>
                <TextField size="small"></TextField>
                <Button variant="contained" endIcon={<MdSend />}>
                  Send
                </Button>
              </Stack>
            </Section>
            <Stack mt={2} direction={"row"} gap={1} alignItems={"center"}>
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
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ExerciseDetails;
