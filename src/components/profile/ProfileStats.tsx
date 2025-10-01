import { ProfileStatCard } from "@/components/profile/ProfileStatCard.tsx";
import { Grid, Stack, Typography } from "@mui/material";
import { MdOutlineCheckCircle, MdOutlineEdit } from "react-icons/md";

interface ProfileStatsProps {
  stats: {
    totalExerciseCount?: number | null;
    checkedExerciseCount?: number | null;
  } | null | undefined;
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        padding: "1rem",
        borderTop: "1px solid #e1e1e1",
      }}
    >
      <Typography variant="h6">Statisztikák</Typography>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <ProfileStatCard
            title={"Beküldött feladataim"}
            value={stats?.totalExerciseCount || 0}
            unit="db"
            icon={MdOutlineEdit}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <ProfileStatCard
            title={"Feladatok amiket ellenőriztem"}
            value={stats?.checkedExerciseCount || 0}
            unit="db"
            icon={MdOutlineCheckCircle}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};