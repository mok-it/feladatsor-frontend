import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import { FC } from "react";

const BugReport: FC = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Box>
      <Typography variant="h4" style={{ margin: "16px" }} gutterBottom>
        Hibabejelentés
      </Typography>

      <Card sx={{ p: 3, mt: 2 }}>
        <Box
          sx={{
            width: "100%",
            height: isMobile ? "calc(100vh - 200px)" : "calc(100vh - 150px)",
            borderRadius: 1,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfjJKHV6kdmdgLlSrP5aUKcXAvAW_a6Ejp4DGlu5QUemSFzuw/viewform?embedded=true"
            width="100%"
            height="100%"
            style={{ border: 0, margin: 0 }}
            title="Hibabejelentés űrlap"
          >
            Betöltés...
          </iframe>
        </Box>
      </Card>
    </Box>
  );
};

export { BugReport };
export default BugReport;
