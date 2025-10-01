import { Box, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

interface ProfileCardProps {
  children: ReactNode;
  id?: string;
  onClick?: () => void;
}

export const ProfileCard = ({ children, id, onClick }: ProfileCardProps) => {
  return (
    <Box
      key={id}
      onClick={onClick}
      sx={{
        p: 1.5,
        bgcolor: "grey.50",
        borderRadius: 1.5,
        mb: 2,
        border: "1px solid",
        borderColor: "grey.200",
        "&:hover": {
          bgcolor: "grey.100",
          borderColor: "grey.300",
        },
        transition: "all 0.2s ease-in-out",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {children}
    </Box>
  );
};

interface ProfileCardHeaderProps {
  children: ReactNode;
}

export const ProfileCardHeader = ({ children }: ProfileCardHeaderProps) => {
  return (
    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
      {children}
    </Typography>
  );
};

interface ProfileCardMetaProps {
  children: ReactNode;
}

export const ProfileCardMeta = ({
  children,
  ...props
}: ProfileCardMetaProps & TypographyProps) => {
  return (
    <Typography variant="caption" color="text.secondary" {...props}>
      {children}
    </Typography>
  );
};
