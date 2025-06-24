import { FC } from "react";
import { Box, Chip, Avatar } from "@mui/material";
import { ExerciseHistoryFragment } from "@/generated/graphql";

type HistoryValue = NonNullable<ExerciseHistoryFragment["oldValue" | "newValue"]>;

interface HistoryValueDisplayProps {
  value: HistoryValue | null;
}

export const HistoryValueDisplay: FC<HistoryValueDisplayProps> = ({
  value,
}) => {
  if (!value) {
    return <i>üres</i>;
  }

  const commonBoxProps = {
    component: "span" as const,
    sx: {
      display: "inline-flex",
      alignItems: "center",
      gap: 0.5,
      flexWrap: "wrap",
    },
  };

  const inlineImageStyle = {
    width: "20px",
    height: "20px",
    objectFit: "contain" as const,
  };

  const inlineChipProps = {
    variant: "outlined" as const,
    sx: {
      height: "18px",
      fontSize: "0.7rem",
    },
  };

  switch (value.__typename) {
    case "HistoryStringValue":
      return <span>{value.value || <i>üres</i>}</span>;

    case "Image":
      return (
        <Box {...commonBoxProps}>
          <img
            src={value.url}
            alt="History"
            style={inlineImageStyle}
          />
        </Box>
      );

    case "HistoryTagArray":
      return (
        <Box {...commonBoxProps}>
          {value.tags.length > 0 ? (
            value.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                {...inlineChipProps}
              />
            ))
          ) : (
            <i>nincs címke</i>
          )}
        </Box>
      );

    case "HistoryUserArray":
      return (
        <Box {...commonBoxProps}>
          {value.users.length > 0 ? (
            value.users.map((user) => (
              <Chip
                key={user.id}
                avatar={
                  user.avatarUrl ? (
                    <Avatar
                      src={user.avatarUrl}
                      sx={{ width: 16, height: 16 }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 16,
                        height: 16,
                        fontSize: "0.6rem",
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )
                }
                label={user.name}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.7rem",
                }}
              />
            ))
          ) : (
            <i>nincs felhasználó</i>
          )}
        </Box>
      );

    default:
      return <i>ismeretlen típus</i>;
  }
};