import {
  Box,
  Card,
  Typography,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import { FC } from "react";

const BugReport: FC = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const { mode } = useColorScheme();

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
          <div
            style={{
              filter: mode == "dark" ? "invert(1)" : "none",
              height: "100%",
            }}
          >
            <div
              style={{
                filter:
                  mode == "dark"
                    ? "hue-rotate(189.73deg) saturate(18.61%) brightness(96.86%)"
                    : "none",

                height: "100%",
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
            </div>
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export { BugReport };
export default BugReport;
