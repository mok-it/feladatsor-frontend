// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { IoCameraOutline } from "react-icons/io5";
import { Box, Stack } from "@mui/system";
import { ExerciseList } from "@/components/ExerciseList.tsx";

// STYLES
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
};

//APP
export default function ProfileCard(props: any) {
  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IoCameraOutline
                style={{
                  border: "5px solid white",
                  backgroundColor: "#ff558f",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35,
                }}
              />
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
            ></Avatar>
          </Badge>

          {/* DESCRIPTION */}
          <Typography variant="h6">{props.name}</Typography>
        </Grid>
        {/* CARD HEADER END */}
      </Grid>
      <Stack direction="column" spacing={2} sx={styles.details}>
        <Box>
          <Typography variant="h6">Beküldött feladatok</Typography>
          <ExerciseList
            data={[
              {
                fakeId: "ab-012",
                categoryDifficulties: {
                  JEGESMEDVE: 1,
                  KISMEDVE: 2,
                  MEDVEBOCS: 3,
                  NAGYMEDVE: 4,
                  KOALA: 2,
                },
                hasPicture: false,
                description:
                  "Ez egy példa feladat kacsa kacsakacsakacsakacsakacsakacsa ",
                state: "Checked",
                tags: ["Kombinatorika", "Permutáció"],
              },
            ]}
          />
        </Box>
        <Box>
          <Typography variant="h6">Kommentek</Typography>
        </Box>
      </Stack>
    </Card>
  );
}
