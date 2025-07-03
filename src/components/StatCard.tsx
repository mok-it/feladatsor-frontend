import { FC, PropsWithChildren } from "react";
import { Card, Typography, useTheme, useMediaQuery } from "@mui/material";

export const StatCard: FC<PropsWithChildren<{ title: string }>> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card sx={{ p: 2 }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        textAlign="center" 
        sx={{ mb: 1 }}
      >
        {props.title}
      </Typography>
      {props.children}
    </Card>
  );
};
