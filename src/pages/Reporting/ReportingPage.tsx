import { Box, Typography } from "@mui/material";
import { CardWithHeader } from "@/components/CardWithHeader.tsx";
import { ExerciseReportingByUsers } from "@/pages/Reporting/ExerciseReportingByUsers.tsx";

export const ReportingPage = () => {
  return (
    <Box mb={16}>
      <Typography variant="h4" style={{ margin: "16px" }}>
        Reportok
      </Typography>

      <CardWithHeader title={"Emberenkénti feladat beküldések száma"}>
        <ExerciseReportingByUsers />
      </CardWithHeader>
    </Box>
  );
};
