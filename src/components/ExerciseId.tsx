import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, PropsWithChildren } from "react";
import { useCopyToClipboard } from "react-use";

const ExerciseId: FC<PropsWithChildren> = ({ children }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Typography
      sx={{
        cursor: "pointer",
        textDecoration: "underline",
        textDecorationColor: (theme) => theme.palette.primary.main,
      }}
      onClick={(event) => {
        if (!children) return;
        event.stopPropagation();
        const url = `${window.location.hostname}${window.location.port ? ":" + window.location.port : ""}/exercise/${children.toString()}`;
        copyToClipboard(url);
        enqueueSnackbar("Másolva a vágólapra", {
          variant: "info",
        });
      }}
    >
      <Typography component="span" color="gray">
        #{children}
      </Typography>
    </Typography>
  );
};

export default ExerciseId;
